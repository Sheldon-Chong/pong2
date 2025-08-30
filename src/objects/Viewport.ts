import { Vector2D, Point2D } from "./Coordinates.js";

export class Viewport {
	
	ctx: CanvasRenderingContext2D
	
	width: number;
	height: number;

	constructor(params: Partial<Viewport>) {
		Object.assign(this, params);
	}

	toScreenCoords(position: Point2D): Point2D {
		const canvasCenter = new Vector2D(this.width / 2, this.height / 2);
		return position.add(canvasCenter);
	}
}

