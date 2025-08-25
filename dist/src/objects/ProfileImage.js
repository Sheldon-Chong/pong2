import { GameObject, Sprite, HitBox, Glow } from '../Index.js';
import { Point2D, Vector2D, interpolate, randomBetween } from '../Coordinates.js';
import { PongGame } from '../pong.js';
class ProfileImage extends GameObject {
    game;
    profileImage;
    constructor(game, profileImage = "assets/profile1.webp") {
        super(new Point2D(0, -70), game);
        this.game = game;
        this.profileImage = profileImage;
        // this.sprite = new Sprite(profileImage, new Vector2D(30,30), false, true, true);
        // this.sprite.glow = null;
    }
}
//# sourceMappingURL=ProfileImage.js.map