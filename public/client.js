// client.ts (compile to client.js with `tsc client.ts`)
import { Point2D, Vector2D } from './objects/Coordinates.js';
import { drawImg, Sprite } from './objects/Sprite.js';
const ws = new WebSocket("ws://localhost:3000/ws");
ws.onopen = () => {
    console.log("CLIENT Connected to server");
    // Listen for keyboard events
    window.addEventListener("keydown", (e) => {
        // console.log("Key pressed:", e.key); // Add this line
        if ((e.key === "ArrowUp" || e.key === "ArrowDown") &&
            ws.readyState === WebSocket.OPEN) {
            ws.send(e.key);
        }
    });
};
let data = {};
ws.onmessage = (event) => {
    console.log("Server says:", event.data);
    data = JSON.parse(event.data);
    // console.log(data);
};
ws.onclose = () => {
    console.log("❌ Disconnected");
};
class ClientSprite extends Sprite {
    id;
    updateFromServer(serverData) {
        this.position = new Point2D(serverData.position.x, serverData.position.y);
        this.rotation = serverData.Sprite.rotation;
        // ...update other properties as needed
    }
}
const img = new Image();
img.src = "./assets/arrow.png"; // Replace with your image URL
const test = new ClientSprite({ imagePath: "./assets/arrow.png", size: new Vector2D(100, 100) });
window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("pong-canvas");
    const ctx = canvas.getContext("2d");
    const width = 100;
    const height = 40;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (data["state"] && Array.isArray(data["state"]["gameObjects"])) {
            for (const object of data["state"]["gameObjects"]) {
                ctx.fillStyle = "white";
                ctx.fillRect(Number(object.position.x), Number(object.position.y), width, height);
                drawImg(test, ctx, test.position, test.size, test.rotation);
            }
        }
    }
    function loop() {
        draw();
        requestAnimationFrame(loop);
    }
    loop();
});
// In that case, should I have a special class for frontend that extends sprite, which serves the prupsoe of being updated? I'm assumging the frontend won't need a lot of classes, mostly those that are supposed to be used for rendering right?
