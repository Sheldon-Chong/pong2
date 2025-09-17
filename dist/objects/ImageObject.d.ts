import { Vector2D } from "./Coordinates.js";
import { GameObject } from "./GameObject.js";
import { Sprite } from "./Sprite.js";
export declare class Interpolate {
    target: GameObject;
    targetOffset: Vector2D;
    clamp: Vector2D;
    slowness: number;
    constructor(params: Partial<Interpolate>);
}
export declare class ImageObject extends GameObject {
    sprite: Sprite;
    scaleFactor: Vector2D;
    params: any;
    interpolate: Interpolate;
    private truePos;
    className: string;
    constructor(params: Partial<ImageObject>);
    init(): void;
    export(exportStatic?: boolean): {
        id: number;
        className: string;
        sprite: {
            id: number;
            name: string;
            imagePath: string | HTMLImageElement;
            STATIC_flippedHorizontal: boolean;
            STATIC_crop: boolean;
            STATIC_outline: import("./Sprite.js").Outline;
            STATIC_opacity: number;
            STATIC_blendMode: GlobalCompositeOperation;
            STATIC_glow: import("./Glow.js").Glow;
        };
        zIndex: number;
        position: {
            x: number;
            y: number;
        };
        scaleFactor: Vector2D;
    };
}
//# sourceMappingURL=ImageObject.d.ts.map