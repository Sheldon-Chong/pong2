import { Point2D } from '../Coordinates.js';
import { PongGame, Padel } from '../pong.js';
import { GameObject } from '../Index.js';
export declare class Ball extends GameObject {
    game: PongGame;
    rotationAcceleration: number;
    rotationVelocity: number;
    lastPadelHit: Padel;
    collided: boolean;
    static MAX_BOUNCE_ANGLE: number;
    onGoal: boolean;
    onHitGoal(team: string): void;
    calculateAngle(other: Padel): void;
    constructor(startingPosition: Point2D, game: PongGame);
}
//# sourceMappingURL=Ball.d.ts.map