import { Point2D, Vector2D } from './Coordinates.js';
import { Sprite } from './Sprite.js';
import type { PongGame3 } from '../pong3.js';
export declare class GameObject {
    game: PongGame3;
    id: number;
    static globalId: number;
    name: string;
    parent: GameObject | null;
    children: GameObject[];
    position: Point2D;
    velocity: Vector2D;
    acceleration: Vector2D;
    maximumVelocity: Vector2D;
    sprite?: Sprite;
    onCollide?: (other: GameObject) => void;
    onUpdate?: () => void;
    constructor(params: Partial<GameObject>);
    addChild(object: GameObject): void;
    update(): void;
    getWorldPosition(): Point2D;
}
//# sourceMappingURL=GameObjects.d.ts.map