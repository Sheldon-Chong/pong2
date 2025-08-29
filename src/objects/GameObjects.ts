import { Point2D, Vector2D } from './Coordinates.js';
import { type Renderable, Sprite } from './Sprite.js';
import type { PongGame3 } from '../pong3.js';
import { Component } from './Component.js';


const RenderableMarker = Symbol("Renderable");



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

	test;
	
	constructor(params: Partial<GameObject>) {
		Object.assign(this, params);
		this.id = GameObject.globalId;
		GameObject.globalId ++;

		for (const component of this.components) {
			component.parent = this;
			component.init();
		}

		
		this.test = new Sprite({
			imagePath: "assets/arrow.png",
			parent: this
		}).init();
	}

	addComponent(component: Component) {
		this.components.push(component);
		component.parent = this;
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

	getWorldPosition() {
		return this.position;
	}

	draw(ctx: CanvasRenderingContext2D) {
		for (const component of this.components) {
			if (component.name === "sprite") {
				try {
					(component as Sprite).draw(ctx);
					console.log("draw");
				}
				catch (error) {
					console.log(typeof (component as Sprite).image);
					// console.error("Error drawing component:", error);
				}
			}
			// this.test.draw(ctx);
		}
	}
}