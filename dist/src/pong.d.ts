import { Point2D, Vector2D } from './Coordinates.js';
import { GameObject, Sprite, Particle, Timer } from './Index.js';
import { Label, Ball, Camera, Image, Player } from './Index.js';
declare class GameSettings {
    playerAcceleration: number;
    playerCount: number;
    maxPlayerCount: number;
    ballSpeed: number;
}
export declare enum Team {
    TEAM1 = "team1",
    TEAM2 = "team2"
}
declare class GameTeam {
    game: PongGame;
    name: String;
    score: number;
    players: Padel[];
    scoreUI: Label;
    static leftBoardControls: string[][];
    static rightBoardControls: string[][];
    constructor(game: PongGame, name: String);
}
export declare class Padel extends GameObject {
    position: Point2D;
    game: PongGame;
    team: string;
    player: Player;
    moveDownKey: string;
    moveUpKey: string;
    isMoving: boolean;
    sprite: Sprite;
    constructor(position: Point2D, game: PongGame, team: string, player: Player, moveDownKey?: string, moveUpKey?: string);
}
declare class ParticleLayer extends GameObject {
    particles: Particle[];
    constructor(game: PongGame);
}
export declare class PongGame {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    canvasSize: Vector2D;
    sprites: Sprite[];
    lastFrameTime: number;
    fps: number;
    delta: number;
    particles: ParticleLayer;
    particles2: ParticleLayer;
    timers: Timer[];
    gameObjects: GameObject[];
    filter: Image[];
    team1: GameTeam;
    team2: GameTeam;
    ball: Ball;
    camera: Camera;
    gameSettings: GameSettings;
    renderFrame(): void;
    updateDeltaTime(): void;
    loop: () => void;
    addObject(object: GameObject): GameObject;
    skins: Sprite[];
    skinNames: string[];
    constructor(canvas: HTMLCanvasElement);
    newTimer(durationSeconds: number, callback: () => void): void;
}
export {};
//# sourceMappingURL=pong.d.ts.map