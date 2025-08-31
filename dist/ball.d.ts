import { Point2D } from './objects/Coordinates.js';
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
    calculateAngle(other: Padel): void;
    constructor(params: {
        position: Point2D;
        game: any;
    });
}
//# sourceMappingURL=ball.d.ts.map