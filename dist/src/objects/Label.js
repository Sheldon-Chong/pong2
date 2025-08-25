import { GameObject } from '../Index.js';
import { Point2D, Vector2D, interpolate, randomBetween } from '../Coordinates.js';
import { PongGame } from '../pong.js';
export class Label extends GameObject {
    text = "";
    font = "20px Avant ";
    color = "black";
    constructor(params) {
        super(params.position, params.game);
        Object.assign(this, params);
        this.hitbox = null;
        this.name = "string";
    }
    Draw() {
        this.ctx.font = this.font;
        this.ctx.fillStyle = this.color;
        const textWidth = this.ctx.measureText(this.text).width;
        const metrics = this.ctx.measureText(this.text);
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        const x = this.getWorldPosition().x - textWidth / 2;
        const y = this.getWorldPosition().y + textHeight / 2;
        this.ctx.fillText(this.text, x, y);
    }
}
//# sourceMappingURL=Label.js.map