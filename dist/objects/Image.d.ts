import { Vector2D } from "./Coordinates.js";
import { GameObject } from "./GameObject.js";
export declare class ImageObject extends GameObject {
    path: string;
    scaleFactor: Vector2D;
    params: any;
    className: string;
    private sprite;
    constructor(params: Partial<ImageObject>);
    init(): void;
    export(exportStatic?: boolean): {
        id: number;
        className: string;
        components: any[];
    };
}
//# sourceMappingURL=Image.d.ts.map