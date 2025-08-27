import { Point2D, Vector2D } from './Coordinates.js';
import { Sprite } from './Sprite.js';
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
    position;
    velocity = new Vector2D(0, 0);
    acceleration = new Vector2D(0, 0);
    maximumVelocity = new Vector2D(1000, 1000);
    sprite;
    // public hitbox?: HitBox | null;
    // events
    onCollide;
    onUpdate;
    constructor(params) {
        Object.assign(this, params);
        this.id = GameObject.globalId;
        GameObject.globalId++;
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
}
//# sourceMappingURL=GameObjects.js.map