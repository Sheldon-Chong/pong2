import { Point2D, Vector2D } from './Coordinates.js';
import { GameObject } from './GameObjects.js';
import { Sprite, Outline } from './Sprite.js';

export class HitBox extends GameObject {

	constructor(params: Partial<HitBox>) {
		super(params);
		this.name = "hitbox";
		this.scale = new Vector2D(120, 130);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;

		const center = this.getWorldPosition();
		const halfScaleX = this.scale.x / 2;
		const halfScaleY = this.scale.y / 2;

		ctx.strokeRect(
			center.x - halfScaleX,
			center.y - halfScaleY,
			this.scale.x,
			this.scale.y
		);
		ctx.restore();
	}


}
