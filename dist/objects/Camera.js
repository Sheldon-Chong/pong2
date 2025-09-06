import { Point2D, Vector2D, interpolate, randomBetween } from './Coordinates.js';
import { GameObject } from './GameObject.js';
export class Camera extends GameObject {
    shakeValue = new Vector2D(0, 0);
    target;
    rawPosition;
    className = "camera";
    constructor(params) {
        const startingPos = new Point2D(0, 0);
        super({
            position: startingPos,
        });
        Object.assign(this, params);
        this.name = "camera";
        this.rawPosition = startingPos;
        this.position = startingPos;
        console.log("constructed");
        this.onUpdate = () => {
            this.position.x += 0.01;
            // console.log(this.position.x);
            this.rawPosition = interpolate(this.rawPosition, new Point2D(this.target.position.x, 0), 80);
            this.position = this.rawPosition.add(new Vector2D(randomBetween(-this.shakeValue.x, this.shakeValue.x), randomBetween(-this.shakeValue.y, this.shakeValue.y)));
            this.shakeValue = this.shakeValue.subtract((new Vector2D(170, 170)).multiply(this.game.delta));
            if (this.shakeValue.x < 0)
                this.shakeValue = new Vector2D(0, 0);
            return true;
        };
    }
}
//# sourceMappingURL=Camera.js.map