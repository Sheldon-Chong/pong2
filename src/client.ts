// client.ts (compile to client.js with `tsc client.ts`)
import { Point2D, Vector2D, interpolate } from './objects/Coordinates.js'
import type { GameObject } from './objects/GameObjects.js';
import { drawImg, Sprite } from './objects/Sprite.js'


const ws = new WebSocket("ws://localhost:3000/ws");

ws.onopen = () => {
	console.log("CLIENT Connected to server");

	// Listen for keyboard events
	window.addEventListener("keydown", (e) => {
		// console.log("Key pressed:", e.key); // Add this line
		if (
			(e.key === "ArrowUp" || e.key === "ArrowDown") &&
			ws.readyState === WebSocket.OPEN
		) {
			ws.send(e.key);
		}
	});
};

let data = {} 

ws.onmessage = (event) => {
	console.log("Server says:", event.data);
	data = JSON.parse(event.data);
	// console.log(data);
};

ws.onclose = () => {
	console.log("❌ Disconnected");
};






const objects = new Map<string, ClientSprite>();



class ClientSprite extends Sprite {
    id: string;
    cache = {};

    static fromServer(object) {
        return new ClientSprite({
            imagePath: object["Sprite"]["imagePath"], 
            size: new Vector2D(50, 50),
            position: new Point2D(object["position"]["x"], object["position"]["y"]),
            rotation: 0,
            cache: object
        });
    }

    updateFrom(params: Partial<ClientSprite>) {
        for (const key in params) {
            if (this.cache[key] !== params[key]) {
                if (key === "position" && params.position) 
                    this.position = new Point2D(params.position.x, params.position.y);
				else if (key === "size" && params.size) 
                    this.size = new Vector2D(params.size.x, params.size.y);
				else 
                    (this as any)[key] = params[key];
                
                this.cache[key] = params[key];
            }
        }
    }

    constructor(params: Partial<ClientSprite>) {
        super(params);
        if (params.cache) this.cache = { ...params.cache };
    }
}


function getState() {
	if (data["state"] && Array.isArray(data["state"]["gameObjects"])) {
		return data["state"]["gameObjects"];
	}
	return [];
}

window.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("pong-canvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (const [id, sprite] of Object.entries(objects)) {
			ctx.fillStyle = "white";
			// ctx.fillRect(Number(sprite.position.x), Number(sprite.position.y), width, height);
			drawImg(sprite, ctx, sprite.position, sprite.size, sprite.rotation);
		}
	}

	function loop() {
		let state = getState();
		for ( const object of state ) {
			if (!(object["id"] in objects)) {
				objects[object["id"]] = ClientSprite.fromServer(object);
			}
			else {
				objects[object["id"]].updateFrom(object);
			}
		}
		console.log(objects);
		draw();
		requestAnimationFrame(loop);
	}

	loop();
});

// In that case, should I have a special class for frontend that extends sprite, which serves the prupsoe of being updated? I'm assumging the frontend won't need a lot of classes, mostly those that are supposed to be used for rendering right?