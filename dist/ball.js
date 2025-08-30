import { Point2D, Vector2D } from "./objects/Coordinates.js";
import { GameObject } from "./objects/GameObject.js";
import { HitBox } from "./objects/Hitbox.js";
import { Sprite } from "./objects/Sprite.js";
export class Ball extends GameObject {
    constructor(game) {
        super({
            game: game,
            position: new Point2D(0, 0),
            scale: new Vector2D(40, 40)
        });
        this.addComponent(new Sprite({
            imagePath: "assets/ball.png"
        }));
        this.addComponent(new HitBox({
            onCollide: (other) => {
                this.position.y += 5;
                return () => { };
            }
        }));
    }
}
//# sourceMappingURL=ball.js.map