import { Point2D, Vector2D } from '../Coordinates.js';
import { GameObject } from './GameObject.js';
export class Timer extends GameObject {
    startTime;
    duration;
    callback;
    triggered = false;
    constructor(game, durationSeconds, callback) {
        super(new Point2D(0, 0), game);
        this.startTime = performance.now();
        this.duration = durationSeconds * 1000;
        this.callback = callback;
    }
    update() {
        if (!this.triggered && (performance.now() - this.startTime) >= this.duration) {
            this.triggered = true;
            this.callback();
        }
    }
}
//# sourceMappingURL=Timer.js.map