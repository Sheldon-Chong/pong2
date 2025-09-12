import { GameObject } from './objects/GameObject';
import { Sprite } from './objects/Sprite';
import type { Player } from './game/Player';
import { Team } from './pong3';
export declare class Padel extends GameObject {
    team: string;
    player: Player;
    moveDownKey: string;
    moveUpKey: string;
    isMoving: boolean;
    sprite: Sprite;
    teamWins(team: Team): void;
    export(exportStatic?: boolean): Record<string, any>;
    constructor(params: Partial<Padel>);
}
//# sourceMappingURL=Padel.d.ts.map