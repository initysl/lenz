import { API_CONFIG } from '@/app/config/api.config';

export class CacheService {
  private static isSupported(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  static set(key: string, data: any, ttl?: number): void {
    if (!this.isSupported()) return;

    const item = {
      data,
      timestamp: Date.now(),
      ttl: ttl || API_CONFIG.CACHE_TTL,
    };

    try {
      localStorage.setItem(
        `${API_CONFIG.CACHE_PREFIX}${key}`,
        JSON.stringify(item),
      );
    } catch (error) {
      console.warn('Cache write failed:', error);
      // If storage is full, clear old entries
      this.clearExpired();
    }
  }

  static get<T>(key: string): T | null {
    if (!this.isSupported()) return null;

    try {
      const itemStr = localStorage.getItem(`${API_CONFIG.CACHE_PREFIX}${key}`);
      if (!itemStr) return null;

      const item = JSON.parse(itemStr);
      const now = Date.now();

      // Check if expired
      if (now - item.timestamp > item.ttl) {
        this.remove(key);
        return null;
      }

      return item.data as T;
    } catch (error) {
      console.warn('Cache read failed:', error);
      return null;
    }
  }

  static remove(key: string): void {
    if (!this.isSupported()) return;
    localStorage.removeItem(`${API_CONFIG.CACHE_PREFIX}${key}`);
  }

  static clearExpired(): void {
    if (!this.isSupported()) return;

    const now = Date.now();
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith(API_CONFIG.CACHE_PREFIX)) {
        try {
          const itemStr = localStorage.getItem(key);
          if (itemStr) {
            const item = JSON.parse(itemStr);
            if (now - item.timestamp > item.ttl) {
              localStorage.removeItem(key);
            }
          }
        } catch {
          // Remove corrupted entries
          localStorage.removeItem(key);
        }
      }
    });
  }

  static clearAll(): void {
    if (!this.isSupported()) return;

    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(API_CONFIG.CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  }

  static getCacheSize(): string {
    if (!this.isSupported()) return '0 KB';

    let size = 0;
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith(API_CONFIG.CACHE_PREFIX)) {
        size += localStorage.getItem(key)?.length || 0;
      }
    });

    return `${(size / 1024).toFixed(2)} KB`;
  }
}
