import { Vector2D, Point2D } from "./Coordinates.js";
export class Viewport {
    ctx;
    width;
    height;
    camera = null;
    constructor(params) {
        Object.assign(this, params);
    }
    toScreenCoords(position, camera = null) {
        const canvasCenter = new Vector2D(this.width / 2, this.height / 2);
        if (this.camera !== null) {
            return position.add(canvasCenter).subtract(this.camera.position);
        }
        return position.add(canvasCenter);
    }
}
//# sourceMappingURL=Viewport.js.map