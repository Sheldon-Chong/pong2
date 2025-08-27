import { Vector2D } from '../objects/Coordinates.js';
export class GameObject {
    game;
    // identification
    name = "";
    // hierarchy
    parent = null;
    children = [];
    // physics
    position;
    velocity = new Vector2D(0, 0);
    acceleration = new Vector2D(0, 0);
    maximumVelocity = new Vector2D(1000, 1000);
    // public sprite?: Sprite;
    // public hitbox?: HitBox | null;
    // events
    onCollide;
    onUpdate;
    constructor(params) {
        Object.assign(this, params);
    }
    addChild(object) {
        this.children.push(object);
        object.parent = this;
    }
    update() { this.onUpdate(); }
}
