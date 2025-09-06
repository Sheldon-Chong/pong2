import { Point2D, Vector2D } from './Coordinates.js';
import { type Renderable, Sprite } from './Sprite.js';
import type { PongGame } from '../pong3.js';
import type { Viewport } from './Viewport.js'; import { Component } from './Component.js';
import type { HitBox } from './Hitbox.js';


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

	public game: PongGame;
	public id: number;
	static globalId = 0;

	// identification
	public name: string = "";

	// hierarchy
	public parent: GameObject | null = null;
	public children: GameObject[] = [];

	// physics
	public position: Point2D = new Point2D(0, 0);
	public rotation: number = 0;
	public scale: Vector2D = new Vector2D(10, 10);
	public velocity: Vector2D = new Vector2D(0, 0);
	public acceleration: Vector2D = new Vector2D(0, 0);
	public maximumVelocity: Vector2D = new Vector2D(1000, 1000);

	public components: Component[] = []

	public toUpdate: boolean = false;

	// public sprite?: Sprite;
	// public hitbox?: HitBox | null;

	// events
	// public onCollide?: (other: GameObject) => void;
	public onUpdate?: () => void;
	cache: any = {};

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

	init() {
	}

	updateToGame() {
		this.game.exportBackLog.push(this);
	}

	constructor(params: Partial<GameObject>) {
		Object.assign(this, params);
		this.id = GameObject.globalId;
		GameObject.globalId++;

		for (const component of this.components) {
			component.host = this;
			component.init();
		}
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
		this.velocity = this.velocity.add(this.acceleration.multiply(this.game.delta))

		if (this.maximumVelocity) {
			this.velocity.x = Math.max(
				-Math.abs(this.maximumVelocity.x),
				Math.min(this.velocity.x, Math.abs(this.maximumVelocity.x))
			);
			this.velocity.y = Math.max(
				-Math.abs(this.maximumVelocity.y),
				Math.min(this.velocity.y, Math.abs(this.maximumVelocity.y))
			);
		}

		this.position = this.position.add(this.velocity.multiply(this.game.delta))

		if (this.onUpdate)
			this.onUpdate();
		for (const child of this.children) {
			child.update();
		}
	}

	getWorldPosition(added:Vector2D = new Vector2D(0,0)): Point2D {
		if (!this.parent) {
			return new Point2D(
				this.position.x,
				this.position.y
			).add(added);
		}
		const parentPos = this.parent.getWorldPosition(new Vector2D(0,0));
		return new Point2D(
			parentPos.x + this.position.x,
			parentPos.y + this.position.y
		).add(added);
	}

	getWorldScale(): Vector2D {
		if (!this.parent) {
			return new Vector2D(
				this.scale.x,
				this.scale.y
			);
		}
		const parentScale = this.parent.getWorldScale();
		return parentScale.multiply(this.scale);
	}

	componentToJSON() {
		return this.components.map(component => {
			const json: Record<string, any> = {};
			for (const key in component) {
				if (key !== "host" && Object.prototype.hasOwnProperty.call(component, key)) {
					json[key] = (component as any)[key];
				}
			}
			return json;
		});
	}

	draw(viewport: Viewport) {
		// Draw this object's components
		for (const component of this.components) {
			if (component.name === "sprite") {
				try { (component as Sprite).draw(viewport,); } //todo!!! ISSUE HERE. Cannot simply pass a camera instance. This is the frontend we're talkin about
				catch (error) { console.log("CAMERA", error); }
			}
			if (component.name === "hitbox") {
				try { (component as HitBox).draw(viewport); }
				catch (error) { console.log("error", typeof component); }
			}
		}
		// Recursively draw children
		for (const child of this.children) {
			// console.log(JSON.stringify(this.children));
			try {
				child.draw(viewport);
				// console.log("child drawn", typeof child);
			}
			catch (error) {
				// console.log("error", error);
			}
		}
	}

	export (): any {
		return {
			name: this.name,
			id: this.id,
			position: this.position,
			scale: this.scale,
			rotation: this.rotation,
			components: this.componentToJSON(),
			children: this.children?.map(child => child.id),
			// className: "className" in this ? (this as any).className : undefined
		}
	}
}