import { Point2D, Vector2D } from './objects/Coordinates.js';
import { GameObject } from './objects/GameObject.js';
import { Sprite } from './objects/Sprite.js';
import { HitBox } from './objects/Hitbox.js';
import { Glow } from './objects/Glow.js';
import { BlendMode } from './objects/Blendmodes.js';
import { Padel } from './pong3.js'; // Adjust import as needed
import { Team } from './pong3.js'; // Adjust import as needed
export class Ball extends GameObject {
    rotationVelocity = 0;
    lastPadelHit = null;
    collided = false;
    static MAX_BOUNCE_ANGLE = Math.PI / 3;
    hitbox;
    sprite;
    calculateAngle(other) {
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
    constructor(params) {
        super({
            position: params.position,
            game: params.game,
            name: "ball",
            scale: new Vector2D(40, 40)
        });
        this.sprite = new Sprite({
            imagePath: "assets/ball.png",
            // glow: new Glow({
            //     Color: "#3C2000",
            //     Blur: 10,
            //     OffsetX: 0,
            //     OffsetY: 0,
            //     blendMode: BlendMode.Multiply
            // })
        });
        this.hitbox = new HitBox({
            host: this,
            onCollide: (otherHitBox) => {
                console.log("hit!");
                const other = otherHitBox.host;
                if (other instanceof Padel) {
                    console.log("hit!");
                    if (this.lastPadelHit &&
                        this.lastPadelHit.team === other.team &&
                        this.lastPadelHit !== other) {
                        // Reverse direction if hit by same team padel
                        this.velocity.x = -this.velocity.x;
                    }
                    else {
                        this.calculateAngle(other);
                    }
                    this.lastPadelHit = other;
                    this.collided = true;
                }
                // Add goal logic if needed
                return true;
            }
        });
        this.addComponent(this.hitbox);
        this.addComponent(this.sprite);
        this.onUpdate = () => {
            // this.sprite.rotation += this.rotationVelocity;
            this.rotationVelocity *= 0.98;
            // Add wall bounce and particle logic as needed
            if (this.position.y < -this.game.viewport.height / 2) {
                this.position.y = -this.game.viewport.height / 2;
                this.velocity.y *= -1;
            }
            if (this.position.y > this.game.viewport.height / 2) {
                this.position.y = this.game.viewport.height / 2;
                this.velocity.y *= -1;
            }
            return true;
        };
        this.velocity.x = this.game.gameSettings.ballSpeed;
    }
}
//# sourceMappingURL=ball.js.map