'use client';

import { useState, useEffect, useCallback } from 'react';
import { DeviceOrientation } from '@/app/types';

export const useDeviceOrientation = (isActive: boolean) => {
  const [orientation, setOrientation] = useState<DeviceOrientation>({
    alpha: null,
    beta: null,
    gamma: null,
    absolute: false,
  });
  const [needsPermission, setNeedsPermission] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Request permission (iOS 13+)
  const requestPermission = useCallback(async () => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission();
        if (permission === 'granted') {
          setPermissionGranted(true);
          setNeedsPermission(false);
        } else {
          setError('Device orientation permission denied');
        }
      } catch (err) {
        setError('Failed to request orientation permission');
        console.error(err);
      }
    } else {
      // Permission not needed (non-iOS or older iOS)
      setPermissionGranted(true);
      setNeedsPermission(false);
    }
  }, []);

  // Check if permission is needed
  useEffect(() => {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      setNeedsPermission(true);
    } else {
      setPermissionGranted(true);
    }
  }, []);

  // Listen to orientation events
  useEffect(() => {
    if (!isActive || !permissionGranted) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      setOrientation({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma,
        absolute: event.absolute,
      });
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isActive, permissionGranted]);

  // Calculate compass heading (0-360)
  const getCompassHeading = useCallback((): number | null => {
    if (orientation.alpha === null) return null;

    // Normalize to 0-360
    let heading = orientation.alpha;

    // Adjust for screen orientation
    if (window.screen?.orientation?.angle) {
      heading = (heading + window.screen.orientation.angle) % 360;
    }

    return heading;
  }, [orientation]);

  return {
    orientation,
    compassHeading: getCompassHeading(),
    needsPermission,
    permissionGranted,
    error,
    requestPermission,
  };
};
