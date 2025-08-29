import { Glow } from './Glow.js';
import { Component } from './Component.js';
export interface Renderable {
    draw(ctx: CanvasRenderingContext2D): void;
}
export declare enum Tags {
    Renderable = "Renderable",
    Updatable = "Updatable",
    Collidable = "Collidable"
}
export declare class Outline {
    static CIRCLE: number;
    static RECTANGLE: number;
    thickness: number;
    type: number;
    constructor(params: Partial<Outline>);
}
export declare class Sprite extends Component implements Renderable {
    [Tags.Renderable]: boolean;
    image: HTMLImageElement;
    imagePath: string | HTMLImageElement | null;
    flippedHorizontal: boolean;
    crop: boolean;
    outline: Outline | null;
    opacity: number;
    blendMode: GlobalCompositeOperation;
    glow: Glow | null;
    config(params: Partial<Sprite>): Sprite;
    toJSON(): {
        name: string;
        imagePath: string | HTMLImageElement;
        flippedHorizontal: boolean;
        crop: boolean;
        outline: Outline;
        opacity: number;
        blendMode: GlobalCompositeOperation;
        glow: Glow;
    };
    constructor(params?: Partial<Sprite>);
    init(): this;
    draw(ctx: CanvasRenderingContext2D): void;
}
export declare function drawImg(ctx: CanvasRenderingContext2D, sprite: Sprite, params?: Partial<Sprite>): void;
//# sourceMappingURL=Sprite.d.ts.map