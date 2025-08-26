import { Point2D, Vector2D } from './Coordinates.js';
import { Sprite } from './Sprite.js';
import type { PongGame3 } from '../pong3.js';

export class GameObject {
    public game: PongGame3;
    
    // identification
    public name: string = "";
    
    // hierarchy
    public parent: GameObject | null = null;
    public children: GameObject[] = [];
    
    // physics
    public position: Point2D;
    public velocity: Vector2D = new Vector2D(0, 0);
    public acceleration: Vector2D = new Vector2D(0, 0);
    public maximumVelocity: Vector2D = new Vector2D(1000, 1000);

    public sprite?: Sprite;
    // public hitbox?: HitBox | null;

    // events
    public onCollide?: (other: GameObject) => void;
    public onUpdate?: () => void;

    constructor(params: Partial<GameObject>) {
        Object.assign(this, params);
    }

    addChild(object: GameObject) {
        this.children.push(object);
        object.parent = this;
    }

    update() { this.onUpdate(); }

}