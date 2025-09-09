// client.ts (compile to client.js with `tsc client.ts`)
import { Point2D, Vector2D, interpolate } from './objects/Coordinates.js'
import { GameObject } from './objects/GameObject.js';
import { Glow } from './objects/Glow.js';
import { drawImg, Sprite, Tags, type Renderable } from './objects/Sprite.js'
import { HitBox } from './objects/Hitbox.js'
import { Viewport } from './objects/Viewport.js'
import { PongGame } from './pong3.js';
import { Camera } from './objects/Camera.js';
import { Label } from './objects/Label.js';



const ws = new WebSocket("ws://localhost:3000/ws");

function isArrowKey(e: KeyboardEvent): boolean {
  return e.key === "ArrowUp" || e.key === "ArrowDown";
}



ws.onopen = () => {
	console.log("CLIENT Connected to server");

	ws.send(JSON.stringify({
		type: "request",
		payload: {

		}
	}));

	
	// Listen for keyboard events
	window.addEventListener("keydown", (keyEvent) => {
		if (
			(isArrowKey(keyEvent)) &&
			ws.readyState === WebSocket.OPEN
		) {
			ws.send(JSON.stringify({ 
				type: "input",
				payload: {
					key: keyEvent.key,
					action: "keydown"
				}
			}));
		}

		if (keyEvent.key === "a") {
			ws.send(JSON.stringify({
				type: "request",
				payload: {

				}
			}));
		}
	});

	window.addEventListener("keyup", (e) => {
		if (
			(isArrowKey(e)) &&
			ws.readyState === WebSocket.OPEN
		) {
			ws.send(JSON.stringify({ 
				type: "input",
				payload: {
					key: e.key,
					action: "keyup"
				}
			}));
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

const currentGameObjects = new Map<string, GameObject>();


const componentMap: Record<string, new (params: any) => any> = {
	"Point2D": function (params: any) { return new Point2D(params.x, params.y); } as any,
	"Vector2D": function (params: any) { return new Vector2D(params.x, params.y); } as any,
	"sprite": Sprite,
	"hitbox": HitBox,
	"camera": Camera,
	"label": Label
};

function revive(obj: any): any {
	if (Array.isArray(obj)) {
		return obj.map(revive);
	}
	if (obj && typeof obj === "object") {
		if (obj.className && componentMap[obj.className]) {
			const revivedParams: any = {};
			for (const key in obj) {
				revivedParams[key] = revive(obj[key]);
			}
			return new componentMap[obj.className](revivedParams);
		} else {
			for (const key in obj) {
				obj[key] = revive(obj[key]);
			}
		}
	}
	return obj;
}

function genericUpdate(
	obj: Record<string, any>,
	params: Record<string, any>,
	cache: Record<string, any>
) {
	for (const key in params) {
		if (key === "parent" || key === "children") continue;
		const value = params[key];

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
	game.camera = null;

	const canvas = document.getElementById("pong-canvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	const viewport = new Viewport({
		ctx: ctx,
		width: canvas.width,
		height: canvas.height
	});

	function draw() {
		const renderList = Array.from(currentGameObjects.values())
    .sort((a, b) => a.zIndex - b.zIndex);

		// -- CLEAR CANVAS --
		ctx.clearRect(0, 0, canvas.width, canvas.height);


		// -- RENDER OBJECTS --
		for (const clientObj of renderList) {
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

	function getObject(id) {
		return currentGameObjects.get(id);
	}

	function setObject(id, object) {
		currentGameObjects.set(id, object);
	}

	function createNewInstance(object) {
		let clientObj;
		
		if (object.name === "label")
			clientObj = new Label({ ...object, components: [] });
		else
			clientObj = new GameObject({ ...object, components: [] });
		setObject(object["id"], clientObj);

		for (const component of object.components) {
			const ComponentClass = componentMap[component.name];
			if (ComponentClass) {
				clientObj.addComponent(new ComponentClass(component));
			}
		}
		return clientObj;
	}

	function loop() {
		let client_objects = getObjects();
		for (const object of client_objects) {
			const revivedObject = revive(object);
			const id = revivedObject["id"];

			// -- CHECK IF CLIENT OBJECT EXISTS --
			let clientObj = getObject(id);
			if (!clientObj) {
				clientObj = createNewInstance(revivedObject);
			}

			else {
				// -- ASSIGN CHILDREN TO PARENT --
				for (const [i, childId] of revivedObject.children?.entries() ?? []) {
					const childObj = getObject(childId);
					if (childObj) {
						childObj.parent = clientObj;
						clientObj.children[i] = childObj;
					}
				}
				
				// -- UPDATE PROPERTIES AND CHILDREN OF THE CLASS --
				genericUpdate(clientObj, revivedObject, clientObj.cache);
				for (const [, obj] of currentGameObjects.entries()) {
					
				}
				// -- CAMERA --
				if (revivedObject["name"] === "camera") {
					game.camera = revivedObject;
					viewport.camera = revivedObject;
				}
			}
		}
		draw();
		requestAnimationFrame(loop);
	}

	loop();
});


// In that case, should I have a special class for frontend that extends sprite, which serves the prupsoe of being updated? I'm assumging the frontend won't need a lot of classes, mostly those that are supposed to be used for rendering right?


// function addObject() {
// 	let i = 0;
// 	while (currentGameObjects.has(i.toString()))
// 		i++;

// 	const obj = new GameObject({
// 		components: [
// 			new Sprite({
// 				imagePath: "assets/ghost.png"
// 			})
// 		],
// 		position: new Point2D(0, 0),
// 		scale: new Vector2D(50, 50)
// 	});
// 	currentGameObjects.set("client_" + i.toString(), obj);
// 	// console.log(objects);
// }

// addObject();

