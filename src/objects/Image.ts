import { GameObject, Sprite} from '../Index.js'
import { Point2D, Vector2D} from '../Coordinates.js'
import { PongGame, Team } from '../pong.js'

export class Image extends GameObject {
    constructor(game: PongGame, pos: Point2D, sprite: Sprite) {
        super(pos, game);
        this.sprite = sprite;
    }
    
    // Draw(): void {
    //     this.sprite?.drawImg(this.game.ctx, new Point2D(0,0), this.sprite.size, 0);
    // }
}