import { Vector2D } from '../Coordinates.js';
import { GameObject } from './GameObject';
export declare class HitBox {
    size: Vector2D;
    parent: GameObject;
    constructor(parent: GameObject, size?: Vector2D);
    isCollidingWith(other: HitBox): boolean;
}
//# sourceMappingURL=HitBox.d.ts.map