import { Vector2D } from "./Coordinates.js";
import { GameObject } from "./GameObject.js";
export declare class ImageObject extends GameObject {
    sprite: any;
    scaleFactor: Vector2D;
    params: any;
    className: string;
    constructor(params: Partial<ImageObject>);
    init(): void;
    export(exportStatic?: boolean): {
        id: number;
        className: string;
        components: any[];
        sprite: any;
        zIndex: number;
        position: import("./Coordinates.js").Point2D;
        scaleFactor: Vector2D;
    };
}
//# sourceMappingURL=ImageObject.d.ts.map