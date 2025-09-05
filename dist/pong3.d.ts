import { Point2D } from './objects/Coordinates.js';
import { GameObject } from './objects/GameObject.js';
import { Sprite } from './objects/Sprite.js';
import { Camera } from './objects/Camera.js';
import { Viewport } from './objects/Viewport.js';
export declare enum Team {
    TEAM1 = "team1",
    TEAM2 = "team2"
}
declare class GameTeam {
    game: PongGame;
    name: String;
    score: number;
    players: Padel[];
    constructor(game: PongGame, name: String);
}
export declare class Player {
    name: string;
    profileImage: string;
    skin: Sprite | null;
    constructor(params?: Partial<Player>);
}
declare class GameSettings {
    playerAcceleration: number;
    playerCount: number;
    ballSpeed: number;
    arrowDownKey: string;
    arrowUpKey: string;
}
export declare class Padel extends GameObject {
    team: string;
    player: Player;
    moveDownKey: string;
    moveUpKey: string;
    isMoving: boolean;
    sprite: Sprite;
    constructor(params: Partial<Padel>);
}
export declare class PongGame {
    clientData: any;
    gameObjects: Map<number, GameObject>;
    team1: GameTeam;
    team2: GameTeam;
    camera: Camera;
    lastFrameTime: number;
    fps: number;
    delta: number;
    viewport: Viewport;
    gameSettings: GameSettings;
    checkCollisions(): void;
    update(): void;
    exportBackLog: GameObject[];
    exportState(): {
        camera: {
            position: Point2D;
        };
        gameObjects: any[];
    };
    addObject(object: GameObject): GameObject;
    constructor(clientData: any);
}
export {};
//# sourceMappingURL=pong3.d.ts.map