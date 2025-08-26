import { Point2D, Vector2D } from './Coordinates';
import { GameObject } from './GameObjects.js';
import { PongGame3 } from '../pong3.js';
export declare class Camera extends GameObject {
    shakeValue: Vector2D;
    target: GameObject;
    rawPosition: Point2D;
    game: PongGame3;
    position: Point2D;
    constructor(params: Partial<Camera>);
}
//# sourceMappingURL=Camera.d.ts.map