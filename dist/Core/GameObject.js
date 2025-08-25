import { Point2D, Vector2D } from '../Coordinates.js';
import { Sprite } from './Sprite';
import { HitBox } from './HitBox';
export class GameObject {
    position;
    game;
    parent;
    name;
    velocity;
    acceleration;
    maximumVelocity;
    size;
    sprite;
    hitbox;
    ctx;
    onCollide;
    onUpdate;
    collisions = [];
    children = [];
    constructor(position, game, parent = null, name = "", velocity = new Vector2D(0, 0), acceleration = new Vector2D(0, 0), maximumVelocity = new Vector2D(1000, 1000), size = new Vector2D(0, 0), sprite, hitbox, ctx = game.ctx, onCollide, onUpdate) {
        this.position = position;
        this.game = game;
        this.parent = parent;
        this.name = name;
        this.velocity = velocity;
        this.acceleration = acceleration;
        this.maximumVelocity = maximumVelocity;
        this.size = size;
        this.sprite = sprite;
        this.hitbox = hitbox;
        this.ctx = ctx;
        this.onCollide = onCollide;
        this.onUpdate = onUpdate;
    }
    addChild(object) {
        this.children.push(object);
        object.parent = this;
    }
    Draw() {
        if (this.sprite === undefined)
            return;
        const pos = this.getWorldPosition().subtract(this.sprite.size.divide(new Vector2D(2, 2)));
        this.sprite.drawImg(this.ctx, pos.add(this.sprite.pos.toVector2D()), this.sprite.size, this.sprite.rotation);
        for (const child of this.children) {
            child.Draw();
        }
    }
    previewHitbox() {
        if (!this.hitbox || !this.hitbox.size)
            return;
        const x = this.position.x - this.hitbox.size.x / 2;
        const y = this.position.y - this.hitbox.size.y / 2;
        this.ctx.save();
        this.ctx.strokeStyle = "blue";
        this.ctx.strokeRect(x, y, this.hitbox.size.x, this.hitbox.size.y);
        this.ctx.restore();
    }
    getWorldPosition() {
        if (!this.parent) {
            return new Point2D(this.position.x - this.game.camera.position.x, this.position.y - this.game.camera.position.y).add(this.game.canvasSize.divide(new Vector2D(2, 2)));
        }
        const parentPos = this.parent.getWorldPosition();
        return new Point2D(parentPos.x + this.position.x, parentPos.y + this.position.y);
    }
    update(delta) {
        this.velocity.x += this.acceleration.x * delta;
        this.velocity.y += this.acceleration.y * delta;
        if (this.maximumVelocity) {
            this.velocity.x = Math.max(-Math.abs(this.maximumVelocity.x), Math.min(this.velocity.x, Math.abs(this.maximumVelocity.x)));
            this.velocity.y = Math.max(-Math.abs(this.maximumVelocity.y), Math.min(this.velocity.y, Math.abs(this.maximumVelocity.y)));
        }
        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;
        this.collisions = [];
        if (this.hitbox !== undefined) {
            for (const obj of this.game.gameObjects) {
                if (obj !== this &&
                    this.hitbox !== null &&
                    obj.hitbox !== undefined &&
                    obj.hitbox !== null &&
                    this.hitbox.isCollidingWith(obj.hitbox)) {
                    this.collisions.push(obj);
                    if (this.onCollide) {
                        this.onCollide(obj);
                    }
                }
            }
        }
        if (this.onUpdate !== undefined) {
            this.onUpdate();
        }
        for (const child of this.children) {
            if (child.onUpdate)
                child.onUpdate();
        }
    }
}
//# sourceMappingURL=GameObject.js.map