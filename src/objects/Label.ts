import { Point2D, Vector2D, interpolate, randomBetween } from './Coordinates.js';
import { GameObject, exportCleanup } from './GameObject.js';
import { PongGame } from '../game/pong.js';
import { type Renderable } from './Sprite.js';
import { Viewport } from './Viewport.js';


export class Label extends GameObject {
    public text: string = "default";
    public font: string = "20px Avant ";
    public color: string = "black";
    className: string = "label";

    constructor(params: Partial<Label>) {
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


    export(exportStatic: boolean = false): any {
        return exportCleanup ({
            STATIC_name: this.name,
            className: this.className,
            id: this.id,
            position: this.position.export(),
            STATIC_scale: this.scale,
            STATIC_rotation: this.rotation,
            STATIC_components: this.componentToJSON(exportStatic),
            STATIC_children: this.children?.map(child => child.id),
            STATIC_text: this.text,
            STATIC_font: this.font,
            STATIC_color: this.color
        }, exportStatic);
    }
}



