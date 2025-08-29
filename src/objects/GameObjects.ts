import { Point2D, Vector2D } from './Coordinates.js';
import { type Renderable, Sprite } from './Sprite.js';
import type { PongGame3 } from '../pong3.js';
import { Component } from './Component.js';


const RenderableMarker = Symbol("Renderable");

// function genericUpdate(obj: any, params: any, cache: any) {
// 		for (const key in params) {
// 				if (cache[key] !== params[key]) {
// 						if (key === "position" && params.position) 
// 								obj.position = new Point2D(params.position.x, params.position.y);
// 						else if (key === "size" && params.size) 
// 								obj.size = new Vector2D(params.size.x, params.size.y);
// 						else 
// 								obj[key] = params[key];
// 						cache[key] = params[key];
// 				}
// 		}
// }



export class GameObject {

	public game: PongGame3;
	public id: number;
	static globalId = 0;
	
	// identification
	public name: string = "";
	
	// hierarchy
	public parent: GameObject | null = null;
	public children: GameObject[] = [];
	
	// physics
	public position: Point2D = new Point2D(0,0);
	public rotation: number = 0;
	public scale: Vector2D = new Vector2D(10, 10);
	public velocity: Vector2D = new Vector2D(0, 0);
	public acceleration: Vector2D = new Vector2D(0, 0);
	public maximumVelocity: Vector2D = new Vector2D(1000, 1000);

	public components: Component[] = []

	// public sprite?: Sprite;
	// public hitbox?: HitBox | null;

	// events
	// public onCollide?: (other: GameObject) => void;
	public onUpdate?: () => void;
	cache: any = {};

	test;
	
	// updateFrom(params: any) {
	// 		genericUpdate(this, params, this.cache);
	// 		// Optionally, update components as well:
	// 		if (params.components && Array.isArray(params.components)) {
	// 				for (let i = 0; i < params.components.length; i++) {
	// 						if (this.components[i] && typeof this.components[i].updateFrom === "function") {
	// 								this.components[i].updateFrom(params.components[i]);
	// 						}
	// 				}
	// 		}
	// }

	constructor(params: Partial<GameObject>) {
		Object.assign(this, params);
		this.id = GameObject.globalId;
		GameObject.globalId ++;

		for (const component of this.components) {
			component.host = this;
			component.init();
		}

		
		this.test = new Sprite({
			imagePath: "assets/arrow.png",
			host: this
		}).init();
	}

	addComponent(component: Component) {
		this.components.push(component);
		component.host = this;
		component.init();
		return component;
	}

	addChild(object: GameObject) {
		this.children.push(object);
		object.parent = this;
		object.game = this.game;
	}

	update() {
		if (this.onUpdate) 
			this.onUpdate(); 
	}

	getWorldPosition(): Point2D {
		if (!this.parent) {
			return new Point2D(
				this.position.x,
				this.position.y
			)
		}
		const parentPos = this.parent.getWorldPosition();
		return new Point2D(
			parentPos.x + this.position.x,
			parentPos.y + this.position.y
		);
	}

	getWorldScale(): Vector2D {
		if (!this.parent) {
			return new Vector2D(
				this.scale.x,
				this.scale.y
			);
		}
		const parentScale = this.parent.getWorldScale();
		return new Vector2D(
			parentScale.x * this.scale.x,
			parentScale.y * this.scale.y
		);
	}

	draw(ctx: CanvasRenderingContext2D) {
		// Draw this object's components
		for (const component of this.components) {
			if (component.name === "sprite") {
				try {
					(component as Sprite).draw(ctx);
				}
				catch (error) {
					console.log(typeof (component as Sprite).image);
				}
			}
		}
		// Recursively draw children
		for (const child of this.children) {
			// console.log(JSON.stringify(this.children));
			try {
				child.draw(ctx);
				// console.log("child drawn", typeof child);
			}
			catch (error) {
				// console.log("error", error);
			}
		}
	}
}