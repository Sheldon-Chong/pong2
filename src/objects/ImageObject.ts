import type { Component } from "./Component.js";
import { Vector2D } from "./Coordinates.js";
import { GameObject, exportCleanup } from "./GameObject.js";
import { Sprite } from "./Sprite.js";


export class ImageObject extends GameObject {

	sprite: any;
	scaleFactor: Vector2D = new Vector2D(1, 1);
	params;

	className: string = "imageObject";

	constructor(params: Partial<ImageObject>) {
		super({
		});
		Object.assign(this, params);

		this.components = new Map<number, Component>();

		this.params = params;

		this.onUpdate = () => {
			this.scale = new Vector2D(
				this.sprite.width,
				this.sprite.height,
			).multiply(this.scaleFactor);
		};

		this.sprite = this.addComponent(new Sprite({
			...params.sprite,
			onLoad: () => {
				this.scale = new Vector2D(
					this.sprite.width,
					this.sprite.height
				).multiply(this.scaleFactor);
				console.log("onload called");
			}
		})) as Sprite;
	}
	init() {

	}

	export(exportStatic: boolean = false) {
		console.log("this scale", this.scale);
		return exportCleanup({
			id: this.id,
			className: this.className,
      components: this.componentToJSON(),
			sprite: this.sprite,
			zIndex: this.zIndex,
			position: this.position,
			scaleFactor: this.scaleFactor
			// scale: this.scale
		});
	}
}
