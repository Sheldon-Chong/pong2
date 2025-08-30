import { Point2D, Vector2D } from './Coordinates.js';
import { GameObject } from './GameObjects.js';
export class HitBox extends GameObject {
    isColliding = false;
    constructor(params) {
        super(params);
        this.name = "hitbox";
        this.scale = new Vector2D(1, 1);
        this.onUpdate = () => {
            this.scale = this.scale.add(new Vector2D(0.03, 0.03));
        };
    }
    draw(viewport) {
        viewport.ctx.save();
        viewport.ctx.strokeStyle = this.isColliding ? 'green' : 'red';
        viewport.ctx.lineWidth = 2;
        const center = viewport.toScreenCoords(this.getWorldPosition());
        const scale = this.getWorldScale();
        const halfScaleX = scale.x / 2;
        const halfScaleY = scale.y / 2;
        viewport.ctx.strokeRect(center.x - halfScaleX, center.y - halfScaleY, scale.x, scale.y);
        viewport.ctx.restore();
    }
}
//# sourceMappingURL=Hitbox.js.map