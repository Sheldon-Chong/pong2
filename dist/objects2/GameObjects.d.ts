import { Point2D, Vector2D } from '../objects/Coordinates.js';
import type { PongGame3 } from '../pong3.js';
export declare class GameObject {
    game: PongGame3;
    name: string;
    parent: GameObject | null;
    children: GameObject[];
    position: Point2D;
    velocity: Vector2D;
    acceleration: Vector2D;
    maximumVelocity: Vector2D;
    onCollide?: (other: GameObject) => void;
    onUpdate?: () => void;
    constructor(params: Partial<GameObject>);
    addChild(object: GameObject): void;
    update(): void;
}
//# sourceMappingURL=GameObjects.d.ts.map