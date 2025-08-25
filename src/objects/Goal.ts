import { GameObject } from '../Core/GameObject.js'
import { HitBox } from '../Core/HitBox.js'

import { Point2D, Vector2D } from '../Coordinates.js'
import { PongGame, Team } from '../pong.js'


function last<T>(array: T[]): T {
    return array[array.length - 1]!;
}

export class Goal extends GameObject {
    constructor(game: PongGame, public team: Team) {
        super(new Point2D(last(game.team2.players).position.x -200,0), game);
        this.position.x = last(team === Team.TEAM1 ? game.team1.players : game.team2.players).position.x + (team === Team.TEAM1 ? 200 : -200);
        this.hitbox = new HitBox(this, new Vector2D(20, 1000));
    }
}

