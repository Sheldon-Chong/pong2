import { Point2D, Vector2D } from '../Coordinates.js';
import { GameObject } from '../Index.js';
import { PongGame } from '../pong.js';
export declare class Camera extends GameObject {
    shakeValue: Vector2D;
    target: Point2D;
    rawPosition: Point2D;
    constructor(startingPos: Point2D, game: PongGame);
}
//# sourceMappingURL=Camera.d.ts.map