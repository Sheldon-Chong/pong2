import { Point2D, Vector2D } from '../Coordinates.js';
import { Glow } from './Glow.js';
export declare class Sprite {
    image: HTMLImageElement;
    imagePath: string | HTMLImageElement | null;
    size: Vector2D;
    rotation: number;
    flippedHorizontal: boolean;
    crop: boolean;
    outline: boolean;
    opacity: number;
    blendMode: GlobalCompositeOperation;
    glow: Glow | null;
    pos: Point2D;
    config(params: Partial<Sprite>): Sprite;
    constructor(params?: Partial<Sprite>);
    drawImg(ctx: CanvasRenderingContext2D, pos: Point2D, size: Vector2D, angle: number): void;
    clone(): Sprite;
}
//# sourceMappingURL=Sprite.d.ts.map