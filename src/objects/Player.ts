import { GameObject, Sprite, HitBox, Glow} from '../Index.js'
import { Point2D, Vector2D, interpolate, randomBetween } from '../Coordinates.js'
import { PongGame } from '../pong.js'

export class Player {
    name: string = "";
    profileImage: string = "";
    skin: Sprite | null = null;

    constructor(params: Partial<Player> = {}) {
        Object.assign(this, params);
    }
}