import { GameObject } from './objects/GameObjects.js';
import { Sprite } from './objects/Sprite.js';
import { Camera } from './objects/Camera.js';
export declare enum Team {
    TEAM1 = "team1",
    TEAM2 = "team2"
}
declare class GameTeam {
    game: PongGame3;
    name: String;
    score: number;
    constructor(game: PongGame3, name: String);
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
export declare class PongGame3 {
    clientData: any;
    gameObjects: GameObject[];
    team1: GameTeam;
    team2: GameTeam;
    camera: Camera;
    lastFrameTime: number;
    fps: number;
    delta: number;
    gameSettings: GameSettings;
    update(): void;
    exportState(): {
        gameObjects: any[];
    };
    addObject(object: GameObject): GameObject;
    constructor(clientData: any);
}
export {};
//# sourceMappingURL=pong3.d.ts.map