import { Point2D, Vector2D } from './Coordinates.js';
import { GameObject } from './GameObject.js';
export declare class Camera extends GameObject {
    shakeValue: Vector2D;
    target: GameObject;
    rawPosition: Point2D;
    className: string;
    position: Point2D;
    constructor(params: Partial<Camera>);
    export(): {
        position: Point2D;
        className: string;
    };
}
//# sourceMappingURL=Camera.d.ts.map