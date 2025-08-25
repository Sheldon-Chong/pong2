import { Point2D, Vector2D } from '../Coordinates.js';
import { Glow } from './Glow';
export class Sprite {
    image;
    imagePath = null;
    size = new Vector2D(0, 0);
    rotation = 0;
    flippedHorizontal = false;
    crop = false;
    outline = false;
    opacity = 1.0;
    blendMode = "source-over";
    glow = null;
    pos = new Point2D(0, 0);
    config(params) {
        Object.assign(this, params);
        return this;
    }
    constructor(params = {}) {
        Object.assign(this, params);
        const diameter = Math.max(this.size.x, this.size.y);
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
            img.onload = () => {
                ctx.drawImage(img, 0, 0, diameter, diameter);
                this.image.src = canvas.toDataURL();
            };
            this.image.src = canvas.toDataURL();
        }
        this.opacity = this.opacity;
        if (this.size.x === 0 && this.size.y === 0) {
            this.size = new Vector2D(this.image.width, this.image.height);
        }
    }
    drawImg(ctx, pos, size, angle) {
        if (this.glow) {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.globalCompositeOperation = this.glow.blendMode;
            ctx.translate(pos.x + size.x / 2, pos.y + size.y / 2);
            ctx.rotate(angle);
            ctx.shadowColor = this.glow.shadowColor;
            ctx.shadowBlur = this.glow.shadowBlur;
            ctx.shadowOffsetX = this.glow.shadowOffsetX;
            ctx.shadowOffsetY = this.glow.shadowOffsetY;
            if (this.flippedHorizontal)
                ctx.scale(-1, 1);
            ctx.drawImage(this.image, -size.x / 2, -size.y / 2, size.x, size.y);
            ctx.restore();
        }
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.globalCompositeOperation = this.blendMode;
        ctx.translate(pos.x + size.x / 2, pos.y + size.y / 2);
        ctx.rotate(angle);
        if (this.flippedHorizontal)
            ctx.scale(-1, 1);
        if (this.outline) {
            ctx.beginPath();
            const diameter = Math.max(size.x, size.y);
            ctx.arc(0, 0, diameter / 2, 0, Math.PI * 2);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        ctx.drawImage(this.image, -size.x / 2, -size.y / 2, size.x, size.y);
        ctx.restore();
    }
    clone() {
        const clonedImage = new Image();
        clonedImage.src = this.image.src;
        return new Sprite({
            imagePath: clonedImage,
            size: new Vector2D(this.size.x, this.size.y),
            rotation: this.rotation,
            flippedHorizontal: this.flippedHorizontal,
            crop: this.crop,
            outline: this.outline,
            opacity: this.opacity,
            blendMode: this.blendMode,
            glow: this.glow ? new Glow(this.glow.shadowColor, this.glow.shadowBlur, this.glow.shadowOffsetX, this.glow.shadowOffsetY, this.glow.blendMode) : null,
            pos: this.pos
        });
    }
}
//# sourceMappingURL=Sprite.js.map