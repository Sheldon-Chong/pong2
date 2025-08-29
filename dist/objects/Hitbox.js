import { Point2D, Vector2D } from './Coordinates.js';
import { GameObject } from './GameObjects.js';
import { Sprite, Outline } from './Sprite.js';
export class HitBox extends GameObject {
    constructor(params) {
        super(params);
        this.name = "hitbox";
        this.addComponent(new Sprite({
            imagePath: "assets/arrow.png",
            outline: new Outline({ thickness: 0.2 })
        }));
        this.position = new Point2D(20, 20);
    }
    draw(ctx) {
        super.draw(ctx); // This will draw the hitbox's components and children
    }
}
//# sourceMappingURL=Hitbox.js.map