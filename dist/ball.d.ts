import { Point2D, Vector2D } from './objects/Coordinates.js';
import { GameObject } from './objects/GameObject.js';
import { Sprite } from './objects/Sprite.js';
import { HitBox } from './objects/Hitbox.js';
import { Padel } from './pong3.js';
export declare class Ball extends GameObject {
    rotationVelocity: number;
    lastPadelHit: Padel | null;
    collided: boolean;
    static MAX_BOUNCE_ANGLE: number;
    hitbox: HitBox;
    sprite: Sprite;
    init(): void;
    calculateAngle(other: Padel): void;
    export(exportStatic?: boolean): {
        name: string;
        id: number;
        position: {
            className: string;
            x: number;
            y: number;
        };
        scale: Vector2D;
        components: any[];
    };
    constructor(params: {
        position: Point2D;
        game: any;
    });
    onHitGoal(team: string): void;
}
//# sourceMappingURL=ball.d.ts.map