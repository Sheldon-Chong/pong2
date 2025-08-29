import { Point2D, Vector2D } from './Coordinates.js';
import { GameObject } from './GameObjects.js';
import { Sprite, Outline } from './Sprite.js';

export class HitBox extends GameObject {

	constructor(params: Partial<HitBox>) {
		super(params);
		this.name = "hitbox";
		this.scale = new Vector2D(1, 1);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;

		const center = this.getWorldPosition();
		const scale = this.getWorldScale();
		const halfScaleX = scale.x / 2;
		const halfScaleY = scale.y / 2;

		// Draw hitbox rectangle
		ctx.strokeRect(
			center.x - halfScaleX,
			center.y - halfScaleY,
			scale.x,
			scale.y
		);

		// Draw circles at each corner
		const radius = 3;
		const corners = [
			{ x: center.x - halfScaleX, y: center.y - halfScaleY }, // top-left
			{ x: center.x + halfScaleX, y: center.y - halfScaleY }, // top-right
			{ x: center.x - halfScaleX, y: center.y + halfScaleY }, // bottom-left
			{ x: center.x + halfScaleX, y: center.y + halfScaleY }, // bottom-right
		];

		ctx.fillStyle = 'red';
		for (const corner of corners) {
			ctx.beginPath();
			ctx.arc(corner.x, corner.y, radius, 0, Math.PI * 2);
			ctx.fill();
		}

		ctx.restore();
	}

}
