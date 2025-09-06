import { Point2D, Vector2D } from './objects/Coordinates.js';
import { GameObject } from './objects/GameObject.js';
import { Camera } from './objects/Camera.js';
import { Viewport } from './objects/Viewport.js';
import { HitBox } from './objects/Hitbox.js';
export class GameWorld {
    gameObjects = new Map();
    camera = null;
    viewport;
    game;
    constructor(viewport) {
        this.viewport = viewport ?? new Viewport({ width: 800, height: 400 });
    }
    addObject(object) {
        this.gameObjects.set(object.id, object);
        object.init();
        if (object.children && object.children.length > 0) {
            for (const child of object.children) {
                this.addObject(child);
                child.init();
            }
        }
        return object;
    }
    checkCollisions() {
        const hitboxes = [];
        for (const obj of this.gameObjects.values()) {
            for (const comp of obj.components) {
                if (comp instanceof HitBox) {
                    hitboxes.push(comp);
                }
            }
        }
        for (let i = 0; i < hitboxes.length; i++) {
            for (let j = i + 1; j < hitboxes.length; j++) {
                const a = hitboxes[i];
                const b = hitboxes[j];
                if (a.isCollidingWith(b)) {
                    a.isColliding = b.isColliding = true;
                    a.onCollide?.(b);
                    b.onCollide?.(a);
                }
                else {
                    a.isColliding = b.isColliding = false;
                }
            }
        }
    }
    update() {
        for (const object of this.gameObjects.values()) {
            object.update();
            object.toUpdate = true;
        }
        this.checkCollisions();
    }
    exportBackLog = [];
    exportState() {
        const visited = new Set();
        const flatObjects = [];
        function flatten(obj) {
            if (!obj || visited.has(obj.id))
                return;
            visited.add(obj.id);
            if (!obj.toUpdate)
                return;
            flatObjects.push(obj.export());
            if (obj.children && obj.children.length > 0) {
                for (const child of obj.children)
                    flatten(child);
            }
            obj.toUpdate = false;
        }
        for (const obj of this.gameObjects.values()) {
            flatten(obj);
        }
        this.exportBackLog.length = 0;
        return {
            camera: {
                position: this.camera?.position
            },
            gameObjects: flatObjects,
        };
    }
}
//# sourceMappingURL=GameWorld.js.map