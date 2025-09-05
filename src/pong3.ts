
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




export class Player {
	name: string = "";
	profileImage: string = "";
	skin: Sprite | null = null;

	constructor(params: Partial<Player> = {}) {
		Object.assign(this, params);
	}
}


class GameSettings {
	playerAcceleration: number = 4300;
	playerCount: number = 2;
	ballSpeed: number = 200;
	
	arrowDownKey: string = "ArrowDown";
	arrowUpKey: string = "ArrowUp";
}



export class Padel extends GameObject {

	public team: string;
	public player: Player;
	public moveDownKey: string = "ArrowDown";
	public moveUpKey: string = "ArrowUp";

	isMoving: boolean = false;

	sprite: Sprite = this.addComponent(new Sprite({
		imagePath: "assets/skins/ghost_light.png",
		host: this
	})) as Sprite;

	constructor(params: Partial<Padel>) {
		super({
			position: params.position, 
			game: params.game,
			name: "padel",
		});

		Object.assign(this, params);

		this.scale = new Vector2D(60,60);
		// console.log("scale", this.scale);

		this.addChild(new Label({
			text: this.player.name, 
			position : new Point2D(0, 50), 
			font: "15px Century Gothic", 
			color: "#ffffff"
		}));

		this.addComponent(new HitBox({
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
	new Player({name: "player1asjdklasd", profileImage: "assets/profile1.webp"}),
	new Player({name: "player2", profileImage: "assets/profile2.webp"}),
	new Player({name: "player3"}),
	new Player({name: "player4"}),
	new Player({name: "player5"}),
	new Player({name: "player6"}),
];

export class PongGame {

	clientData;
	gameObjects: Map<number, GameObject> = new Map();
	team1: GameTeam = new GameTeam(this, Team.TEAM1);
	team2: GameTeam = new GameTeam(this, Team.TEAM2);
	camera: Camera;

	lastFrameTime: number = performance.now();
	fps: number = 0;
	delta: number;
	viewport: Viewport = new Viewport({
		width: 800,
		height: 400,
	});

	gameSettings: GameSettings = new GameSettings();

	checkCollisions() {
		const hitboxes: HitBox[] = [];
		for (const obj of this.gameObjects.values()) {
			for (const comp of obj.components) {
				if (comp instanceof HitBox) {
					hitboxes.push(comp);
				}
			}
		}
		for (let i = 0; i < hitboxes.length; i++) {
			for (let j = i + 1; j < hitboxes.length; j++) {
				const a = hitboxes[i];
				const b = hitboxes[j];
				if (a.isCollidingWith(b)) {
					a.isColliding = b.isColliding = true;
					a.onCollide?.(b);
					b.onCollide?.(a);
				} else {
					a.isColliding = b.isColliding = false;
				}
			}
		}
	}

	update() {
		const now = performance.now();
		this.delta = (now - this.lastFrameTime) / 1000; // delta in seconds
		this.lastFrameTime = now;

		for (const object of this.gameObjects.values()) {
			object.update();
			object.toUpdate = true;
		}
		this.checkCollisions();
		
	}


	exportBackLog: GameObject[] = [];

	exportState() {
		const visited = new Set();
		const flatObjects: any[] = [];

		function flatten(obj) {
			if (!obj || visited.has(obj.id)) return;
			visited.add(obj.id);

			if (!obj.toUpdate)
				return;
			flatObjects.push(obj.export());

			if (obj.children && obj.children.length > 0) {
				for (const child of obj.children) 
					flatten(child);
			}
			obj.toUpdate = false;
		}

		for (const obj of this.gameObjects.values()) {
			flatten(obj);
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


		
		this.exportBackLog.length = 0;
		return { 
			camera: {
				position: this.camera.position
			},
			gameObjects: flatObjects,
		};
	}

	addObject(object: GameObject) {
		object.game = this;
		this.gameObjects.set(object.id, object);
		object.init(); // <-- Add this line
		if (object.children && object.children.length > 0) {
			for (const child of object.children) {
				this.addObject(child);
				child.game = this;
				child.init();
			}
		}
		return object;
	}

	constructor (clientData) {
		this.clientData = clientData;


		// -- add background

		this.addObject(new GameObject({
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

		// this.addObject(new Padel({
		// 	game: this,
		// 	position: new Point2D(0, 0),
		// 	team: "test",
		// 	player: new Player({name: "sheldz"})
		// }));

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
				this.addObject(padel);
			} else {
				const padel = new Padel({
					position: new Point2D(((i - 1) * distance) + offset, 0),
					team: Team.TEAM2,
					player: players[i],
					game: this,
					moveUpKey: rightBoardControls[Math.floor((i - 1) / 2)][0],
					moveDownKey: rightBoardControls[Math.floor((i - 1) / 2)][1]
				});
				this.team2.players.push(padel);
				this.addObject(padel);
			}
		}

		// -- add ball --

		let ball = this.addObject(new Ball({
			game: this,
			position: new Point2D(0, 0)
		}));

		this.camera = this.addObject(new Camera({
			position: new Point2D(0,-100),
			target: ball,
			// onUpdate: () => {
			// 	// this.position.x += 0.01;
			// }
		})) as Camera;

		this.viewport.camera = this.camera;
	}
}

