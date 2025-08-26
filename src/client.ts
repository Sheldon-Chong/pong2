// client.ts (compile to client.js with `tsc client.ts`)
import { Point2D, Vector2D, interpolate } from '/static/Coordinates.js'

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

window.addEventListener("DOMContentLoaded", () => {
	const canvas = document.getElementById("pong-canvas") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	const width = 100;
	const height = 40;

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (data["state"] && Array.isArray(data["state"]["gameObjects"])) {
			console.log(">>>" + data["state"]["gameObjects"].x);
			for (const object of data["state"]["gameObjects"] as Point2D[]) {
				ctx.fillStyle = "white";
				ctx.fillRect(Number(object.position.x), Number(object.position.y), width, height);
			}
		}
	}

	function loop() {
		draw();
		requestAnimationFrame(loop);
	}

	loop();
});