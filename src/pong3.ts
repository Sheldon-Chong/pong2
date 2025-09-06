
import { Point2D, Vector2D, interpolate } from './objects/Coordinates.js'
import { GameObject } from './objects/GameObject.js'
import { Sprite, drawImg } from './objects/Sprite.js';
import { Glow } from './objects/Glow.js';
import { BlendMode } from './objects/Blendmodes.js';
import { Camera } from './objects/Camera.js';
import { Label } from './objects/Label.js';
import { HitBox } from './objects/Hitbox.js';
import { Ball } from './ball.js';
import { Viewport } from './objects/Viewport.js';
import type { ScriptKind } from 'typescript';
import { GameWorld } from './GameWorld.js';

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

export class GameTeam {
	score: number = 0;
	players: Padel[] = [];

	// static leftBoardControls = [["t", "g"], ["r", "f"], ["w", "s"]];
	// static rightBoardControls = [["y", "h"], ["o", "l"], ["ArrowUp", "ArrowDown"]];

	constructor(
		public game: PongGame,
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


export const SKINS: Record<string, string> = {
  "ghost_dark": "assets/skins/ghost_dark.png",
  "ghost_light": "assets/skins/ghost_light.png",
  "ghost_blue": "assets/skins/ghost_blue.png",
  "ghost_green": "assets/skins/ghost_green.png",
  "ghost_purple": "assets/skins/ghost_purple.png",
  "ghost_red": "assets/skins/ghost_red.png",
  "ghost_yellow": "assets/skins/ghost_yellow.png",
  "ghost_42": "assets/skins/ghost_42.png"
};

export class Player {
	name: string = "";
	profileImage: string = "";
	skin: string = "ghost_dark";

	constructor(params: Partial<Player> = {}) {
		Object.assign(this, params);
	}
}


class GameSettings {
	playerAcceleration: number = 4300;
	playerCount: number = 2;
	ballSpeed: number = 400;
	
	arrowDownKey: string = "ArrowDown";
	arrowUpKey: string = "ArrowUp";
}



export class Padel extends GameObject {

	public team: string;
	public player: Player;
	public moveDownKey: string = "ArrowDown";
	public moveUpKey: string = "ArrowUp";

	isMoving: boolean = false;

	sprite: Sprite;


	constructor(params: Partial<Padel>) {
		super({
			position: params.position, 
			game: params.game,
			name: "padel",
			scale: new Vector2D(60,60),
			components: [
				new HitBox({})
			]
		});

		Object.assign(this, params);


		const skinPath = SKINS[params.player?.skin || "ghost_dark"];
		this.sprite = this.addComponent(new Sprite({
			imagePath: skinPath,
			host: this
		})) as Sprite;

		this.addChild(new Label({
			text: this.player.name, 
			position : new Point2D(0, 50), 
			font: "15px Century Gothic", 
			color: "#ffffff"
		}));

		this.maximumVelocity = new Vector2D(
			this.game.gameSettings.playerAcceleration, 
			this.game.gameSettings.playerAcceleration
		).multiply(10);

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

		this.maximumVelocity = new Vector2D(
			this.game.gameSettings.playerAcceleration * 10,
			this.game.gameSettings.playerAcceleration * 10
		);

		this.onUpdate = () => {
			this.velocity.y *= 0.9;
			if (Math.abs(this.velocity.y) < 0.1) this.velocity.y = 0;

			try {
				if (this.game.clientData.keysPressed.has("ArrowUp"))    
					this.acceleration.y = -this.game.gameSettings.playerAcceleration;
				else if (this.game.clientData.keysPressed.has("ArrowDown"))
					this.acceleration.y = this.game.gameSettings.playerAcceleration;
				else
					this.acceleration.y = 0 ;
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



const players: Player[] = [
	new Player({name: "player1asjdklasd", skin: "ghost_light"}),
	new Player({name: "player2", profileImage: "assets/profile2.webp"}),
	new Player({name: "player3"}),
	new Player({name: "player4"}),
	new Player({name: "player5"}),
	new Player({name: "player6"}),
];

export class PongGame {

	clientData;
	team1: GameTeam = new GameTeam(this, Team.TEAM1);
	team2: GameTeam = new GameTeam(this, Team.TEAM2);

	lastFrameTime: number = performance.now();
	fps: number = 0;
	delta: number;

	world: GameWorld = new GameWorld();

	gameSettings: GameSettings = new GameSettings();

	update() {
		const now = performance.now();
		this.delta = (now - this.lastFrameTime) / 1000; // delta in seconds
		this.lastFrameTime = now;
		this.world.update();
	}

	exportState() {
		let state = this.world.exportState();
		state["metadata"] = {
			"delta": this.delta
		}
		return state;
	}

	constructor (clientData) {
		this.clientData = clientData;

		this.world.game = this;

		// -- add background

		this.world.addObject(new GameObject({
			game: this,
			position: new Point2D(0,0),
			name: "background",
			components: [
				new Sprite({
					imagePath: "assets/maps/map1.png",
				})
			],
			scale: new Vector2D(2700, 500),
		}));



		// -- add players --

		const offset = 250;
		const distance = 200;


		const leftBoardControls = [["s", "w"], ["r", "f"], ["t", "g"]];
		const rightBoardControls = [["ArrowUp", "ArrowDown"], ["o", "l"], ["y", "h"]];

		for (let i = 0; i < players.length; i++) {
			if (i % 2 === 0) {
				const padel = new Padel({
					position: new Point2D((i * distance * -1) - offset, 0),
					team: Team.TEAM1,
					player: players[i],
					game: this,
					moveUpKey: leftBoardControls[Math.floor(i / 2)][0],
					moveDownKey: leftBoardControls[Math.floor(i / 2)][1]
				});
				this.team1.players.push(padel);
				this.world.addObject(padel);
			} 
			
			else {
				const padel = new Padel({
					position: new Point2D(((i - 1) * distance) + offset, 0),
					team: Team.TEAM2,
					player: players[i],
					game: this,
					moveUpKey: rightBoardControls[Math.floor((i - 1) / 2)][0],
					moveDownKey: rightBoardControls[Math.floor((i - 1) / 2)][1]
				});
				this.team2.players.push(padel);
				this.world.addObject(padel);
			}
		}

		// -- add ball --

		let ball = this.world.addObject(new Ball({
			game: this,
			position: new Point2D(0, 0)
		}));

		this.world.camera = this.world.addObject(new Camera({
			position: new Point2D(0,-100),
			game: this,
			target: ball,
		})) as Camera;

		this.world.viewport.camera = this.world.camera;
	}
}

		// todo !!! desync issue


		// idea: have a handshake system SPECIFICALLY for creating objects,
		
		// idea STATIC OBJECTS
		// however, object properties are streamed

		// for (const obj of this.exportBackLog) {
		// 	console.log("lol");
		// 	flatObjects.push({
		// 		name: "test",
		// 		id: obj.id,
		// 		position: obj.position,
		// 		scale: obj.scale,
		// 		rotation: obj.rotation,
		// 		components: obj.componentToJSON(),
		// 		children: [],
		// 	});
		// }
