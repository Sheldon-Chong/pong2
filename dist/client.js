// client.ts (compile to client.js with `tsc client.ts`)
import { Point2D, Vector2D, interpolate } from './objects/Coordinates.js';
import { GameObject } from './objects/GameObjects.js';
import { Glow } from './objects/Glow.js';
import { drawImg, Sprite, Tags } from './objects/Sprite.js';
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
    // console.log(data);
    // console.log(data);
};
ws.onclose = () => {
    console.log("❌ Disconnected");
};
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
            cache: object,
            glow: new Glow(object["Sprite"]["glow"])
        });
    }
    updateFrom(params) {
        for (const key in params) {
            this.cache[key] = params[key];
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
const objects = new Map();
/// todo TEST NEW OBJECT!!!!
// objects.set("400", new GameObject({
// 	components: [
// 		new Sprite({
// 			imagePath: "assets/skins/ghost_light.png",
// 		})
// 	]
// }));
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
            const id = object["id"];
            let clientObj = objects.get(id);
            if (!clientObj) {
                clientObj = new GameObject({ ...object, components: [] });
                // console.log(clientObj)
                objects.set(object["id"], clientObj);
                for (let i = 0; i < object.components.length; i++) {
                    const currentcomponent = object.components[i];
                    if (currentcomponent.name === "sprite") {
                        clientObj.addComponent(new Sprite(currentcomponent));
                    }
                    console.log(clientObj);
                }
            }
            else {
                // clientObj.updateFrom(object);
            }
        }
        // lmao this is undefined because objects haven't been created
        // console.log(objects);
        draw();
        requestAnimationFrame(loop);
    }
    // Fix: use ClientLabel for Label objects
    loop();
});
// In that case, should I have a special class for frontend that extends sprite, which serves the prupsoe of being updated? I'm assumging the frontend won't need a lot of classes, mostly those that are supposed to be used for rendering right?
//# sourceMappingURL=client.js.map