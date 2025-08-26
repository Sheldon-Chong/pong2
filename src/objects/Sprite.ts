import { Point2D, Vector2D } from './Coordinates.js';

export class Glow {
    constructor(
        public shadowColor: string = "red",
        public shadowBlur: number = 20,
        public shadowOffsetX: number = 0,
        public shadowOffsetY: number = 0,
        public blendMode: GlobalCompositeOperation = "source-over"
    ) {}
}

export class Sprite {
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
    pos: Point2D = new Point2D(0,0);

    config(params: Partial<Sprite> ): Sprite {
        Object.assign(this, params);
        return this;
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
                this.glow.shadowColor,
                this.glow.shadowBlur,
                this.glow.shadowOffsetX,
                this.glow.shadowOffsetY,
                this.glow.blendMode
            ) : null,
            pos: this.pos
        });
    }
}

export function drawImg(
    sprite:Sprite,
    ctx: CanvasRenderingContext2D,
    pos: Point2D,
    size: Vector2D,
    angle: number,
) {
    if (sprite.glow) {
        ctx.save();
        ctx.globalAlpha = sprite.opacity;
        ctx.globalCompositeOperation = sprite.glow.blendMode;
        ctx.translate(pos.x + size.x / 2, pos.y + size.y / 2);
        ctx.rotate(angle);
        ctx.shadowColor = sprite.glow.shadowColor;
        ctx.shadowBlur = sprite.glow.shadowBlur;
        ctx.shadowOffsetX = sprite.glow.shadowOffsetX;
        ctx.shadowOffsetY = sprite.glow.shadowOffsetY;
        if (sprite.flippedHorizontal) ctx.scale(-1, 1);
        ctx.drawImage(sprite.image, -size.x / 2, -size.y / 2, size.x, size.y);
        ctx.restore();
    }
    ctx.save();
    ctx.globalAlpha = sprite.opacity;
    ctx.globalCompositeOperation = sprite.blendMode;
    ctx.translate(pos.x + size.x / 2, pos.y + size.y / 2);
    ctx.rotate(angle);
    if (sprite.flippedHorizontal) ctx.scale(-1, 1);
    if (sprite.outline) {
        ctx.beginPath();
        const diameter = Math.max(size.x, size.y);
        ctx.arc(0, 0, diameter / 2, 0, Math.PI * 2);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    ctx.drawImage(sprite.image, -size.x / 2, -size.y / 2, size.x, size.y);
    ctx.restore();
}