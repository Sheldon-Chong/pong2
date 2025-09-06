import { Point2D } from './objects/Coordinates.js';
import { GameObject } from './objects/GameObject.js';
import { Sprite } from './objects/Sprite.js';
import { GameWorld } from './GameWorld.js';
export declare enum Team {
    TEAM1 = "team1",
    TEAM2 = "team2"
}
export declare class GameTeam {
    game: PongGame;
    name: String;
    score: number;
    players: Padel[];
    constructor(game: PongGame, name: String);
}
export declare const SKINS: Record<string, string>;
export declare class Player {
    name: string;
    profileImage: string;
    skin: string;
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
    team1: GameTeam;
    team2: GameTeam;
    lastFrameTime: number;
    fps: number;
    delta: number;
    world: GameWorld;
    gameSettings: GameSettings;
    update(): void;
    exportState(): {
        camera: {
            position: Point2D;
        };
        gameObjects: any[];
    };
    constructor(clientData: any);
}
export {};
//# sourceMappingURL=pong3.d.ts.map