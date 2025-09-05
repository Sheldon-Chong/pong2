// client.ts (compile to client.js with `tsc client.ts`)
import { Point2D, Vector2D, interpolate } from './objects/Coordinates.js'
import { GameObject } from './objects/GameObject.js';
import { Glow } from './objects/Glow.js';
import { drawImg, Sprite, Tags, type Renderable } from './objects/Sprite.js'
import { HitBox } from './objects/Hitbox.js'
import { Viewport } from './objects/Viewport.js'
import { PongGame } from './pong3.js';
import { Camera } from './objects/Camera.js';


const ws = new WebSocket("ws://localhost:3000/ws");


ws.onopen = () => {
	console.log("CLIENT Connected to server");

	// Listen for keyboard events
	window.addEventListener("keydown", (e) => {
		if (
			(e.key === "ArrowUp" || e.key === "ArrowDown") &&
			ws.readyState === WebSocket.OPEN
		) {
			ws.send(JSON.stringify({ key: e.key, type: "keydown" }));
		}
	});

	window.addEventListener("keyup", (e) => {
		if (
			(e.key === "ArrowUp" || e.key === "ArrowDown") &&
			ws.readyState === WebSocket.OPEN
		) {
			ws.send(JSON.stringify({ key: e.key, type: "keyup" }));
		}
	});
};

let data = {}

ws.onmessage = (event) => {
	// console.log(data);
	data = JSON.parse(event.data);
	// console.log(data);
};

ws.onclose = () => {
	console.log("❌ Disconnected");
};




function getObjects() {
	if (data["state"] && Array.isArray(data["state"]["gameObjects"])) {
		return data["state"]["gameObjects"];
	}
	return [];
}

const objects = new Map<string, GameObject>();

function addObject() {
	let i = 0;
	while (objects.has(i.toString()))
		i++;

	const obj = new GameObject({
		components: [
			new Sprite({
				imagePath: "assets/ghost.png"
			})
		],
		position: new Point2D(0, 0),
		scale: new Vector2D(50, 50)
	});
	objects.set("client_" + i.toString(), obj);
	// console.log(objects);
}

addObject();


const componentMap: Record<string, new (params: any) => any> = {
	"Point2D": function (params: any) { return new Point2D(params.x, params.y); } as any,
	"Vector2D": function (params: any) { return new Vector2D(params.x, params.y); } as any,
	"sprite": Sprite,
	"hitbox": HitBox,
	"camera": Camera
};



function genericUpdate(obj: any, params: any, cache: any) {

	function reviveClass(obj: any) {
		if (obj && typeof obj === "object" && obj.className && componentMap[obj.className])
			return new componentMap[obj.className](obj);
		return obj;
	}

	for (const key in params) {
		if (key === "parent" || key === "children") continue;

		const value = reviveClass(params[key]);

		if (Array.isArray(value)) {
			obj[key] = obj[key] || [];
			cache[key] = cache[key] || [];
			value.forEach((item, index) => {
				obj[key][index] = obj[key][index] || {};
				cache[key][index] = cache[key][index] || {};
				genericUpdate(obj[key][index], item, cache[key][index]);
			});
		} 
		else if (typeof value === "object" && value !== null) {
			obj[key] = obj[key] || {};
			cache[key] = cache[key] || {};
			genericUpdate(obj[key], value, cache[key]);
		} 
		else if (cache[key] !== value) 
			obj[key] = cache[key] = value;
	}
}




// todo add game

window.addEventListener("DOMContentLoaded", () => {
	const game = new PongGame(null);
	game.camera=  null;

	const canvas = document.getElementById("pong-canvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	const viewport = new Viewport({
		ctx: ctx,
		width: canvas.width,
		height: canvas.height
	});

	function draw() {
		

		// -- CLEAR CANVAS --
		ctx.clearRect(0, 0, canvas.width, canvas.height);


		// -- RENDER OBJECTS --
		for (const clientObj of objects.values()) {
			clientObj.draw(viewport);
		}


		// - DEBUG VALUES --
		if (data["metadata"]) {
			const delta = data["metadata"]["delta"] ?? 0;
			const fps = data["metadata"]["fps"] ?? 0;
			ctx.save();
			ctx.font = "16px monospace";
			ctx.fillStyle = "#fff";
			ctx.fillText(`Δ: ${delta.toFixed(2)} ms`, 10, 20);
			ctx.fillText(`FPS: ${fps.toFixed(2)}`, 10, 40);
			ctx.fillText(`CAMERA: ${JSON.stringify(data["state"]["camera"]["position"])}`, 10, 60);
			ctx.restore();
		}

	}

	function createNewInstance(object) {
		const clientObj = new GameObject({ ...object, components: [] });
		objects.set(object["id"], clientObj);

		for (const component of object.components) {
			const ComponentClass = componentMap[component.name];
			if (ComponentClass)
				clientObj.addComponent(new ComponentClass(component));
		}
		return clientObj;
	}

	function loop() {
		let client_objects = getObjects();
		for (const object of client_objects) {
			const id = object["id"];
			let clientObj = objects.get(id);
			if (!clientObj) 
				clientObj = createNewInstance(object);
			
			else {
				// assign children to parent
				for (let i = 0; i < object.children?.length; i++) {
					const childId = object.children[i];
					const childObj = objects.get(childId);
					if (childObj) {
						childObj.parent = clientObj;
						clientObj.children[i] = childObj;
					}
				}

				// update properties
				genericUpdate(clientObj, object, clientObj.cache);

				// console.log(object["name"]);
				if (object["name"] === "camera" && !game.camera) {
					// let camera = new Camera({...object});
					game.camera = object;
					viewport.camera = object;
					// console.log("new camera!");
				}
				// console.log(viewport.camera);
			}
		}

		// for (const object of objects) {
		// 	console.log("name", Object.entries(object));
		// }

		draw();
		requestAnimationFrame(loop);
	}

	loop();
});


// In that case, should I have a special class for frontend that extends sprite, which serves the prupsoe of being updated? I'm assumging the frontend won't need a lot of classes, mostly those that are supposed to be used for rendering right?