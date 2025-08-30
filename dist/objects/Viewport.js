import { Vector2D, Point2D } from "./Coordinates.js";
export class Viewport {
    ctx;
    width;
    height;
    constructor(params) {
        Object.assign(this, params);
    }
    toScreenCoords(position) {
        const canvasCenter = new Vector2D(this.width / 2, this.height / 2);
        return position.add(canvasCenter);
    }
}
//# sourceMappingURL=Viewport.js.map