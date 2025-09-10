import { Point2D, Vector2D, interpolate, randomBetween } from './Coordinates.js';
import { GameObject, pruneEmpty } from './GameObject.js';
import { PongGame } from '../pong3.js';
import {} from './Sprite.js';
import { Viewport } from './Viewport.js';
export class Label extends GameObject {
    text = "default";
    font = "20px Avant ";
    color = "black";
    className = "label";
    constructor(params) {
        super({ game: params.game, name: "label" });
        Object.assign(this, params);
    }
    draw(viewport) {
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
    export(exportStatic = false) {
        return pruneEmpty({
            name: this.name,
            className: this.className,
            id: this.id,
            position: this.position,
            scale: this.scale,
            rotation: this.rotation,
            components: this.componentToJSON(exportStatic),
            children: this.children?.map(child => child.id),
            STATIC_text: this.text,
            STATIC_font: this.font,
            STATIC_color: this.color
        }, exportStatic);
    }
}
//# sourceMappingURL=Label.js.map