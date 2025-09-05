import type { Camera } from "./Camera.js";
import { Vector2D, Point2D } from "./Coordinates.js";

export class Viewport {
	
	ctx: CanvasRenderingContext2D
	
	width: number;
	height: number;
	camera: Camera = null;

	constructor(params: Partial<Viewport>) {
		Object.assign(this, params);
	}

	toScreenCoords(position: Point2D, camera:Camera = null): Point2D {
		const canvasCenter = new Vector2D(this.width / 2, this.height / 2);
		if (this.camera !== null) {
			return position.add(canvasCenter).subtract(this.camera.position);
		}
		return position.add(canvasCenter);
	}
}

