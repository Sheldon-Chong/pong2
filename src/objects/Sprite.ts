import { Point2D, Vector2D } from './Coordinates.js';
import { Glow } from './Glow.js';


export interface Renderable {
    position: Point2D;
    size: Vector2D;
    rotation: number;
    draw(ctx: CanvasRenderingContext2D): void;
}

export class Sprite implements Renderable {
    image: HTMLImageElement;
    imagePath: string | HTMLImageElement | null = null;
    size: Vector2D = new Vector2D(0, 0);
    rotation: number = 0;
    flippedHorizontal: boolean = false;
    crop: boolean = false;
    outline: boolean = false;
    opacity: number = 1.0;
    blendMode: GlobalCompositeOperation = "source-over";
    glow: Glow| null = null;
    position: Point2D = new Point2D(0,0);

    config(params: Partial<Sprite> ): Sprite {
        Object.assign(this, params);
        return this;
    }

    toJSON() {
        return {
            imagePath: this.imagePath,
            size: this.size,
            rotation: this.rotation,
            flippedHorizontal: this.flippedHorizontal,
            crop: this.crop,
            outline: this.outline,
            opacity: this.opacity,
            blendMode: this.blendMode,
            glow: this.glow ? this.glow : null,
            position: this.position
        };
    }
    
    constructor(params: Partial<Sprite> = {}) {
        Object.assign(this, params);
        const diameter = Math.max(this.size.x, this.size.y);
        
        if (typeof document === "undefined") {
            return ;
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

    draw(ctx: CanvasRenderingContext2D): void {
        drawImg(ctx, this);
    }

    clone(): Sprite {
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
            glow: this.glow ? new Glow(
                this.glow.Color,
                this.glow.Blur,
                this.glow.OffsetX,
                this.glow.OffsetY,
                this.glow.blendMode
            ) : null,
            pos: this.pos
        });
    }
}

export function drawImg(
    ctx: CanvasRenderingContext2D,
    sprite: Sprite,
    params: Partial<Sprite> = {}
) {
    // Merge sprite properties with params (params override sprite)
    const merged = Object.assign({}, sprite, params);

    const { position, size, rotation, opacity, blendMode, glow, flippedHorizontal, outline, image } = merged;
    const angle = rotation || 0;

    if (glow) {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.globalCompositeOperation = glow.blendMode;
        ctx.translate(position.x + size.x / 2, position.y + size.y / 2);
        ctx.rotate(angle);
        ctx.shadowColor = glow.Color;
        ctx.shadowBlur = glow.Blur;
        ctx.shadowOffsetX = glow.OffsetX;
        ctx.shadowOffsetY = glow.OffsetY;
        if (flippedHorizontal) ctx.scale(-1, 1);
        ctx.drawImage(image, -size.x / 2, -size.y / 2, size.x, size.y);
        ctx.restore();
    }

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.globalCompositeOperation = blendMode;
    ctx.translate(position.x + size.x / 2, position.y + size.y / 2);
    ctx.rotate(angle);
    if (flippedHorizontal) ctx.scale(-1, 1);
    if (outline) {
        ctx.beginPath();
        const diameter = Math.max(size.x, size.y);
        ctx.arc(0, 0, diameter / 2, 0, Math.PI * 2);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    ctx.drawImage(image, -size.x / 2, -size.y / 2, size.x, size.y);
    ctx.restore();
}