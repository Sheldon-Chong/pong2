// client.ts (compile to client.js with `tsc client.ts`)
import { Point2D, Vector2D, interpolate } from './objects/Coordinates.js'
import { GameObject } from './objects/GameObjects.js';
import { Glow } from './objects/Glow.js';
import { drawImg, Sprite, Tags, type Renderable } from './objects/Sprite.js'
import { Label } from './objects/Label.js'
import { HitBox } from './objects/Hitbox.js'


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
	data = JSON.parse(event.data);
	// console.log(data);
	// console.log(data);
};

ws.onclose = () => {
	console.log("❌ Disconnected");
};









function getState() {
	if (data["state"] && Array.isArray(data["state"]["gameObjects"])) {
		return data["state"]["gameObjects"];
	}
	return [];
}



const objects = new Map<string, GameObject>();



/// todo TEST NEW OBJECT!!!!


// objects.set("400", new GameObject({
// 	components: [
// 		new Sprite({
// 			imagePath: "assets/skins/ghost_light.png",
// 		})
// 	]
// }));


function genericUpdate(obj: any, params: any, cache: any) {
		for (const key in params) {
				const value = params[key];
				if (typeof value === "object" && value !== null) {
						if (Array.isArray(value)) {
								obj[key] = obj[key] || [];
								cache[key] = cache[key] || [];
								for (let i = 0; i < value.length; i++) {
										obj[key][i] = obj[key][i] || {};
										cache[key][i] = cache[key][i] || {};
										genericUpdate(obj[key][i], value[i], cache[key][i]);
								}
						} else {
								obj[key] = obj[key] || {};
								cache[key] = cache[key] || {};
								genericUpdate(obj[key], value, cache[key]);
						}
				} else {
						if (cache[key] !== value) {
								obj[key] = value;
								cache[key] = value;
						}
				}
		}
}

window.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("pong-canvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (const clientObj of objects.values()) {
			clientObj.draw(ctx);
		}
	}

	function loop() {
		let state = getState();
		for (const object of state) {
			const id = object["id"];
			let clientObj = objects.get(id);
			if (!clientObj) {

				if (object.name === "hitbox") {
						clientObj = new HitBox({...object, components: []});
				} else {
						clientObj = new GameObject({...object, components: []});
				}
				// console.log(clientObj)
				objects.set(object["id"], clientObj);


				for (let i = 0; i < object.components.length; i ++) {
					const currentcomponent = object.components[i];
					
					if (currentcomponent.name === "sprite") {
						clientObj.addComponent(new Sprite(currentcomponent as Sprite));
					}


					console.log(clientObj);
				}
			} 
			
			else {
				for (let i = 0; i < object.children?.length; i++) {
            const childId = object.children[i];
            const childObj = objects.get(childId);
            if (childObj) {
                clientObj.children[i] = childObj;
            }
        }
				genericUpdate(clientObj, object, clientObj.cache);
			}
		}
		// lmao this is undefined because objects haven't been created
		console.log(objects);
		draw();
		requestAnimationFrame(loop);
	}

	// Fix: use ClientLabel for Label objects


	loop();
});

// In that case, should I have a special class for frontend that extends sprite, which serves the prupsoe of being updated? I'm assumging the frontend won't need a lot of classes, mostly those that are supposed to be used for rendering right?