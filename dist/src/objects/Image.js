import { GameObject, Sprite } from '../Index.js';
import { Point2D, Vector2D } from '../Coordinates.js';
import { PongGame, Team } from '../pong.js';
export class Image extends GameObject {
    constructor(game, pos, sprite) {
        super(pos, game);
        this.sprite = sprite;
    }
}
//# sourceMappingURL=Image.js.map