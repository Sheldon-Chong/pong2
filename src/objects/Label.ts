import { GameObject } from '../Index.js'
import { Point2D, Vector2D, interpolate, randomBetween } from '../Coordinates.js'
import { PongGame } from '../pong.js'

interface LabelParams {
    position: Point2D;
    game: PongGame;
    text?: string;
    font?: string;
    color?: string;
}


export class Label extends GameObject {
    public text: string = "";
    declare position: Point2D;
    declare game: PongGame;
    public font: string = "20px Avant ";
    public color: string = "black";


    constructor(params: LabelParams) {
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



