'use client';

import { useState, useEffect, useCallback } from 'react';
import { GPSCoordinates } from '@/app/types';
import { GEOLOCATION_CONFIG } from '@/app/config/detection.config';

export const useGeolocation = (isActive: boolean) => {
  const [location, setLocation] = useState<GPSCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissionState, setPermissionState] =
    useState<PermissionState | null>(null);

  const getAccuracyLevel = (
    accuracy: number,
  ): 'good' | 'acceptable' | 'poor' => {
    if (accuracy <= GEOLOCATION_CONFIG.GOOD_ACCURACY) return 'good';
    if (accuracy <= GEOLOCATION_CONFIG.ACCEPTABLE_ACCURACY) return 'acceptable';
    return 'poor';
  };

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    const coords: GPSCoordinates = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp,
    };

    setLocation(coords);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleError = useCallback((error: GeolocationPositionError) => {
    let errorMessage = 'Failed to get location';

    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage =
          'Location permission denied. Please enable location access.';
        setPermissionState('denied');
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information unavailable.';
        break;
      case error.TIMEOUT:
        errorMessage = 'Location request timed out.';
        break;
    }

    setError(errorMessage);
    setIsLoading(false);
  }, []);

  // Check permission state
  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionState(result.state);
        result.addEventListener('change', () => {
          setPermissionState(result.state);
        });
      });
    }
  }, []);

  // Watch position
  useEffect(() => {
    if (!isActive || !navigator.geolocation) {
      setError('Geolocation not supported');
      setIsLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: GEOLOCATION_CONFIG.HIGH_ACCURACY,
        timeout: GEOLOCATION_CONFIG.TIMEOUT,
        maximumAge: GEOLOCATION_CONFIG.MAXIMUM_AGE,
      },
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [isActive, handleSuccess, handleError]);

  return {
    location,
    error,
    isLoading,
    permissionState,
    accuracyLevel: location ? getAccuracyLevel(location.accuracy) : null,
  };
};
