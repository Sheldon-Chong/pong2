// client.ts (compile to client.js with `tsc client.ts`)
import { Point2D, Vector2D, interpolate } from './objects/Coordinates.js';
import { Glow } from './objects/Glow.js';
import { drawImg, Sprite } from './objects/Sprite.js';
import { Label } from './objects/Label.js';
const ws = new WebSocket("ws://localhost:3000/ws");
ws.onopen = () => {
    console.log("CLIENT Connected to server");
    // Listen for keyboard events
    window.addEventListener("keydown", (e) => {
        if ((e.key === "ArrowUp" || e.key === "ArrowDown") &&
            ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ key: e.key, type: "keydown" }));
        }
    });
    window.addEventListener("keyup", (e) => {
        if ((e.key === "ArrowUp" || e.key === "ArrowDown") &&
            ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ key: e.key, type: "keyup" }));
        }
    });
};
let data = {};
ws.onmessage = (event) => {
    data = JSON.parse(event.data);
    console.log(data);
    // console.log(data);
};
ws.onclose = () => {
    console.log("❌ Disconnected");
};
const objects = new Map();
function genericUpdate(obj, params, cache) {
    for (const key in params) {
        if (cache[key] !== params[key]) {
            if (key === "position" && params.position)
                obj.position = new Point2D(params.position.x, params.position.y);
            else if (key === "size" && params.size)
                obj.size = new Vector2D(params.size.x, params.size.y);
            else
                obj[key] = params[key];
            cache[key] = params[key];
        }
    }
}
class ClientSprite extends Sprite {
    id;
    cache = {};
    static fromServer(object) {
        return new ClientSprite({
            imagePath: object["Sprite"]["imagePath"],
            size: new Vector2D(50, 50),
            position: new Point2D(object["position"]["x"], object["position"]["y"]),
            rotation: 0,
            cache: object,
            glow: new Glow(object["Sprite"]["glow"])
        });
    }
    // c
    updateFrom(params) {
        for (const key in params) {
            if (this.cache[key] !== params[key]) {
                if (key === "position" && params.position)
                    this.position = new Point2D(params.position.x, params.position.y);
                else if (key === "size" && params.size)
                    this.size = new Vector2D(params.size.x, params.size.y);
                else
                    this[key] = params[key];
                this.cache[key] = params[key];
            }
        }
    }
    constructor(params) {
        super(params);
        if (params.cache)
            this.cache = { ...params.cache };
    }
    draw(ctx) {
        drawImg(ctx, this);
    }
}
class ClientLabel {
    id;
    cache = {};
    renderable;
    position;
    size;
    rotation;
    static fromServer(object) {
        const label = new Label({
            text: "test", // not object["Label"]["text"]
            font: object["font"] || "20px Avant",
            color: object["color"] || "black",
            size: new Vector2D(50, 50),
            position: new Point2D(object["position"].x, object["position"].y),
            rotation: object["rotation"] || 0,
            // glow: object["glow"] ? new Glow(object["glow"]) : undefined,
        });
        return new ClientLabel(object["id"], label, object);
    }
    constructor(id, renderable, initialData) {
        this.id = id;
        this.renderable = renderable;
        this.cache = { ...initialData };
        this.updateFrom(initialData);
    }
    updateFrom(params) {
        genericUpdate(this.renderable, params, this.cache);
    }
    draw(ctx) {
        this.renderable.draw(ctx);
    }
}
class ClientRenderable {
    id;
    cache = {};
    renderable;
    constructor(id, renderable, initialData) {
        this.id = id;
        this.renderable = renderable;
        this.cache = { ...initialData };
        this.updateFrom(initialData);
    }
    updateFrom(params) {
        genericUpdate(this.renderable, params, this.cache);
    }
    draw(ctx) {
        this.renderable.draw(ctx);
    }
}
function getState() {
    if (data["state"] && Array.isArray(data["state"]["gameObjects"])) {
        return data["state"]["gameObjects"];
    }
    return [];
}
window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("pong-canvas");
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
            let clientObj = objects.get(object["id"]);
            if (!clientObj) {
                if (object["Sprite"]) {
                    clientObj = new ClientRenderable(object["id"], ClientSprite.fromServer(object), object);
                }
                else if (object["name"] && object["name"] === "Label") {
                    clientObj = new ClientRenderable(object["id"], ClientLabel.fromServer(object), object);
                }
                if (clientObj)
                    objects.set(object["id"], clientObj);
            }
            else {
                clientObj.updateFrom(object);
            }
        }
        // console.log(objects);
        draw();
        requestAnimationFrame(loop);
    }
    // Fix: use ClientLabel for Label objects
    loop();
});
// In that case, should I have a special class for frontend that extends sprite, which serves the prupsoe of being updated? I'm assumging the frontend won't need a lot of classes, mostly those that are supposed to be used for rendering right?
//# sourceMappingURL=client.js.map