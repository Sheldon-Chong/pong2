import { Point2D } from "./Coordinates.js";
export declare class Viewport {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    camera: any;
    constructor(params: Partial<Viewport>);
    toScreenCoords(position: Point2D, camera: any): Point2D;
}
//# sourceMappingURL=Viewport.d.ts.map