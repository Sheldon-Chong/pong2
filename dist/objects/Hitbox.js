import { Vector2D } from './Coordinates.js';
import { Component } from './Component.js';
export class HitBox extends Component {
    isColliding = false;
    constructor(params = {}) {
        super(params);
        this.name = "hitbox";
        Object.assign(this, params);
    }
    init() {
        this.onUpdate = () => {
            // this.scale = this.scale.add(new Vector2D(0.03, 0.03));
        };
        return this;
    }
    draw(viewport) {
        if (!this.host)
            return;
        viewport.ctx.save();
        viewport.ctx.strokeStyle = this.isColliding ? 'green' : 'red';
        viewport.ctx.lineWidth = 2;
        const center = viewport.toScreenCoords(this.host.getWorldPosition());
        const scale = this.host.scale;
        const halfScaleX = scale.x / 2;
        const halfScaleY = scale.y / 2;
        viewport.ctx.strokeRect(center.x - halfScaleX, center.y - halfScaleY, scale.x, scale.y);
        console.log("hitbox drawn at ", scale.x);
        viewport.ctx.restore();
    }
}
//# sourceMappingURL=Hitbox.js.map