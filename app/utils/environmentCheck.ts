export const checkEnvironment = () => {
  const checks = {
    https:
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost',
    camera:
      'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    geolocation: 'geolocation' in navigator,
    localStorage: (() => {
      try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        return true;
      } catch {
        return false;
      }
    })(),
    webgl: (() => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') ||
            canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    })(),
  };

  return checks;
};

export const getEnvironmentWarnings = () => {
  const checks = checkEnvironment();
  const warnings: string[] = [];

  if (!checks.https) {
    warnings.push('HTTPS required for camera and geolocation access');
  }
  if (!checks.camera) {
    warnings.push('Camera API not supported');
  }
  if (!checks.geolocation) {
    warnings.push('Geolocation API not supported');
  }
  if (!checks.localStorage) {
    warnings.push('Local storage not available - caching disabled');
  }
  if (!checks.webgl) {
    warnings.push('WebGL not supported - performance may be degraded');
  }

  return warnings;
};
