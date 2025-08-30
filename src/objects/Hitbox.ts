import { Vector2D } from './Coordinates.js';
import { Component } from './Component.js';
import type { Viewport } from './Viewport.js';
import type { GameObject } from './GameObjects.js';

export class HitBox extends Component {
    isColliding: boolean = false;

    constructor(params: Partial<HitBox> = {}) {
        super(params);
        this.name = "hitbox";
        Object.assign(this, params);
    }

    init(): HitBox {
        this.onUpdate = () => {
            // this.scale = this.scale.add(new Vector2D(0.03, 0.03));
        };
        return this;
    }

    draw(viewport: Viewport) {
		
        if (!this.host) return;

        viewport.ctx.save();
        viewport.ctx.strokeStyle = this.isColliding ? 'green' : 'red';
        viewport.ctx.lineWidth = 2;

        const center = viewport.toScreenCoords(this.host.getWorldPosition());
        const scale = this.host.scale;
        const halfScaleX = scale.x / 2;
        const halfScaleY = scale.y / 2;

        viewport.ctx.strokeRect(
            center.x - halfScaleX,
            center.y - halfScaleY,
            scale.x,
            scale.y
        );
		console.log("hitbox drawn at ", scale.x);

        viewport.ctx.restore();
    }
}