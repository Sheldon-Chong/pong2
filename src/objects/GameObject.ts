import { Point2D, Vector2D } from './Coordinates.js';
import { type Renderable, Sprite } from './Sprite.js';
import type { PongGame } from '../game/pong.js';
import type { Viewport } from './Viewport.js'; 
import { Component } from './Component.js';
import { HitBox } from './Hitbox.js';

const RenderableMarker = Symbol("Renderable");

function ownsProperty(obj: object, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function exportCleanup<T extends Record<string, any>>(
	obj: T,
	exportStatic: boolean = false
): T {
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) 
			continue;
    
		if (Array.isArray(value) && value.length === 0) 
			continue;
    
		if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) 
			continue;

		if (key.startsWith("STATIC_")) {
			const keyName = key.slice("STATIC_".length);

			if (exportStatic) {
				result[keyName] = value;
			} 
		}
		else {
			result[key] = value;
		}
  }
  return result;
}

export class GameObject {

	public game: PongGame;


	// identification
	public static globalId = 0;

	public name: string = "";
	public id: number;

	// grouping
	public parent: GameObject | null = null;
	public children: GameObject[] = [];

	// physics
	public position: Point2D = new Point2D(0, 0);
	public rotation: number = 0;
	public scale: Vector2D = new Vector2D(10, 10);
	public velocity: Vector2D = new Vector2D(0, 0);
	public acceleration: Vector2D = new Vector2D(0, 0);
	public maximumVelocity: Vector2D = new Vector2D(1000, 1000);

	// events
	public onUpdate?: () => void;
	public onClientUpdate?: () => void;
	public onClientUpdateId?: string;

	// order
	public zIndex: number = 0;

	public variables: {};

	// --webserver stuff--
	cache: any = {};
	isStatic: boolean = false;

	init() {
	}

	// setOnClientUpdate(id: string) {
	// 	const script = clientScripts[id];
	// 	if (script) {
	// 		this.onClientUpdateId = id;
	// 		this.onClientUpdate = script;
	// 	} 
	// }

	updateToGame() {
	}
	
	public components: Map<number, Component> | Component[] = new Map<number, Component>() ;

	constructor(params: Partial<GameObject>) {
		Object.assign(this, params);
		this.id = GameObject.globalId;
		GameObject.globalId++;

		const map = new Map<number, Component>();
		if (Array.isArray(params.components)) {
			for (const component of params.components) {
				component.host = this;
				component.init();
				map.set(component.id, component);
			}
		}
		this.components = map;
	}

	addComponent(component: Component) {
		// console.log(`component ${component.name} ${component.id} added to ${this.name} ${this.id}`);
		(this.components as Map<number, Component>).set(component.id, component);
		component.host = this;
		component.init();
		return component;
	}

	getComponents(): Component[] {
		return this.components.values().toArray();
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

	clientUpdate() {
		if (this.onClientUpdate)
			this.clientUpdate();
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

	componentToJSON(exportStatic: boolean = false) {
		return this.getComponents().map(component => {
			if (typeof (component as any).toJSON === "function") {
				return (component as any).toJSON(exportStatic);
			}

			const componentJson: Record<string, any> = {};
			for (const key in component) {
				if (key !== "host" && ownsProperty(component, key)) {
					componentJson[key] = (component as any)[key];
				}
			}
			return componentJson;
		});
	}

	draw(viewport: Viewport) {
		// Draw this object's components
		for (const component of this.getComponents()) {
			if (component === null || component.host === null) {
				continue;
			}

			if (component instanceof Sprite) {
				try { (component as Sprite).draw(viewport); }
				catch (error) { 
				}
			}
			else if (component instanceof HitBox) {
				try { (component as HitBox).draw(viewport); }
				catch (error) { console.log("error", typeof component); }
			}
		}

		// Recursively draw children
		for (const child of this.children) {
			try {
				child.draw(viewport);
			}
			catch (error) {
			}
		}
	}

	export(exportStatic: boolean = false): Record<string, any> {
		const json: any = {
			STATIC_name: this.name,
			id: this.id,
			position: this.position.export(),
			STATIC_scale: this.scale,
			STATIC_rotation: this.rotation,
			STATIC_zIndex: this.zIndex,
			STATIC_children: this.children.map(child => child.id),
			STATIC_components: this.componentToJSON(),
			clientUpdate: this.clientUpdate
		};

		return exportCleanup(json, exportStatic);
	}
}