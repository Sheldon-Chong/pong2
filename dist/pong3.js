import { Point2D, Vector2D, interpolate } from './objects/Coordinates.js';
import { GameObject } from './objects/GameObjects.js';
import { Sprite, drawImg } from './objects/Sprite.js';
// import { GameObject, Sprite, HitBox, Glow, Particle, Timer} from './Index.js'
// import {  BlendMode } from './GameUtils.js'
// class GameSettings {
//     playerAcceleration: number = 4300;
//     playerCount: number = 6;
//     maxPlayerCount: number = 6;
//     ballSpeed: number = 700;
// }
export var Team;
(function (Team) {
    Team["TEAM1"] = "team1";
    Team["TEAM2"] = "team2";
})(Team || (Team = {}));
class GameTeam {
    game;
    name;
    score = 0;
    // players: Padel[] = [];
    // static leftBoardControls = [["t", "g"], ["r", "f"], ["w", "s"]];
    // static rightBoardControls = [["y", "h"], ["o", "l"], ["ArrowUp", "ArrowDown"]];
    constructor(game, name) {
        this.game = game;
        this.name = name;
    }
}
export class PongGame3 {
    gameObjects = [];
    team1 = new GameTeam(this, Team.TEAM1);
    team2 = new GameTeam(this, Team.TEAM2);
    // camera: Camera = this.addObject(new Camera(new Point2D(0,-100), this)) as Camera;
    lastFrameTime = performance.now();
    fps = 0;
    delta;
    update() {
        for (const object of this.gameObjects)
            object.update();
    }
    exportState() {
        return {
            gameObjects: this.gameObjects.map(obj => ({
                position: obj.position,
                Sprite: obj.sprite,
                id: obj.id
            }))
        };
    }
    addObject(object) {
        this.gameObjects.push(object);
        if (object.children && object.children.length > 0) {
            for (const child of object.children)
                this.addObject(child);
        }
        return object;
    }
    constructor() {
        this.gameObjects.push(new GameObject({
            position: new Point2D(54, 54),
            sprite: new Sprite({
                imagePath: "assets/arrow.png",
                size: new Vector2D(50, 50)
            }),
            onUpdate: function () {
                this.position.x += 0.3;
            }
        }));
        this.gameObjects.push(new GameObject({
            position: new Point2D(300, 300),
            sprite: new Sprite({
                imagePath: "assets/arrow.png",
                size: new Vector2D(50, 50)
            }),
            onUpdate: function () {
                this.position.x += 0.3;
            }
        }));
    }
}
//# sourceMappingURL=pong3.js.map