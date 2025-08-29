import { Point2D, Vector2D } from './Coordinates.js';
import { Glow } from './Glow.js';
import { Component } from './Component.js';
export var Tags;
(function (Tags) {
    Tags["Renderable"] = "Renderable";
    Tags["Updatable"] = "Updatable";
    Tags["Collidable"] = "Collidable";
})(Tags || (Tags = {}));
export class Outline {
    static CIRCLE = 0;
    static RECTANGLE = 1;
    thickness;
    type = Outline.RECTANGLE;
    constructor(params) {
        Object.assign(this, params);
    }
}
export class Sprite extends Component {
    [Tags.Renderable] = true;
    // className: string = "sprite";
    image;
    imagePath = null;
    flippedHorizontal = false;
    crop = false;
    outline = null;
    opacity = 1.0;
    blendMode = "source-over";
    glow = null;
    config(params) {
        Object.assign(this, params);
        return this;
    }
    toJSON() {
        return {
            name: this.name, // Add this line
            imagePath: this.imagePath,
            flippedHorizontal: this.flippedHorizontal,
            crop: this.crop,
            outline: this.outline,
            opacity: this.opacity,
            blendMode: this.blendMode,
            glow: this.glow ? this.glow : null,
        };
    }
    constructor(params = {}) {
        super({
            name: "sprite",
            renderable: true,
        });
        Object.assign(this, params);
    }
    init() {
        const diameter = Math.max(this.host.scale.x, this.host.scale.y);
        if (typeof document === "undefined") {
            return;
        }
        const canvas = document.createElement('canvas');
        canvas.width = diameter;
        canvas.height = diameter;
        const ctx = canvas.getContext('2d');
        this.image = new Image();
        if (this.imagePath instanceof HTMLImageElement)
            this.image = this.imagePath;
        else if (ctx) {
            ctx.save();
            if (this.crop) {
                ctx.beginPath();
                ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
            }
            let img = new Image();
            if (this.imagePath)
                img.src = this.imagePath;
            else
                img.src = "#ffffff";
            if (this.crop) {
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, diameter, diameter);
                    this.image.src = canvas.toDataURL();
                };
                this.image.src = canvas.toDataURL();
            }
            this.image.src = img.src;
        }
        this.opacity = this.opacity;
        if (this.host.scale.x === 0 && this.host.scale.y === 0) {
            this.host.scale = new Vector2D(this.image.width, this.image.height);
        }
        return this;
    }
    draw(ctx) {
        drawImg(ctx, this);
    }
}
export function drawImg(ctx, sprite, params = {}) {
    const merged = Object.assign({}, sprite, params);
    const { opacity, blendMode, glow, flippedHorizontal, outline, image } = merged;
    const position = sprite.host?.getWorldPosition() || { x: 0, y: 0 };
    const rotation = sprite.host?.rotation || 0;
    const scale = sprite.host?.scale || { x: 1, y: 1 };
    const angle = rotation;
    // if (glow) {
    //     ctx.save();
    //     ctx.globalAlpha = opacity;
    //     ctx.globalCompositeOperation = glow.blendMode;
    //     ctx.translate(position.x + scale.x / 2, position.y + scale.y / 2);
    //     ctx.rotate(angle);
    //     ctx.scale(scale.x, scale.y);
    //     ctx.shadowColor = glow.Color;
    //     ctx.shadowBlur = glow.Blur;
    //     ctx.shadowOffsetX = glow.OffsetX;
    //     ctx.shadowOffsetY = glow.OffsetY;
    //     if (flippedHorizontal) ctx.scale(-1, 1);
    //     ctx.drawImage(image, -scale.x / 2, -scale.y / 2, scale.x, scale.y);
    //     ctx.restore();
    // }
    // console.log("scale", scale);
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.globalCompositeOperation = blendMode;
    ctx.translate(position.x, position.y);
    ctx.rotate(angle);
    if (flippedHorizontal)
        ctx.scale(-1, 1);
    if (outline instanceof Outline) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = outline.thickness || 2;
        if (outline.type === Outline.CIRCLE) {
            const diameter = Math.max(scale.x, scale.y);
            ctx.arc(0, 0, diameter / 2, 0, Math.PI * 2);
        }
        else if (outline.type === Outline.RECTANGLE) {
            ctx.rect(-scale.x / 2, -scale.y / 2, scale.x, scale.y);
        }
        ctx.stroke();
    }
    ctx.drawImage(image, -scale.x / 2, -scale.y / 2, scale.x, scale.y);
    ctx.restore();
}
//# sourceMappingURL=Sprite.js.map