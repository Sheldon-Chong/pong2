import { Point2D, Vector2D, interpolate, randomBetween } from '../Coordinates.js';
import { GameObject, Ball } from '../Index.js';
import { PongGame } from '../pong.js';
export class Camera extends GameObject {
    shakeValue = new Vector2D(0, 0);
    target = new Point2D(0, 0);
    rawPosition;
    constructor(startingPos, game) {
        super(startingPos, game);
        this.name = "camera";
        this.rawPosition = startingPos;
        this.position = startingPos;
        this.onUpdate = () => {
            this.rawPosition = interpolate(this.rawPosition, new Point2D(this.game.ball.position.x, 0), 80);
            this.position = this.rawPosition.add(new Vector2D(randomBetween(-this.shakeValue.x, this.shakeValue.x), randomBetween(-this.shakeValue.y, this.shakeValue.y)));
            this.shakeValue = this.shakeValue.subtract((new Vector2D(170, 170)).multiply(this.game.delta));
            if (this.shakeValue.x < 0) {
                this.shakeValue = new Vector2D(0, 0);
            }
            // if (this.shakeValue.x > 60) {
            //     for (const filter of this.game.filter) {
            //         filter.sprite!.opacity = 1;  
            //     }
            // }
            for (const filter of this.game.filter) {
                filter.sprite.opacity = 0;
            }
            return true;
        };
    }
}
//# sourceMappingURL=Camera.js.map