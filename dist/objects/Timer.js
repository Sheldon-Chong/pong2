export class Timer {
    startTime;
    duration;
    callback;
    triggered = false;
    constructor(durationSeconds, callback) {
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