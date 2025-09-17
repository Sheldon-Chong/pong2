import { Point2D, Vector2D, interpolate, randomBetween } from './Coordinates.js';
import { GameObject, exportCleanup } from './GameObject.js';
import { PongGame } from '../game/pong.js';
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
        const screenPos = this.toScreenPosition(viewport);
        const x = screenPos.x - textWidth / 2;
        const y = screenPos.y + textHeight / 2;
        viewport.ctx.fillText(this.text, x, y);
    }
    export(exportStatic = false) {
        return exportCleanup({
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
//# sourceMappingURL=Label.js.map