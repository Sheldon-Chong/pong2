import { Point2D, Vector2D } from '../Coordinates.js';
import { Sprite } from './Sprite.js';
export class Particle {
    game;
    lifespanMs;
    sprite;
    position;
    onUpdate;
    direction;
    speed;
    createdAt;
    constructor(game, lifespanMs, sprite, position, onUpdate, direction = 0, speed = 0) {
        this.game = game;
        this.lifespanMs = lifespanMs;
        this.sprite = sprite;
        this.position = position;
        this.onUpdate = onUpdate;
        this.direction = direction;
        this.speed = speed;
        this.createdAt = performance.now();
    }
    draw() {
        let pos = new Point2D(this.position.x - this.game.camera.position.x, this.position.y - this.game.camera.position.y).add(this.game.canvasSize.divide(new Vector2D(2, 2)));
        pos = pos.subtract(this.sprite.size.divide(new Vector2D(2, 2)));
        this.sprite.drawImg(this.game.ctx, pos.add(this.sprite.pos.toVector2D()), this.sprite.size, this.sprite.rotation);
    }
    update() {
        if (this.onUpdate)
            this.onUpdate(this);
    }
    isAlive() {
        return (performance.now() - this.createdAt) < this.lifespanMs;
    }
}
//# sourceMappingURL=Particle.js.map