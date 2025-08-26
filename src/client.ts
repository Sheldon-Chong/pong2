// client.ts (compile to client.js with `tsc client.ts`)
import { Point2D, Vector2D, interpolate } from '/static/Coordinates.js'
import { drawImg, Sprite } from '/static/objects/Sprite.js'


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
	// console.log("Server says:", event.data);
	data = JSON.parse(event.data);
	// console.log(data);
};

ws.onclose = () => {
	console.log("❌ Disconnected");
};

const img = new Image();
img.src = "./assets/arrow.png"; // Replace with your image URL
const test = new Sprite({imagePath: "./assets/arrow.png", size: new Vector2D(100, 100)});

window.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("pong-canvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	const width = 100;
	const height = 40;

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (data["state"] && Array.isArray(data["state"]["gameObjects"])) {
			for (const object of data["state"]["gameObjects"] as Point2D[]) {
				ctx.fillStyle = "white";
				ctx.fillRect(Number(object.position.x), Number(object.position.y), width, height);
				drawImg(test, ctx, new Point2D(30,30), new Vector2D(100, 100), 0);

				// Draw image at x=50, y=50
				ctx.drawImage(img, 20, 20);

				// Optionally scale the image (width=100, height=100)
				ctx.drawImage(img, 200, 50, 100, 100);

				// Optionally crop and draw
				ctx.drawImage(img, 0, 20, 50, 50, 50, 200, 100, 100);

			}
		}
	}

	function loop() {
		draw();
		requestAnimationFrame(loop);
	}

	loop();
});