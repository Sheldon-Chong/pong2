import { Point2D } from "./Coordinates.js";
export declare class Viewport {
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    constructor(params: Partial<Viewport>);
    toScreenCoords(position: Point2D): Point2D;
}
//# sourceMappingURL=Viewport.d.ts.map