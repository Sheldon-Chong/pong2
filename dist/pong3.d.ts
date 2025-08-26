import { Point2D } from './objects/Coordinates.js';
import { GameObject } from './objects/GameObjects.js';
import { Sprite } from './objects/Sprite.js';
export declare enum Team {
    TEAM1 = "team1",
    TEAM2 = "team2"
}
declare class GameTeam {
    game: PongGame3;
    name: String;
    score: number;
    static leftBoardControls: string[][];
    static rightBoardControls: string[][];
    constructor(game: PongGame3, name: String);
}
export declare class PongGame3 {
    gameObjects: GameObject[];
    team1: GameTeam;
    team2: GameTeam;
    lastFrameTime: number;
    fps: number;
    delta: number;
    update(): void;
    exportState(): {
        gameObjects: {
            position: Point2D;
            Sprite: Sprite;
        }[];
    };
    addObject(object: GameObject): GameObject;
    constructor();
}
export {};
//# sourceMappingURL=pong3.d.ts.map