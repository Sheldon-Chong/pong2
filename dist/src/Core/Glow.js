import { Point2D, Vector2D } from '../Coordinates.js';
export class Glow {
    shadowColor;
    shadowBlur;
    shadowOffsetX;
    shadowOffsetY;
    blendMode;
    constructor(shadowColor = "red", shadowBlur = 20, shadowOffsetX = 0, shadowOffsetY = 0, blendMode = "source-over") {
        this.shadowColor = shadowColor;
        this.shadowBlur = shadowBlur;
        this.shadowOffsetX = shadowOffsetX;
        this.shadowOffsetY = shadowOffsetY;
        this.blendMode = blendMode;
    }
}
//# sourceMappingURL=Glow.js.map