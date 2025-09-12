import { Point2D } from '../objects/Coordinates.js';
import { GameObject } from '../objects/GameObject.js';
import { Sprite } from '../objects/Sprite.js';
import { Camera } from '../objects/Camera.js';
import { GameWorld } from './game/GameWorld.js';
import { Player } from './Player.js';
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
    teamWins(team: Team): void;
    export(exportStatic?: boolean): Record<string, any>;
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
    camera: Camera;
    update(): void;
    exportState(includeStaticObjects?: boolean): {
        camera: {
            position: Point2D;
        };
        gameObjects: any[];
        components: any[];
    };
    constructor(clientData: any);
}
export {};
//# sourceMappingURL=pong.d.ts.map