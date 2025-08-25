import { GameObject, Sprite, HitBox, Glow} from '../Index.js'
import { Point2D, Vector2D, interpolate, randomBetween } from '../Coordinates.js'
import { PongGame } from '../pong.js'

class ProfileImage extends GameObject {
    constructor(public game: PongGame, public profileImage: string = "assets/profile1.webp") {
        super(new Point2D(0,-70), game);
        // this.sprite = new Sprite(profileImage, new Vector2D(30,30), false, true, true);
        // this.sprite.glow = null;
    }
}