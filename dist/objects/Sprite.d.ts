import { Point2D, Vector2D } from './Coordinates.js';
import { Glow } from './Glow.js';
export interface Renderable {
    position: Point2D;
    size: Vector2D;
    rotation: number;
    draw(ctx: CanvasRenderingContext2D): void;
}
export declare class Sprite implements Renderable {
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
    position: Point2D;
    config(params: Partial<Sprite>): Sprite;
    toJSON(): {
        imagePath: string | HTMLImageElement;
        size: Vector2D;
        rotation: number;
        flippedHorizontal: boolean;
        crop: boolean;
        outline: boolean;
        opacity: number;
        blendMode: GlobalCompositeOperation;
        glow: Glow;
        position: Point2D;
    };
    constructor(params?: Partial<Sprite>);
    draw(ctx: CanvasRenderingContext2D): void;
    clone(): Sprite;
}
export declare function drawImg(ctx: CanvasRenderingContext2D, sprite: Sprite, params?: Partial<Sprite>): void;
//# sourceMappingURL=Sprite.d.ts.map