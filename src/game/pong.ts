
import { Point2D, Vector2D, interpolate } from '../objects/Coordinates.js'
import { GameObject, exportCleanup } from '../objects/GameObject.js'
import { Sprite, drawImg } from '../objects/Sprite.js';
import { Glow } from '../objects/Glow.js';
import { BlendMode } from '../objects/Blendmodes.js';
import { Camera } from '../objects/Camera.js';
import { Label } from '../objects/Label.js';
import { HitBox } from '../objects/Hitbox.js';
import { Ball } from './ball.js';
import { Viewport } from '../objects/Viewport.js';
import { GameWorld } from './GameWorld.js';
import { Player } from './Player.js';

// import { GameObject, Sprite, HitBox, Glow, Particle, Timer} from './Index.js'
// import {  BlendMode } from './GameUtils.js'

// class GameSettings {
//     playerAcceleration: number = 4300;
//     playerCount: number = 6;
//     maxPlayerCount: number = 6;
//     ballSpeed: number = 700;
// }

function lastElem<T>(array: T[]): T {
    return array[array.length - 1];
}


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

class GameSettings {
	playerAcceleration: number = 4300;
	playerCount: number = 2;
	ballSpeed: number = 500;
	
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
	teamWins(team : Team) {

	}

	export(exportStatic: boolean = false): Record<string, any> {
		const json: any = {
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

		this.addChild(new PadelLabel({
			text: this.player.name, 
			position : new Point2D(0, -40), 
			font: "15px Century Gothic", 
			color: "#ffffff",
		}));

		this.maximumVelocity = new Vector2D(
			this.game.gameSettings.playerAcceleration, 
			this.game.gameSettings.playerAcceleration
		).multiply(10);

		// add shadow
		this.sprite.glow = new Glow({
			Color: "#6881a8", 
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
				for (const client of this.game.clientData) {
					if (client.keysPressed.has("ArrowUp"))    
						this.acceleration.y = -this.game.gameSettings.playerAcceleration;
					else if (client.keysPressed.has("ArrowDown"))
						this.acceleration.y = this.game.gameSettings.playerAcceleration;
					else
						this.acceleration.y = 0 ;
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
	new Player({name: "test", skin: "ghost_light"}),
	new Player({name: "player2", profileImage: "assets/profile2.webp"}),
	new Player({name: "player3"}),
	new Player({name: "player4"}),
	new Player({name: "player5"}),
	new Player({name: "player6"}),
];

class PadelLabel extends Label {
	export(exportStatic: boolean = false): any {
		return exportCleanup({
			id: this.id,
			name: this.name,
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

function oscillateValue(
  baseValue: number,
  amplitude: number,
  frequency: number,
	offset: number = 0
): number {
  const t = (performance.now() / 1000) + offset; // seconds
  return baseValue + amplitude * Math.sin(2 * Math.PI * frequency * t);
}

export class PongGame {

	clientData;
	team1: GameTeam = new GameTeam(this, Team.TEAM1);
	team2: GameTeam = new GameTeam(this, Team.TEAM2);

	lastFrameTime: number = performance.now();
	fps: number = 0;
	delta: number = 0;

	world: GameWorld = new GameWorld();

	gameSettings: GameSettings = new GameSettings();
	camera: Camera;

	team1GoalPostEnd: number;
	team2GoalPostEnd: number;

	update() {
		const now = performance.now();
		this.delta = (now - this.lastFrameTime) / 1000; // delta in seconds
		this.lastFrameTime = now;
		this.world.update();
	}

	exportState(includeStaticObjects: boolean = false) {
		let state = this.world.exportState(includeStaticObjects);
		state["type"] = includeStaticObjects ? "full" : "partial";
		if (!includeStaticObjects) {
			delete state["components"];
		}

		return state;
	}

	
	constructor (clientData) {
		this.clientData = clientData;

		this.world.game = this;

		// -- add background

		// this.world.addObject(new GameObject({
		// 	game: this,
		// 	position: new Point2D(0, 0),
		// 	name: "background",
		// 	isStatic: true,
		// 	zIndex: -10,
		// 	components: [
		// 		new Sprite({
		// 			imagePath: "assets/maps/map1.png",
		// 		})
		// 	],
		// 	scale: new Vector2D(2700, 500),
		// }));

		// this.world.addObject(new GameObject({
		// 	game: this,
		// 	position: new Point2D(0, 50),
		// 	name: "background",
		// 	isStatic: true,
		// 	zIndex: -10,
		// 	components: [
		// 		new Sprite({
		// 			imagePath: "assets/maps/map1/grid.png",
		// 		})
		// 	],
		// 	scale: new Vector2D(2700, 430).multiply(1),
		// }));



		this.world.addObject(new GameObject({game:this}));

		this.world.addObject(new GameObject({
			game: this,
			position: new Point2D(0, 0),
			name: "background",
			isStatic: true,
			zIndex: -15,
			components: [
				new Sprite({
					imagePath: "assets/maps/map1/grid3.png",
				})
			],
			scale: new Vector2D(2700, 430).multiply(1),
		}));
		
		for (let i = 0; i < 3; i ++) {
			this.world.addObject(new GameObject({
				game: this,
				position: new Point2D(0, -230),
				name: "crowd",
				variables: {
					offset: i * 15
				},
				zIndex: -15,
				components: [
					new Sprite({
						imagePath: [
							"assets/maps/map1/crowd.png",
							"assets/maps/map1/crowd2.png"
						][i%2],
					})
				],
				scale: new Vector2D(4200, 118).multiply(0.5),
				onUpdate: function () {
					const amplitude = 5;  
					const frequency = 0.5;
					const baseY = -240;    
	
					// apply oscillation
					this.position.y = oscillateValue(baseY, amplitude, frequency, this.variables["offset"]);
				}
			}));
		}

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

		this.team1GoalPostEnd = lastElem(this.team1.players).position.x - 100;
		this.team2GoalPostEnd = lastElem(this.team2.players).position.x + 100;

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

		this.world.addObject(new GameObject({
			scale: (new Vector2D(181, 471)).multiply(0.7),
			position: new Point2D(this.team1GoalPostEnd, 0),
			game: this,
			name: "goalpost",
			components: [
				new Sprite({
					imagePath: "assets/goalpost.png",
					flippedHorizontal: true
				}),
			],
		}))


		this.world.viewport.camera = this.world.camera;
	}
}
