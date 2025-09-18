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
    clientUpdate(): void;
    constructor(params: Partial<ImageObject>);
    init(): void;
    export(exportStatic?: boolean): {
        id: number;
        className: string;
        components: any[];
        zIndex: number;
        position: {
            x: number;
            y: number;
        };
        scaleFactor: Vector2D;
    };
}
//# sourceMappingURL=ImageObject.d.ts.map