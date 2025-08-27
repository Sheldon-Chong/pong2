import { Point2D, Vector2D } from './Coordinates.js';
export declare class Glow {
    shadowColor: string;
    shadowBlur: number;
    shadowOffsetX: number;
    shadowOffsetY: number;
    blendMode: GlobalCompositeOperation;
    constructor(shadowColor?: string, shadowBlur?: number, shadowOffsetX?: number, shadowOffsetY?: number, blendMode?: GlobalCompositeOperation);
}
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
    position: Point2D;
    config(params: Partial<Sprite>): Sprite;
    constructor(params?: Partial<Sprite>);
    clone(): Sprite;
}
export declare function drawImg(sprite: Sprite, ctx: CanvasRenderingContext2D, position: Point2D, size: Vector2D, angle: number): void;
//# sourceMappingURL=Sprite.d.ts.map