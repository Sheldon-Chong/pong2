import { Point2D, Vector2D } from '../Coordinates.js';
import type { PongGame } from '../pong.js';
import { Sprite } from './Sprite.js';
import { HitBox } from './HitBox.js';
export declare class GameObject {
    position: Point2D;
    game: PongGame;
    parent: GameObject | null;
    name: string;
    velocity: Vector2D;
    acceleration: Vector2D;
    maximumVelocity: Vector2D;
    size: Vector2D;
    sprite?: Sprite;
    hitbox?: HitBox | null;
    protected ctx: CanvasRenderingContext2D;
    onCollide?: (other: GameObject) => boolean;
    onUpdate?: () => boolean;
    collisions: GameObject[];
    children: GameObject[];
    constructor(position: Point2D, game: PongGame, parent?: GameObject | null, name?: string, velocity?: Vector2D, acceleration?: Vector2D, maximumVelocity?: Vector2D, size?: Vector2D, sprite?: Sprite, hitbox?: HitBox | null, ctx?: CanvasRenderingContext2D, onCollide?: (other: GameObject) => boolean, onUpdate?: () => boolean);
    addChild(object: GameObject): void;
    Draw(): void;
    previewHitbox(): void;
    getWorldPosition(): Point2D;
    update(delta: any): void;
}
//# sourceMappingURL=GameObject.d.ts.map