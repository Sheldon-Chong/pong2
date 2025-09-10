// server.ts
import Fastify from "fastify";
import websocketPlugin from "@fastify/websocket";
import fastifyStatic from "@fastify/static";
import { join } from "path";
import { PongGame } from "../dist/pong3.js";
import { Socket } from "dgram";
import { writeFileSync } from "fs";
const fastify = Fastify();
let outputList = [];
// Register WS
await fastify.register(websocketPlugin);
class Client {
    keysPressed = new Map();
    game;
    socket;
    constructor() { }
    update(input) {
        if (!input.payload)
            return;
        if (input.type === "input") {
            const { key, action } = input.payload;
            if (action === "keydown") {
                this.keysPressed.set(key, true);
            }
            else if (action === "keyup") {
                this.keysPressed.delete(key);
            }
        }
        if (input.type === "request") {
            outputList.push(compile(true));
        }
    }
}
const clients = new Set();
console.log("Registering WebSocket route...");
fastify.get("/ws", { websocket: true }, (socket, req) => {
    const player = new Client();
    player.game = pongGame;
    player.socket = socket;
    clients.add(player);
    console.log("!!! Client connected");
    socket.on("message", (msg) => {
        const data = JSON.parse(msg.toString());
        if (data["type"] === "ready") {
            console.log("readdy");
            player.socket.send(JSON.stringify({
                type: "ready",
                payload: {}
            }));
        }
        player.update(data); // update this player's state only
    });
    socket.on("close", () => {
        console.log("Client disconnected");
        clients.delete(player);
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
const pongGame = new PongGame(clients);
// client.game = pongGame;
function compile(includeStaticObjects) {
    const state = pongGame.exportState(includeStaticObjects);
    let output = JSON.stringify({
        type: "state",
        state: state,
        metadata: {
            timestamp: Date.now(),
            delta: pongGame.delta,
            fps: pongGame.fps,
        }
    }, null, 2);
    return output;
}
// Game loop function
function updateGameObjects() {
    let output = compile(false);
    writeFileSync("game_state.json", output, "utf-8");
    for (const client of clients) {
        if (client.socket.readyState === 1) { // 1 = OPEN
            client.socket.send(output);
            while (outputList.length > 0) {
                console.log("sending");
                client.socket.send(outputList[outputList.length - 1]);
                outputList.pop();
            }
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