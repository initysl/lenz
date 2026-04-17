export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 0;
  private detectionTimes: number[] = [];

  updateFrame(): void {
    this.frameCount++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
  }

  recordDetectionTime(time: number): void {
    this.detectionTimes.push(time);
    // Keep only last 30 measurements
    if (this.detectionTimes.length > 30) {
      this.detectionTimes.shift();
    }
  }

  getFPS(): number {
    return this.fps;
  }

  getAverageDetectionTime(): number {
    if (this.detectionTimes.length === 0) return 0;
    const sum = this.detectionTimes.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.detectionTimes.length);
  }

  getMetrics() {
    return {
      fps: this.fps,
      avgDetectionTime: this.getAverageDetectionTime(),
    };
  }
}
