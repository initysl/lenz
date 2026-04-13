export interface DetectedObject {
  id: string;
  class: string;
  score: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
  timestamp: number;
}

export interface GPSCoordinates {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface DeviceOrientation {
  alpha: number | null; // compass heading (0-360)
  beta: number | null; // front-back tilt
  gamma: number | null; // left-right tilt
  absolute: boolean;
}

export interface Place {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  distance?: number;
  bearing?: number;
  description?: string;
  source: 'osm' | 'wikidata' | 'cache';
}

export interface CameraPermissionState {
  state: 'prompt' | 'granted' | 'denied' | 'unsupported';
  error?: string;
}

export interface PerformanceMetrics {
  fps: number;
  detectionTime: number;
  objectCount: number;
}
