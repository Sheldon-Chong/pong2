import { Point2D, Vector2D } from '../Coordinates.js';
import type { PongGame3 } from '../pong3.js';

export class GameObject {
    public position: Point2D;
    public game: PongGame3;
    public parent: GameObject | null = null;
    public name: string = "";
    public velocity: Vector2D = new Vector2D(0, 0);
    public acceleration: Vector2D = new Vector2D(0, 0);
    public maximumVelocity: Vector2D = new Vector2D(1000, 1000);
    public size: Vector2D = new Vector2D(0, 0);
    public children: GameObject[] = [];

    // public sprite?: Sprite;
    // public hitbox?: HitBox | null;
    public onCollide?: (other: GameObject) => void;
    public onUpdate?: () => void;

    constructor(params: Partial<GameObject>) {
        Object.assign(this, params);
    }

    addChild(object: GameObject) {
        this.children.push(object);
        object.parent = this;
    }

    update() {
        this.onUpdate();
    }

}