
import { Point2D, Vector2D, interpolate } from './objects/Coordinates.js'
import { GameObject } from './objects/GameObjects.js'
import { Sprite, drawImg } from './objects/Sprite.js';
import { Glow } from './objects/Glow.js';
import { BlendMode } from './objects/Blendmodes.js';
import { Camera } from './objects/Camera.js';
import { Label } from './objects/Label.js';

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

	// static leftBoardControls = [["t", "g"], ["r", "f"], ["w", "s"]];
	// static rightBoardControls = [["y", "h"], ["o", "l"], ["ArrowUp", "ArrowDown"]];

	constructor(
		public game: PongGame3,
		public name: String,
	) {

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




export class Player {
	name: string = "";
	profileImage: string = "";
	skin: Sprite | null = null;

	constructor(params: Partial<Player> = {}) {
		Object.assign(this, params);
	}
}


class GameSettings {
	playerAcceleration: number = 1;
	playerCount: number = 2;
	ballSpeed: number = 10;
}

import { HitBox } from './objects/Hitbox.js';


export class Padel extends GameObject {

	public team: string;
	public player: Player;
	public moveDownKey: string = "ArrowDown";
	public moveUpKey: string = "ArrowUp";

	isMoving: boolean = false;

	sprite: Sprite = this.addComponent(new Sprite({
		imagePath: "assets/skins/ghost_light.png",
		parent: this
	})) as Sprite;

	constructor(params: Partial<Padel>) {
		super({
			position: params.position, 
			game: params.game,
			name: "padel"
		});

		Object.assign(this, params);

		this.addChild(new Label({
			text: this.player.name, 
			position : new Point2D(0, 50), 
			font: "15px Century Gothic", 
			color: "#ffffff"
		}));

		this.addChild(new HitBox({
			parent: this
		}))


		this.maximumVelocity = new Vector2D(
			this.game.gameSettings.playerAcceleration, 
			this.game.gameSettings.playerAcceleration
		).multiply(10);

		this.sprite = this.player.skin ? this.player.skin : this.sprite; 

		// add shadow
		this.sprite.glow = new Glow({
			Color: "#3731FE", 
			Blur: 10,
			OffsetX: 0, 
			OffsetY: 5, 
			blendMode: BlendMode.Multiply
		});
		// this.hitbox = new HitBox(this);

		if (this.team === Team.TEAM1) 
			this.sprite.flippedHorizontal = true;

		this.onUpdate = () => {
			this.velocity.y *= 0.9;
			if (Math.abs(this.velocity.y) < 0.1) this.velocity.y = 0;

			try {
				if (this.game.clientData.keysPressed.has("ArrowUp"))    
					this.position.y -= 5;
				if (this.game.clientData.keysPressed.has("ArrowDown"))
					this.position.y += 5;
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
		}
		// this.addChild(new Arrow(this.game));

		// const eyeOffset = this.team === Team.TEAM1 ? 3 : -3;
		// const irisOffset = this.team === Team.TEAM1 ? 8 : -8;

		// this.addChild(new TrailSprite(this.game, this, new Sprite({
		//     imagePath: "./assets/skins/components/eyes.png",
		//     size: new Vector2D(38, 24),
		//     pos: new Point2D(eyeOffset, -3)
		// }), 160));

		// this.addChild(new TrailSprite(this.game, this, new Sprite({
		//     imagePath: "./assets/skins/components/iris.png",
		//     size: new Vector2D(30, 12),
		//     pos: new Point2D(irisOffset, -3)
		// }), 250));
	}
}


/*
IDEA!!!!!!

use interface for renderables, all of which must provide:
- draw method
- position
- rotation
- scale
- renderable type

need to specify renderable type because
client needs to know which object constructor to call
e.g. cleintSprite, lable, sprite etc.



*/









export class PongGame3 {

	clientData;
	gameObjects: GameObject[] = [];
	team1: GameTeam = new GameTeam(this, Team.TEAM1);
	team2: GameTeam = new GameTeam(this, Team.TEAM2);
	camera: Camera = this.addObject(new Camera({
		position: new Point2D(0,-100)
	})) as Camera;

	lastFrameTime: number = performance.now();
	fps: number = 0;
	delta: number;

	gameSettings: GameSettings = new GameSettings();

	update () {
		for (const object of this.gameObjects) 
			object.update();
	}

	exportState() {
		const visited = new Set();
		const flatObjects: any[] = [];

		function flatten(obj) {
			if (!obj || visited.has(obj.id)) return;
			visited.add(obj.id);

			// Serialize the object
			flatObjects.push({
				name: obj.name,
				id: obj.id,
				position: obj.position,
				components: obj.components,
				children: obj.children?.map(child => child.id),
			});

			// Recursively flatten children
			if (obj.children && obj.children.length > 0) {
				for (const child of obj.children) {
					flatten(child);
				}
			}
		}

		for (const obj of this.gameObjects) {
			flatten(obj);
		}

		return { gameObjects: flatObjects };
	}

	//need to de-ne

	addObject(object: GameObject) {
		object.game = this;
		this.gameObjects.push(object);
		if (object.children && object.children.length > 0) {
			for (const child of object.children) {
				this.addObject(child);
				child.game = this;
			}
		}
		
		return object;
	}

	constructor (clientData) {
		this.clientData = clientData;

		// this.gameObjects.push(new GameObject({
		//     position: new Point2D(54,54),
		//     sprite: new Sprite({
		//         imagePath: "assets/arrow.png",
		//         size: new Vector2D(50, 50)
		//     }),
		//     onUpdate: function () {
		//         this.position.x += 0.3;
		//     }
		// }));
		this.addObject(new Padel({
			game: this,
			position: new Point2D(50, 50),
			team: "test",
			player: new Player({name: "sheldz"})
		}));
		// this.gameObjects.push(new GameObject({
		//     position: new Point2D(300,300),
		//     game: this,
		//     sprite: new Sprite({
		//         imagePath: "assets/arrow.png",
		//         size: new Vector2D(50, 50)
		//     }),
		//     onUpdate: function () {
		//         console.log("client", JSON.stringify(this.game.clientData));
		//         try {
		//             if (this.game.clientData.keysPressed.has("ArrowUp"))    
		//                 this.position.y -= 5;
		//             if (this.game.clientData.keysPressed.has("ArrowDown"))
		//                 this.position.y += 5;
		//         }
		//         catch {

		//         }
		//     }
		// }));
	}

}
