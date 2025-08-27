import { Point2D, Vector2D, interpolate, randomBetween } from './Coordinates.js';
import { GameObject } from './GameObjects.js';
import { PongGame3 } from '../pong3.js';
export class Label extends GameObject {
    text;
    font = "20px Avant ";
    color = "black";
    constructor(params) {
        super({ position: params.position, game: params.game });
        Object.assign(this, params);
        this.name = "label";
    }
    Draw(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.color;
        const textWidth = ctx.measureText(this.text).width;
        const metrics = ctx.measureText(this.text);
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        const x = this.getWorldPosition().x - textWidth / 2;
        const y = this.getWorldPosition().y + textHeight / 2;
        ctx.fillText(this.text, x, y);
    }
}
//# sourceMappingURL=Label.js.map