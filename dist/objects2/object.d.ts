import { Point2D, Vector2D } from '../Coordinates.js';
import type { PongGame3 } from '../pong3.js';
export declare class GameObject {
    position: Point2D;
    game: PongGame3;
    parent: GameObject | null;
    name: string;
    velocity: Vector2D;
    acceleration: Vector2D;
    maximumVelocity: Vector2D;
    size: Vector2D;
    children: GameObject[];
    onCollide?: (other: GameObject) => void;
    onUpdate?: () => void;
    constructor(params: Partial<GameObject>);
    addChild(object: GameObject): void;
    update(): void;
}
//# sourceMappingURL=object.d.ts.map