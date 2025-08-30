import { Point2D, Vector2D } from "./objects/Coordinates.js";
import { GameObject } from "./objects/GameObjects.js";
import { HitBox } from "./objects/Hitbox.js";
import { Sprite } from "./objects/Sprite.js";
import type { PongGame3 } from "./pong3.js";

export class Ball extends GameObject {
    constructor(game: PongGame3) {
        super({
            game: game,
            position: new Point2D(0,0),
            scale: new Vector2D(40,40)
        })

        this.addComponent(new Sprite({
            imagePath: "assets/ball.png"
        }))

        this.addChild(new HitBox({}));
    }


}