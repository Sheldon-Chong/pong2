import { Vector2D } from './Coordinates.js';
import { GameObject } from './GameObjects.js';
import { type Renderable } from './Sprite.js';
export declare class Label extends GameObject implements Renderable {
    text: string;
    size: Vector2D;
    rotation: number;
    font: string;
    color: string;
    constructor(params: any);
    draw(ctx: CanvasRenderingContext2D): void;
}
//# sourceMappingURL=Label.d.ts.map