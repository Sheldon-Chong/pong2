import { Point2D, Vector2D, interpolate,randomBetween } from './Coordinates';
import { GameObject } from './GameObjects.js';
import { PongGame3 } from '../pong3.js';

export class Camera extends GameObject {
    shakeValue: Vector2D = new Vector2D(0,0);
    target: GameObject;
    rawPosition: Point2D;
    declare game: PongGame3;
    declare position: Point2D;

    constructor (params: Partial<Camera>) {
        const startingPos = new Point2D(0, 0);
        super({position: startingPos, game: params.game});
        this.name = "camera";
        this.rawPosition = startingPos;
        this.position = startingPos;
        
        this.onUpdate = () => {
            this.rawPosition = interpolate(this.rawPosition, new Point2D(this.target.position.x, 0), 80);
            this.position = this.rawPosition.add(new Vector2D(randomBetween(-this.shakeValue.x,this.shakeValue.x), randomBetween(-this.shakeValue.y,this.shakeValue.y)));
            this.shakeValue = this.shakeValue.subtract((new Vector2D(170, 170)).multiply(this.game.delta));
            
            if (this.shakeValue.x < 0) 
                this.shakeValue = new Vector2D(0,0);

            return true;
        }
    }
}