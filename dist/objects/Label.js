import { Point2D, Vector2D, interpolate, randomBetween } from './Coordinates.js';
import { GameObject } from './GameObjects.js';
import { PongGame3 } from '../pong3.js';
import {} from './Sprite.js';
import { Viewport } from './Viewport.js';
export class Label extends GameObject {
    text;
    font = "20px Avant ";
    color = "black";
    constructor(params) {
        super({ game: params.game });
        Object.assign(this, params);
        this.name = "label";
    }
    draw(viewport) {
        console.log("text drawn");
        viewport.ctx.font = this.font;
        viewport.ctx.fillStyle = this.color;
        const textWidth = viewport.ctx.measureText(this.text).width;
        const metrics = viewport.ctx.measureText(this.text);
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        const x = this.getWorldPosition().x - textWidth / 2;
        const y = this.getWorldPosition().y + textHeight / 2;
        viewport.ctx.fillText(this.text, x, y);
    }
}
//# sourceMappingURL=Label.js.map