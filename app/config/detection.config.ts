export const DETECTION_CONFIG = {
  MODEL_URL: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd',

  // Performance
  TARGET_FPS: 20,
  MIN_FPS: 10,
  DETECTION_INTERVAL: 100, // ms between detections

  // Filtering
  MIN_CONFIDENCE: 0.5,
  RELEVANT_CLASSES: [
    'person',
    'bicycle',
    'car',
    'motorcycle',
    'bus',
    'truck',
    'traffic light',
    'stop sign',
    'building', // Note: COCO-SSD doesn't have 'building', we'll handle this
  ],

  // Canvas styling
  COLORS: {
    person: '#FACC15', // yellow
    car: '#22D3EE', // cyan
    bicycle: '#A78BFA', // purple
    motorcycle: '#F472B6', // pink
    bus: '#34D399', // green
    truck: '#FB923C', // orange
    'traffic light': '#EF4444', // red
    'stop sign': '#DC2626', // dark red
    default: '#60A5FA', // blue
  },
};

export const GEOLOCATION_CONFIG = {
  // GPS settings
  HIGH_ACCURACY: true,
  TIMEOUT: 10000, // 10 seconds
  MAXIMUM_AGE: 5000, // 5 seconds
  UPDATE_INTERVAL: 3000, // Update every 3 seconds

  // Accuracy thresholds
  GOOD_ACCURACY: 20, // meters
  ACCEPTABLE_ACCURACY: 50, // meters
  POOR_ACCURACY: 100, // meters
};
