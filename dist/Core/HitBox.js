import { Vector2D, Point2D } from '../Coordinates.js';
import { GameObject } from './GameObject';
export class HitBox {
    size;
    parent;
    constructor(parent, size = new Vector2D(30, 50)) {
        this.parent = parent;
        this.size = size;
    }
    isCollidingWith(other) {
        const aPos = this.parent.position;
        const bPos = other.parent.position;
        return (Math.abs(aPos.x - bPos.x) < (this.size.x + other.size.x) / 2 &&
            Math.abs(aPos.y - bPos.y) < (this.size.y + other.size.y) / 2);
    }
}
//# sourceMappingURL=HitBox.js.map