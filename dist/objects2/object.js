import { Point2D, Vector2D } from '../Coordinates.js';
export class GameObject {
    position;
    game;
    parent = null;
    name = "";
    velocity = new Vector2D(0, 0);
    acceleration = new Vector2D(0, 0);
    maximumVelocity = new Vector2D(1000, 1000);
    size = new Vector2D(0, 0);
    children = [];
    // public sprite?: Sprite;
    // public hitbox?: HitBox | null;
    onCollide;
    onUpdate;
    constructor(params) {
        Object.assign(this, params);
    }
    addChild(object) {
        this.children.push(object);
        object.parent = this;
    }
    update() {
        this.onUpdate();
    }
}
//# sourceMappingURL=object.js.map