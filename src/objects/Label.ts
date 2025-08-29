import { Point2D, Vector2D, interpolate,randomBetween } from './Coordinates.js';
import { GameObject } from './GameObjects.js';
import { PongGame3 } from '../pong3.js';
import { type Renderable } from './Sprite.js';

export class Label extends GameObject {
    public text: string;
    public font: string = "20px Avant ";
    public color: string = "black";

    constructor(params) {
        super({game: params.game});
        Object.assign(this, params);
        this.name = "label";
    }

    draw(ctx: CanvasRenderingContext2D) {
        console.log("text drawn");
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



