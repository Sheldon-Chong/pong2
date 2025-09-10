import { Point2D, Vector2D } from './objects/Coordinates.js';
import { GameObject } from './objects/GameObject.js';
import { Sprite } from './objects/Sprite.js';
import { HitBox } from './objects/Hitbox.js';
import { Glow } from './objects/Glow.js';
import { BlendMode } from './objects/Blendmodes.js';
import { GameTeam, Padel } from './pong3.js'; // Adjust import as needed
import { Team } from './pong3.js';   // Adjust import as needed
import { Timer } from './objects/Timer.js';

function lastElem<T>(array: T[]): T {
    return array[array.length - 1];
}

export class Ball extends GameObject {
	rotationVelocity: number = 0;
	lastPadelHit: Padel | null = null;
	collided: boolean = false;
	static MAX_BOUNCE_ANGLE = Math.PI / 3;

	hitbox: HitBox;
	sprite: Sprite;

	init () {
		this.updateToGame();
	}

	calculateAngle(other: Padel) {
		// Center positions
		const paddleCenterY = other.position.y + other.scale.y / 2;
		const ballCenterY = this.position.y + this.scale.y / 2;

		// Calculate intersection
		const relativeIntersectY = ballCenterY - paddleCenterY;
		const normalizedIntersectY = relativeIntersectY / (other.scale.y / 2);
		const clampedIntersectY = Math.max(-1, Math.min(normalizedIntersectY, 1));

		// Set fixed X velocity, direction based on team
		const direction = other.team === Team.TEAM2 ? -1 : 1;
		this.velocity.x = this.game.gameSettings.ballSpeed * direction;

		if (other.team === Team.TEAM2)
			console.log("TEAM 2!!!!");

		if (other.team === Team.TEAM1)
			console.log("TEAM 1!!!!");
		console.log("collision");

		// Set Y velocity based on intersection
		this.velocity.y = clampedIntersectY * 200;

		this.rotationVelocity = 0.4;
	}

	export(exportStatic: boolean = false) {
		return {
			name: this.name,
			id: this.id,
			position: this.position,
			scale: this.scale,
			components: this.componentToJSON(exportStatic),
		}
	}

	constructor(params: { position: Point2D, game: any }) {
		super({
			position: params.position,
			game: params.game,
			name: "ball",
			scale: new Vector2D(40, 40)
		});

		this.sprite = new Sprite({
			imagePath: "assets/ball.png",
			glow: new Glow({
				Color: "#3C2000",
				Blur: 10,
				OffsetX: 0,
				OffsetY: 0,
				blendMode: BlendMode.Multiply
			})
		});
		this.hitbox = new HitBox({
			host: this,
			onCollide: (otherHitBox) => {
				const other = otherHitBox.host;

				if (other instanceof Padel) {
					
					// ignores getting hit by the same padel twice
					if (this.lastPadelHit === other)
						return;
					
					// swap velocity when hitting teammate of the same team
					if (
						this.lastPadelHit &&
						this.lastPadelHit.team === other.team
					) {
						this.velocity.x = -this.velocity.x;
					}
					
					// inverse velocity when hit 
					else {
						this.calculateAngle(other);
					}
					this.lastPadelHit = other;
					this.collided = true;
				}
				return true;
			}
		});
		this.addComponent(this.hitbox);
		this.addComponent(this.sprite);

		this.onUpdate = () => {
			// this.sprite.rotation += this.rotationVelocity;
			this.rotationVelocity *= 0.98;
			// Add wall bounce and particle logic as needed

			if (this.position.y < -this.game.world.viewport.height / 2) {
				this.position.y = -this.game.world.viewport.height / 2;
				this.velocity.y *= -1;
			}
			else if (this.position.y > this.game.world.viewport.height / 2) {
				this.position.y = this.game.world.viewport.height / 2;
				this.velocity.y *= -1;
			}


			// -- CHECK IF HITTING GOAL --
			if (this.position.x < lastElem(this.game.team1.players).position.x)  
				this.onHitGoal(Team.TEAM1);
			else if (this.position.x > lastElem(this.game.team2.players).position.x)  
				this.onHitGoal(Team.TEAM2);

			return true;
		};

		this.velocity.x = this.game.gameSettings.ballSpeed;
	}

	onHitGoal(team:string) {
		this.game.world.addTimer(1, () => {
			this.position.x = 0;
			this.velocity.x = 0;
			this.game.world.addTimer(3, () => {
				if (team === Team.TEAM1)
					this.velocity.x = this.game.gameSettings.ballSpeed;
				else if (team === Team.TEAM2)
					this.velocity.x = -this.game.gameSettings.ballSpeed;
			});
		});
	}
}