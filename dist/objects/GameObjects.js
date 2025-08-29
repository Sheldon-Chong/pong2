import { Point2D, Vector2D } from './Coordinates.js';
import { Sprite } from './Sprite.js';
import { Component } from './Component.js';
const RenderableMarker = Symbol("Renderable");
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
    test;
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
        for (const component of this.components) {
            if (component.name === "sprite") {
                try {
                    component.draw(ctx);
                    console.log("draw");
                }
                catch (error) {
                    console.log(typeof component.image);
                    // console.error("Error drawing component:", error);
                }
            }
            // this.test.draw(ctx);
        }
    }
}
//# sourceMappingURL=GameObjects.js.map