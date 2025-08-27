import { Point2D, Vector2D } from '../objects/Coordinates.js';
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
    // getWorldPosition(): Point2D {
    //     if (!this.parent) {
    //         return new Point2D(
    //             this.position.x - this.game.camera.position.x,
    //             this.position.y - this.game.camera.position.y
    //         ).add(this.game.canvasSize.divide(new Vector2D(2,2)));
    //     }
    //     const parentPos = this.parent.getWorldPosition();
    //     return new Point2D(
    //         parentPos.x + this.position.x,
    //         parentPos.y + this.position.y
    //     );
    // }
    update() { this.onUpdate(); }
}
//# sourceMappingURL=GameObjects.js.map