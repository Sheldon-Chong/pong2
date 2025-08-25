import { Point2D, Vector2D } from '../Coordinates.js';
import type { PongGame } from '../pong.js';
import { Sprite } from './Sprite';
import { HitBox } from './HitBox';
export declare class GameObject {
    position: Point2D;
    game: PongGame;
    parent: GameObject | null;
    name: string;
    velocity: Vector2D;
    acceleration: Vector2D;
    maximumVelocity: Vector2D;
    size: Vector2D;
    sprite?: Sprite | undefined;
    hitbox?: (HitBox | null) | undefined;
    protected ctx: CanvasRenderingContext2D;
    onCollide?: ((other: GameObject) => boolean) | undefined;
    onUpdate?: (() => boolean) | undefined;
    collisions: GameObject[];
    children: GameObject[];
    constructor(position: Point2D, game: PongGame, parent?: GameObject | null, name?: string, velocity?: Vector2D, acceleration?: Vector2D, maximumVelocity?: Vector2D, size?: Vector2D, sprite?: Sprite | undefined, hitbox?: (HitBox | null) | undefined, ctx?: CanvasRenderingContext2D, onCollide?: ((other: GameObject) => boolean) | undefined, onUpdate?: (() => boolean) | undefined);
    addChild(object: GameObject): void;
    Draw(): void;
    previewHitbox(): void;
    getWorldPosition(): Point2D;
    update(delta: any): void;
}
//# sourceMappingURL=GameObject.d.ts.map