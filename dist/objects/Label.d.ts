import { Point2D } from './Coordinates.js';
import { GameObject } from './GameObjects.js';
import { PongGame3 } from '../pong3.js';
export declare class Label extends GameObject {
    text: string;
    position: Point2D;
    game: PongGame3;
    font: string;
    color: string;
    constructor(params: any);
    Draw(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=Label.d.ts.map