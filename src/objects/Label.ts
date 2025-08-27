import { Point2D, Vector2D, interpolate,randomBetween } from './Coordinates.js';
import { GameObject } from './GameObjects.js';
import { PongGame3 } from '../pong3.js';

export class Label extends GameObject {
    public text: string;
    declare position: Point2D;
    declare game: PongGame3;
    public font: string = "20px Avant ";
    public color: string = "black";

    constructor(params) {
        super({position: params.position, game: params.game});
        Object.assign(this, params);
        this.name = "label";
    }

    Draw(ctx: CanvasRenderingContext2D) {
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



