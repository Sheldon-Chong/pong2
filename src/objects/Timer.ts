
export class Timer {
  private startTime: number;
  private duration: number;
  private callback: () => void;
  private triggered: boolean = false;

  constructor(durationSeconds: number, callback: () => void) {
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