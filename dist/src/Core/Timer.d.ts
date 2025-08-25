import type { PongGame } from '../pong.js';
import { GameObject } from './GameObject.js';
export declare class Timer extends GameObject {
    private startTime;
    private duration;
    private callback;
    private triggered;
    constructor(game: PongGame, durationSeconds: number, callback: () => void);
    update(): void;
}
//# sourceMappingURL=Timer.d.ts.map