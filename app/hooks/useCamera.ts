'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CameraPermissionState } from '@/app/types';

export const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const startRequestRef = useRef(0);

  const [permissionState, setPermissionState] = useState<CameraPermissionState>(
    {
      state: 'prompt',
    },
  );
  const [isLoading, setIsLoading] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>(
    'environment',
  );
  const [isStreamActive, setIsStreamActive] = useState(false);

  // Check if browser supports camera
  const checkSupport = useCallback(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setPermissionState({
        state: 'unsupported',
        error: 'Your browser does not support camera access',
      });
      return false;
    }
    return true;
  }, []);

  // Start camera stream
  const startCamera = useCallback(async () => {
    if (!checkSupport()) return;

    const requestId = ++startRequestRef.current;
    setIsLoading(true);

    try {
      // Stop existing stream if any
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (requestId !== startRequestRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        videoRef.current.srcObject = stream;

        try {
          await videoRef.current.play();
        } catch (error: any) {
          const wasInterrupted =
            error?.name === 'AbortError' &&
            requestId !== startRequestRef.current;

          if (wasInterrupted) {
            return;
          }

          throw error;
        }
      }

      setPermissionState({ state: 'granted' });
      setIsStreamActive(true);
    } catch (error: any) {
      console.error('Camera access error:', error);

      let errorMessage = 'Failed to access camera';

      if (error.name === 'NotAllowedError') {
        errorMessage =
          'Camera permission denied. Please enable camera access in your browser settings.';
        setPermissionState({ state: 'denied', error: errorMessage });
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'No camera found on this device';
        setPermissionState({ state: 'denied', error: errorMessage });
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Camera is already in use by another application';
        setPermissionState({ state: 'denied', error: errorMessage });
      } else {
        setPermissionState({ state: 'denied', error: errorMessage });
      }

      setIsStreamActive(false);
    } finally {
      setIsLoading(false);
    }
  }, [facingMode, checkSupport]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    startRequestRef.current++;

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }

    setIsStreamActive(false);
  }, []);

  // Flip camera (front/back)
  const flipCamera = useCallback(() => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }, []);

  // Auto-start on facing mode change
  useEffect(() => {
    if (permissionState.state === 'granted') {
      startCamera();
    }
  }, [facingMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    videoRef,
    permissionState,
    isLoading,
    isStreamActive,
    facingMode,
    startCamera,
    stopCamera,
    flipCamera,
  };
};
