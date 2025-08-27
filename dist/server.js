// server.ts
import Fastify from "fastify";
import websocketPlugin from "@fastify/websocket";
import fastifyStatic from "@fastify/static";
import { join } from "path";
const fastify = Fastify();
// Register WS
await fastify.register(websocketPlugin);
class Client {
    keysPressed = new Map();
    constructor() {
    }
    update(input) {
        if (input["type"] === "keydown") {
            this.keysPressed.set(input["key"], true);
        }
        else if (input["type"] === "keyup") {
            this.keysPressed.delete(input["key"]);
        }
    }
}
const client = new Client();
const clients = new Set();
console.log("Registering WebSocket route...");
await fastify.register(async function (fastify) {
    fastify.get("/ws", { websocket: true }, (socket, req) => {
        clients.add(socket);
        console.log("!!! Client connected");
        socket.on("message", (msg) => {
            console.log(">>>> Received input:", msg.toString());
            client.update(JSON.parse(msg.toString()));
        });
        socket.on("close", () => {
            console.log("Client disconnected");
            clients.delete(socket);
        });
    });
});
console.log("WebSocket route registered.");
// Serve static frontend
fastify.get("/", async (_, reply) => {
    return reply.type("text/html").send(`
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Pong2 Game</title>
			<link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.3/dist/tailwind.min.css" rel="stylesheet">
			<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">

		</head>
		<body class="bg-gray-900 text-white min-h-screen flex items-center justify-center">
			<center>
			<div class="flex flex-col items-center justify-center h-screen w-screen overflow-auto">
			<h1 class="text-3xl font-bold mb-4">Barebones Pong Game</h1>
			<canvas id="pong-canvas" width="800" height="400" class="rounded-lg shadow-lg border-4 border-cyan-400 bg-gray-800 max-w-full"></canvas>
		<div class="mt-6 flex justify-between items-center" style="width:1000px; height:120px; border-radius:16px;">
		<div class="h-20 bg-gray-500 rounded-2xl" style="width:450px; height:120px"></div>
		<div class="h-20 bg-gray-500 rounded-2xl hover:bg-gray-400" style="width:450px; height:120px"></div>
		</div>    </div>
			</center>
			<script type="module" src="/client.js"></script>			</body>
		</html>
		
	`);
});
// Serve compiled client.js
import { readFileSync, existsSync } from "fs";
fastify.get("/client.js", async (_, reply) => {
    console.log("asdasdsd");
    console.log(join(process.cwd(), "dist", "client.js"));
    return reply.type("application/javascript").send(readFileSync(join(process.cwd(), "dist", "client.js"), "utf-8"));
});
// First registration (dist)
await fastify.register(fastifyStatic, {
    root: join(process.cwd(), "dist"),
    //   prefix: "/static/",
});
// Second registration (assets)
await fastify.register(fastifyStatic, {
    root: join(process.cwd(), "assets"),
    prefix: "/assets/",
    decorateReply: false // Prevents duplicate decorator error
});
fastify.get("/:file", async (request, reply) => {
    const file = request.params.file;
    if (file.endsWith(".js")) {
        const filePath = join(process.cwd(), "dist", file);
        if (existsSync(filePath)) {
            return reply.type("application/javascript").send(readFileSync(filePath, "utf-8"));
        }
        else {
            return reply.code(404).send("File not found");
        }
    }
    return reply.code(404).send("Not found");
});
import { PongGame3 } from "../dist/pong3.js";
import { Socket } from "dgram";
const pongGame = new PongGame3(client);
const gameState = {};
// Game loop function
function updateGameObjects() {
    const state = pongGame.exportState();
    for (const client of clients) {
        if (client.readyState === 1) { // 1 = OPEN
            client.send(JSON.stringify({ type: "state", state }));
        }
    }
    pongGame.update();
}
const TICK_RATE = 1000 / 60; // 60 FPS
setInterval(updateGameObjects, TICK_RATE);
fastify.listen({ port: 3000 }, (err, address) => {
    if (err)
        throw err;
    console.log(`🚀 Server running at ${address}`);
});
//# sourceMappingURL=server.js.map