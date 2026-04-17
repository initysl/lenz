export class DeviceDetection {
  /**
   * Detect device performance tier
   */
  static getPerformanceTier(): 'high' | 'medium' | 'low' {
    // Check for device memory (if available)
    const memory = (navigator as any).deviceMemory;

    if (memory) {
      if (memory >= 8) return 'high';
      if (memory >= 4) return 'medium';
      return 'low';
    }

    // Fallback: check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 2;

    if (cores >= 8) return 'high';
    if (cores >= 4) return 'medium';
    return 'low';
  }

  /**
   * Check if device supports WebGL
   */
  static supportsWebGL(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch {
      return false;
    }
  }

  /**
   * Detect iOS device
   */
  static isIOS(): boolean {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  /**
   * Detect if on mobile
   */
  static isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }

  /**
   * Get recommended settings based on device
   */
  static getRecommendedSettings() {
    const tier = this.getPerformanceTier();
    const isMobile = this.isMobile();

    const settings = {
      high: {
        detectionFPS: 30,
        videoResolution: { width: 1280, height: 720 },
        searchRadius: 500,
      },
      medium: {
        detectionFPS: 20,
        videoResolution: { width: 1280, height: 720 },
        searchRadius: 300,
      },
      low: {
        detectionFPS: 15,
        videoResolution: { width: 640, height: 480 },
        searchRadius: 200,
      },
    };

    return settings[tier];
  }

  /**
   * Monitor battery status
   */
  static async getBatteryInfo(): Promise<{
    level: number;
    charging: boolean;
  } | null> {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as any).getBattery();
        return {
          level: battery.level,
          charging: battery.charging,
        };
      } catch {
        return null;
      }
    }
    return null;
  }
}
