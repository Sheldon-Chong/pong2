import { Point2D, Vector2D, interpolate, randomBetween } from './Coordinates.js';
import { GameObject } from './GameObject.js';
import { PongGame } from '../pong3.js';
import { type Renderable } from './Sprite.js';
import { Viewport } from './Viewport.js';
export class Label extends GameObject {
    public text: string;
    public font: string = "20px Avant ";
    public color: string = "black";
    classType: string = "label";

    constructor(params) {
        super({ game: params.game, name: "label"});
        Object.assign(this, params);
    }

    draw(viewport: Viewport) {
        viewport.ctx.font = this.font;
        viewport.ctx.fillStyle = this.color;
        const textWidth = viewport.ctx.measureText(this.text).width;
        const metrics = viewport.ctx.measureText(this.text);
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        const screenPos = viewport.toScreenCoords(this.getWorldPosition());
        const x = screenPos.x - textWidth / 2;
        const y = screenPos.y + textHeight / 2;
        viewport.ctx.fillText(this.text, x, y);
    }


    export(): any {
        return {
            className: this.classType,
            id: this.id,
            position: this.position,
            scale: this.scale,
            rotation: this.rotation,
            components: this.componentToJSON(),
            children: this.children?.map(child => child.id),
            text: this.text,
            font: this.font,
            color: this.color
            // className: "className" in this ? (this as any).className : undefined
        }
    }
}



