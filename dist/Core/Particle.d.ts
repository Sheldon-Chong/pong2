import { Point2D } from '../Coordinates.js';
import type { PongGame } from '../pong.js';
import { Sprite } from './Sprite';
export declare class Particle {
    game: PongGame;
    lifespanMs: number;
    sprite: Sprite;
    position: Point2D;
    onUpdate: (instance: Particle) => void;
    direction: number;
    speed: number;
    createdAt: number;
    constructor(game: PongGame, lifespanMs: number, sprite: Sprite, position: Point2D, onUpdate: (instance: Particle) => void, direction?: number, speed?: number);
    draw(): void;
    update(): void;
    isAlive(): boolean;
}
//# sourceMappingURL=Particle.d.ts.map