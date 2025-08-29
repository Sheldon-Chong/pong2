import { Point2D, Vector2D } from './Coordinates.js';
import { Sprite } from './Sprite.js';
import { Component } from './Component.js';
const RenderableMarker = Symbol("Renderable");
// function genericUpdate(obj: any, params: any, cache: any) {
// 		for (const key in params) {
// 				if (cache[key] !== params[key]) {
// 						if (key === "position" && params.position) 
// 								obj.position = new Point2D(params.position.x, params.position.y);
// 						else if (key === "size" && params.size) 
// 								obj.size = new Vector2D(params.size.x, params.size.y);
// 						else 
// 								obj[key] = params[key];
// 						cache[key] = params[key];
// 				}
// 		}
// }
export class GameObject {
    game;
    id;
    static globalId = 0;
    // identification
    name = "";
    // hierarchy
    parent = null;
    children = [];
    // physics
    position = new Point2D(0, 0);
    rotation = 0;
    scale = new Vector2D(10, 10);
    velocity = new Vector2D(0, 0);
    acceleration = new Vector2D(0, 0);
    maximumVelocity = new Vector2D(1000, 1000);
    components = [];
    // public sprite?: Sprite;
    // public hitbox?: HitBox | null;
    // events
    // public onCollide?: (other: GameObject) => void;
    onUpdate;
    cache = {};
    test;
    // updateFrom(params: any) {
    // 		genericUpdate(this, params, this.cache);
    // 		// Optionally, update components as well:
    // 		if (params.components && Array.isArray(params.components)) {
    // 				for (let i = 0; i < params.components.length; i++) {
    // 						if (this.components[i] && typeof this.components[i].updateFrom === "function") {
    // 								this.components[i].updateFrom(params.components[i]);
    // 						}
    // 				}
    // 		}
    // }
    constructor(params) {
        Object.assign(this, params);
        this.id = GameObject.globalId;
        GameObject.globalId++;
        for (const component of this.components) {
            component.parent = this;
            component.init();
        }
        this.test = new Sprite({
            imagePath: "assets/arrow.png",
            parent: this
        }).init();
    }
    addComponent(component) {
        this.components.push(component);
        component.parent = this;
        component.init();
        return component;
    }
    addChild(object) {
        this.children.push(object);
        object.parent = this;
        object.game = this.game;
    }
    update() {
        if (this.onUpdate)
            this.onUpdate();
    }
    getWorldPosition() {
        return this.position;
    }
    draw(ctx) {
        // Draw this object's components
        for (const component of this.components) {
            if (component.name === "sprite") {
                try {
                    component.draw(ctx);
                }
                catch (error) {
                    console.log(typeof component.image);
                }
            }
        }
        // Recursively draw children
        for (const child of this.children) {
            console.log(JSON.stringify(this.children));
            try {
                child.draw(ctx);
                console.log("child drawn", typeof child);
            }
            catch (error) {
                console.log("error", error);
            }
        }
    }
}
//# sourceMappingURL=GameObjects.js.map