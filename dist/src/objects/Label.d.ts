import { GameObject } from '../Index.js';
import { Point2D } from '../Coordinates.js';
import { PongGame } from '../pong.js';
interface LabelParams {
    position: Point2D;
    game: PongGame;
    text?: string;
    font?: string;
    color?: string;
}
export declare class Label extends GameObject {
    text: string;
    position: Point2D;
    game: PongGame;
    font: string;
    color: string;
    constructor(params: LabelParams);
    Draw(): void;
}
export {};
//# sourceMappingURL=Label.d.ts.map