import { GameObject, Sprite, HitBox, Glow } from '../Index.js';
import { Point2D, Vector2D, interpolate, randomBetween } from '../Coordinates.js';
import { PongGame } from '../pong.js';
export class Player {
    name = "";
    profileImage = "";
    skin = null;
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
//# sourceMappingURL=Player.js.map