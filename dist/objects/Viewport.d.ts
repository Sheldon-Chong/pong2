import type { Camera } from "./Camera.js";
import { Point2D } from "./Coordinates.js";
export declare class Viewport {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    camera: Camera;
    constructor(params: Partial<Viewport>);
    toScreenCoords(position: Point2D, camera?: Camera): Point2D;
}
//# sourceMappingURL=Viewport.d.ts.map