
import { Point2D, Vector2D, interpolate } from './Coordinates.js'
import { GameObject } from './objects2/object.js'
// import { GameObject, Sprite, HitBox, Glow, Particle, Timer} from './Index.js'
// import {  BlendMode } from './GameUtils.js'

// class GameSettings {
//     playerAcceleration: number = 4300;
//     playerCount: number = 6;
//     maxPlayerCount: number = 6;
//     ballSpeed: number = 700;
// }

export enum Team {
    TEAM1= "team1",
    TEAM2= "team2"
}

class GameTeam {
    score: number = 0;
    // players: Padel[] = [];

    static leftBoardControls = [["t", "g"], ["r", "f"], ["w", "s"]];
    static rightBoardControls = [["y", "h"], ["o", "l"], ["ArrowUp", "ArrowDown"]];

    constructor(
        public game: PongGame3,
        public name: String,
    ) {

    }
}



// export class Padel extends GameObject {
//     isMoving: boolean = false;
//     sprite: Sprite = new Sprite({imagePath: "assets/skins/ghost_light.png", size: new Vector2D(60, 60)});

//     constructor(
//         public position: Point2D,
//         public game: PongGame2,
//         public team: string,
//         public player: Player,
//         public moveDownKey: string = "ArrowDown",
//         public moveUpKey: string = "ArrowUp"
//     ) {
//         super(position, game);

//         this.addChild(new Label({
//             text: this.player.name, 
//             position : new Point2D(0, -50), 
//             game: game,
//             font: "15px Century Gothic", 
//             color: "#ffffff"}));

//         this.maximumVelocity = new Vector2D(
//             this.game.gameSettings.playerAcceleration * 10, 
//             this.game.gameSettings.playerAcceleration * 10
//         );
//         this.sprite = player.skin ? player.skin : this.sprite; 

//         // add shadow
//         this.sprite.glow = new Glow("#3731FE", 10, 0, 5, BlendMode.Multiply);

            
//         this.hitbox = new HitBox(this);

//         if (this.team === Team.TEAM1) {
//             this.sprite.flippedHorizontal = true;
//         }

//         this.onUpdate = () => {
//             this.velocity.y *= 0.9;
//             if (Math.abs(this.velocity.y) < 0.1) this.velocity.y = 0;
          

//             let copied = this.sprite.clone();
//             copied.opacity = 0.1;
//             copied.blendMode = BlendMode.ColorDodge;
//             copied.glow = null;
//             this.game.particles.particles.push(new Particle(this.game, 120, copied, this.position.clone(), (instance) => {
//                 instance.sprite.opacity *= 0.96;
//             }));

//             return true;
//         }
//         this.addChild(new Arrow(this.game));

//         const eyeOffset = this.team === Team.TEAM1 ? 3 : -3;
//         const irisOffset = this.team === Team.TEAM1 ? 8 : -8;

//         this.addChild(new TrailSprite(this.game, this, new Sprite({
//             imagePath: "./assets/skins/components/eyes.png",
//             size: new Vector2D(38, 24),
//             pos: new Point2D(eyeOffset, -3)
//         }), 160));

//         this.addChild(new TrailSprite(this.game, this, new Sprite({
//             imagePath: "./assets/skins/components/iris.png",
//             size: new Vector2D(30, 12),
//             pos: new Point2D(irisOffset, -3)
//         }), 250));
//     }
// }

// class ParticleLayer extends GameObject {
//     particles: Particle[] = []
    
//     constructor (game: PongGame2) {
//         super(new Point2D(0,0), game);
//     }
// }

// class TrailSprite extends GameObject {
//     truePos: Point2D = new Point2D(0,0);

//     constructor(
//         game: PongGame2, 
//         public target: GameObject, 
//         sprite: Sprite,
//         interpolateVal = 1.6
//     ) {
//         super(new Point2D(0,0), game);

//         this.sprite = sprite;

//         this.onUpdate = () => {
//             this.truePos = interpolate(this.truePos, target.position, interpolateVal * this.game.delta);

//             return true;
//         }
//     }

//     getWorldPosition(): Point2D {
//         return new Point2D(
//             this.truePos.x - this.game.camera.position.x,
//             this.truePos.y - this.game.camera.position.y
//         ).add(this.game.canvasSize.divide(new Vector2D(2,2)));
//     }
// }


export class PongGame3 {

    gameObjects: GameObject[] = [];
    team1: GameTeam = new GameTeam(this, Team.TEAM1);
    team2: GameTeam = new GameTeam(this, Team.TEAM2);
    // camera: Camera = this.addObject(new Camera(new Point2D(0,-100), this)) as Camera;

    update () {
        for (const object of this.gameObjects) {
            object.update();
        }
    }

    exportState() {
        return {
            gameObjects: this.gameObjects.map(obj => ({
                position: obj.position,
            }))
        };
    }

    addObject(object: GameObject) {
        this.gameObjects.push(object);
        if (object.children && object.children.length > 0) {
            for (const child of object.children) {
                this.addObject(child);
            }
        }
        
        return object;
    }

    constructor () {
        this.gameObjects.push(new GameObject({
            position: new Point2D(100,100),
            onUpdate: function () {
                this.position.x += 0.3;
            }
        }));
    }

}
