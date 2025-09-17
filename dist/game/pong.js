import { Point2D, Vector2D, interpolate } from '../objects/Coordinates.js';
import { GameObject, exportCleanup } from '../objects/GameObject.js';
import { Sprite, drawImg } from '../objects/Sprite.js';
import { Glow } from '../objects/Glow.js';
import { BlendMode } from '../objects/Blendmodes.js';
import { Camera } from '../objects/Camera.js';
import { Label } from '../objects/Label.js';
import { HitBox } from '../objects/Hitbox.js';
import { Ball } from './ball.js';
import { GameWorld } from './GameWorld.js';
import { Player } from './Player.js';
import { ImageObject, Interpolate } from '../objects/ImageObject.js';
import { oscillateValue } from '../utils/calculations.js';
import { lastElem, middle } from '../utils/indexing.js';
export var Team;
(function (Team) {
    Team["TEAM1"] = "team1";
    Team["TEAM2"] = "team2";
})(Team || (Team = {}));
export class GameTeam {
    game;
    name;
    score = 0;
    players = [];
    goalPostEnd = 0;
    label;
    // static leftBoardControls = [["t", "g"], ["r", "f"], ["w", "s"]];
    // static rightBoardControls = [["y", "h"], ["o", "l"], ["ArrowUp", "ArrowDown"]];
    constructor(game, name) {
        this.game = game;
        this.name = name;
    }
}
// const keysPressed = {
// }
// class MovementInputs {
//     keysPressed: string[] = [];
//     constructor(input) {
//         if (input && input["key"] === "ArrowUp" && input["type"] === "keydown") {
//         }
//         if (input && input["key"] === "ArrowDown" && input["type"] === "keydown") {
//         }
//     }
// }
export const SKINS = {
    "ghost_dark": "assets/skins/ghost_dark.png",
    "ghost_light": "assets/skins/ghost_light.png",
    "ghost_blue": "assets/skins/ghost_blue.png",
    "ghost_green": "assets/skins/ghost_green.png",
    "ghost_purple": "assets/skins/ghost_purple.png",
    "ghost_red": "assets/skins/ghost_red.png",
    "ghost_yellow": "assets/skins/ghost_yellow.png",
    "ghost_42": "assets/skins/ghost_42.png"
};
class GameSettings {
    playerAcceleration = 4300;
    playerCount = 2;
    ballSpeed = 500;
    arrowDownKey = "ArrowDown";
    arrowUpKey = "ArrowUp";
}
export class Padel extends GameObject {
    team;
    player;
    moveDownKey = "ArrowDown";
    moveUpKey = "ArrowUp";
    isMoving = false;
    sprite;
    teamWins(team) {
    }
    skinPath;
    export(exportStatic = false) {
        const json = {
            STATIC_name: this.name,
            id: this.id,
            position: this.position.export(),
            STATIC_scale: this.scale,
            STATIC_rotation: this.rotation,
            STATIC_zIndex: this.zIndex,
            STATIC_children: this.children.map(child => child.id),
            STATIC_components: this.componentToJSON(),
        };
        return exportCleanup(json, exportStatic);
    }
    constructor(params) {
        super({
            position: params.position,
            game: params.game,
            name: "padel",
            scale: new Vector2D(60, 60),
            components: [
                new HitBox({})
            ]
        });
        Object.assign(this, params);
        this.skinPath = SKINS[params.player?.skin || "ghost_dark"];
    }
    init() {
        this.sprite = this.addComponent(new Sprite({
            imagePath: this.skinPath,
            host: this
        }));
        this.addChild(new PadelLabel({
            text: this.player.name,
            position: new Point2D(0, -40),
            font: "15px Century Gothic",
            color: "#ffffff",
        }));
        this.maximumVelocity = new Vector2D(this.game.gameSettings.playerAcceleration).multiply(10);
        // add shadow	
        this.sprite.glow = new Glow({
            Color: "#6881a8",
            Blur: 10,
            OffsetX: 0,
            OffsetY: 5,
            blendMode: BlendMode.Multiply
        });
        if (this.team === Team.TEAM1)
            this.sprite.flippedHorizontal = true;
        this.maximumVelocity = new Vector2D(this.game.gameSettings.playerAcceleration * 10);
        this.onUpdate = () => {
            this.velocity.y *= 0.9;
            if (Math.abs(this.velocity.y) < 0.1)
                this.velocity.y = 0;
            if (this.position.y < -(this.game.world.viewport.height / 2)) {
                this.position.y = -(this.game.world.viewport.height / 2);
                this.velocity.y = 0;
            }
            if (this.position.y > this.game.world.viewport.height / 2) {
                this.position.y = this.game.world.viewport.height / 2;
                this.velocity.y = 0;
            }
            try {
                for (const client of this.game.clientData) {
                    if (client.keysPressed.has("ArrowUp")) {
                        this.acceleration.y = -this.game.gameSettings.playerAcceleration;
                    }
                    else if (client.keysPressed.has("ArrowDown")) {
                        this.acceleration.y = this.game.gameSettings.playerAcceleration;
                    }
                    else
                        this.acceleration.y = 0;
                }
            }
            catch {
            }
            // let copied = this.sprite.clone();
            // copied.opacity = 0.1;
            // copied.blendMode = BlendMode.ColorDodge;
            // copied.gselow = null;
            // this.game.particles.particles.push(new Particle(this.game, 120, copied, this.position.clone(), (instance) => {
            //     instance.sprite.opacity *= 0.96;
            // }));
            // return true;
        };
        // this.addChild(new Arrow(this.game));
        // const eyeOffset = this.team === Team.TEAM1 ? 3 : -3;
        // const irisOffset = this.team === Team.TEAM1 ? 8 : -8;
        // this.addChild(new TrailSprite(this.game, this, new Sprite({
        //     imagePath: "./assets/skins/components/eyes.png",
        //     size: new Vector2D(38, 24),
        //     pos: new Point2D(eyeOffset, -3)
        // }), 160));
        const scaleFactor = new Vector2D(0.48, 0.48);
        this.addChild(new ImageObject({
            scaleFactor: scaleFactor,
            sprite: new Sprite({
                imagePath: "./assets/skins/components/eyes.png",
            }),
            interpolate: new Interpolate({
                targetOffset: new Vector2D(-5, -5),
                target: this,
                slowness: 2,
            })
        }));
        this.addChild(new ImageObject({
            scaleFactor: scaleFactor,
            sprite: new Sprite({
                imagePath: "./assets/skins/components/iris.png",
            }),
            interpolate: new Interpolate({
                targetOffset: new Vector2D(-9, -5),
                target: this,
                slowness: 3,
            }),
        }));
        // this.addChild(new TrailSprite(this.game, this, new Sprite({
        //     imagePath: "./assets/skins/components/iris.png",
        //     size: new Vector2D(30, 12),
        //     pos: new Point2D(irisOffset, -3)
        // }), 250));
    }
}
class PadelLabel extends Label {
    isClient = false;
    className = "label";
    export(exportStatic = false) {
        return exportCleanup({
            id: this.id,
            STATIC_name: this.name,
            className: this.className,
            STATIC_position: this.position.export(),
            STATIC_scale: this.scale,
            STATIC_rotation: this.rotation,
            STATIC_components: this.componentToJSON(exportStatic),
            STATIC_children: this.children?.map(child => child.id),
            STATIC_text: this.text,
            STATIC_font: this.font,
            STATIC_color: this.color
        }, exportStatic);
    }
}
const paddleOffset = 250;
const paddleDistance = 200;
const goalMargin = 200;
const leftBoardControls = [["s", "w"], ["r", "f"], ["t", "g"]];
const rightBoardControls = [["ArrowUp", "ArrowDown"], ["o", "l"], ["y", "h"]];
const players = [
    new Player({ name: "test", skin: "ghost_light" }),
    new Player({ name: "player2", profileImage: "assets/profile2.webp" }),
    new Player({ name: "player3" }),
    new Player({ name: "player4" }),
    new Player({ name: "player5" }),
    new Player({ name: "player6" }),
];
export class PongGame {
    clientData;
    team1 = new GameTeam(this, Team.TEAM1);
    team2 = new GameTeam(this, Team.TEAM2);
    lastFrameTime = performance.now();
    fps = 0;
    delta = 0;
    world = new GameWorld();
    gameSettings = new GameSettings();
    camera;
    update() {
        const now = performance.now();
        this.delta = (now - this.lastFrameTime) / 1000; // delta in seconds
        this.lastFrameTime = now;
        this.world.update();
    }
    exportState(includeStaticObjects = false) {
        let state = this.world.exportState(includeStaticObjects);
        state["type"] = includeStaticObjects ? "full" : "partial";
        if (!includeStaticObjects) {
            delete state["components"];
        }
        else {
        }
        return state;
    }
    teamWins(team) {
        if (team === Team.TEAM1) {
            this.team1.score++;
            this.team1.label.text = String(this.team1.score);
        }
        else if (team === Team.TEAM2) {
            this.team2.score++;
            this.team2.label.text = String(this.team2.score);
        }
    }
    initPongGame() {
        for (let i = 0; i < players.length; i++) {
            if (i % 2 === 0) {
                const padel = new Padel({
                    position: new Point2D((i * paddleDistance * -1) - paddleOffset, 0),
                    team: Team.TEAM1,
                    player: players[i],
                    zIndex: 10
                });
                this.team1.players.push(padel);
                this.world.addObject(padel);
            }
            else {
                const padel = new Padel({
                    position: new Point2D(((i - 1) * paddleDistance) + paddleOffset, 0),
                    team: Team.TEAM2,
                    player: players[i],
                    zIndex: 10
                });
                this.team2.players.push(padel);
                this.world.addObject(padel);
            }
        }
        this.team1.goalPostEnd = lastElem(this.team1.players).position.x - goalMargin;
        this.team2.goalPostEnd = lastElem(this.team2.players).position.x + goalMargin;
        // -- add ball --
        let ball = this.world.addObject(new Ball({
            game: this,
            position: new Point2D(0, 0)
        }));
        ball.zIndex = 10;
        // -- add camera  --
        this.world.camera = this.world.addObject(new Camera({
            position: new Point2D(0, -100),
            target: ball,
        }));
        this.world.viewport.camera = this.world.camera;
    }
    constructor(clientData) {
        this.clientData = clientData;
        this.world.game = this;
        this.initPongGame();
        const scaleFactor = new Vector2D(0.55, 0.55);
        // -- add background
        // -- floor --
        this.world.addObject(new ImageObject({
            name: "floor",
            isStatic: true,
            zIndex: -15,
            sprite: new Sprite({
                imagePath: "assets/maps/map1/floor3.png",
            }),
            scaleFactor: scaleFactor,
        }));
        // -- shadow --
        this.world.addObject(new ImageObject({
            name: "shadow",
            position: new Point2D(0, -180),
            isStatic: true,
            zIndex: 20,
            sprite: new Sprite({
                imagePath: "assets/maps/map1/shadow.png",
                blendMode: BlendMode.Multiply
            }),
            scaleFactor: scaleFactor
        }));
        // -- crowd --
        for (let i = 0; i < 2; i++) {
            const object = new GameObject({
                position: new Point2D(0, -230),
                variables: {
                    offset: i * 15
                },
                zIndex: -15,
                components: [
                    new Sprite({
                        imagePath: [
                            "assets/maps/map1/crowd.png",
                            "assets/maps/map1/crowd2.png"
                        ][i % 2],
                    })
                ],
                scale: new Vector2D(4200, 118).multiply(0.5),
            });
            object.setOnClientUpdate("moveCrowd");
            this.world.addObject(object);
        }
        // -- add goalposts --
        this.world.addObject(new ImageObject({
            scaleFactor: scaleFactor,
            position: new Point2D(this.team1.goalPostEnd, 0),
            name: "goalpost",
            sprite: new Sprite({
                imagePath: "assets/goalpost.png",
                flippedHorizontal: true
            }),
        }));
        this.world.addObject(new ImageObject({
            scaleFactor: scaleFactor,
            position: new Point2D(this.team2.goalPostEnd, 0),
            name: "goalpost",
            sprite: new Sprite({
                imagePath: "assets/goalpost.png",
                flippedHorizontal: false
            }),
        }));
        const scoreUI = {
            text: "0",
            font: "100px Impact",
            zIndex: -5,
        };
        this.team1.label = this.world.addObject(new Label({
            ...scoreUI, position: new Point2D(middle(this.team1.players).position.x, 0)
        }));
        this.team2.label = this.world.addObject(new Label({
            ...scoreUI, position: new Point2D(middle(this.team2.players).position.x, 0)
        }));
        for (const object of this.world.gameObjects.values()) {
            console.log(object.id + ": " + object.name);
        }
    }
}
//# sourceMappingURL=pong.js.map