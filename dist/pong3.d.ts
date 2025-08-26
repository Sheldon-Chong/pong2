import { Point2D } from './Coordinates.js';
import { GameObject } from './objects2/object.js';
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
    update(): void;
    exportState(): {
        gameObjects: {
            position: Point2D;
        }[];
    };
    addObject(object: GameObject): GameObject;
    constructor();
}
export {};
//# sourceMappingURL=pong3.d.ts.map