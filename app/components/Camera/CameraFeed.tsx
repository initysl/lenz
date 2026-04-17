'use client';

import { useCamera } from '@/app/hooks/useCamera';
import { useObjectDetection } from '@/app/hooks/useObjectDetection';
import { useGeolocation } from '@/app/hooks/useGeolocation';
import { useDeviceOrientation } from '@/app/hooks/useDeviceOrientation';
import { useEffect, useState } from 'react';
import { DetectionCanvas } from '@/app/components/Detection/DetectionCanvas';
import { DetectionStats } from '@/app/components/Detection/DetectionStats';
import { useSpatialMatching } from '@/app/hooks/useSpatialMatching';
import { AROverlay } from '@/app/components/AR/AROverlay';

export const CameraFeed = () => {
  const {
    videoRef,
    permissionState,
    isLoading,
    isStreamActive,
    facingMode,
    startCamera,
    flipCamera,
  } = useCamera();

  const { isModelLoading, detectedObjects, fps } = useObjectDetection(
    videoRef,
    isStreamActive,
  );

  const {
    location,
    error: gpsError,
    accuracyLevel,
  } = useGeolocation(isStreamActive);

  const {
    compassHeading,
    needsPermission: orientationNeedsPermission,
    requestPermission: requestOrientationPermission,
  } = useDeviceOrientation(isStreamActive);

  const { matchedPlaces } = useSpatialMatching(
    detectedObjects,
    location,
    compassHeading,
  );

  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div className='relative w-full h-screen bg-black overflow-hidden'>
      {/* Video Element */}
      <video
        ref={videoRef}
        className='absolute top-0 left-0 w-full h-full object-cover'
        playsInline
        muted
      />

      {/* Detection Canvas Overlay */}
      {isStreamActive && !isModelLoading && (
        <DetectionCanvas
          videoRef={videoRef}
          detectedObjects={detectedObjects}
        />
      )}

      {/* Loading Overlays */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/70 z-10'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
            <p className='text-white text-lg'>Initializing camera...</p>
          </div>
        </div>
      )}

      {isModelLoading && isStreamActive && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/70 z-10'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4'></div>
            <p className='text-white text-lg'>Loading AI model...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {permissionState.state === 'denied' && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/90 z-10'>
          <div className='text-center px-6 max-w-md'>
            <svg
              className='w-16 h-16 text-red-500 mx-auto mb-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              />
            </svg>
            <h2 className='text-white text-xl font-semibold mb-2'>
              Camera Access Required
            </h2>
            <p className='text-gray-300 mb-6'>{permissionState.error}</p>
            <button
              onClick={startCamera}
              className='bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors'
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Orientation Permission (iOS) */}
      {orientationNeedsPermission && isStreamActive && (
        <div className='absolute top-24 left-1/2 transform -translate-x-1/2 z-20 bg-black/80 backdrop-blur-md px-6 py-3 rounded-full'>
          <button
            onClick={requestOrientationPermission}
            className='text-white text-sm font-medium'
          >
            Enable Compass →
          </button>
        </div>
      )}

      {/* Stats Overlay */}
      {isStreamActive && !isModelLoading && showStats && (
        <DetectionStats
          fps={fps}
          objectCount={detectedObjects.length}
          location={location}
          accuracyLevel={accuracyLevel}
          compassHeading={compassHeading}
          gpsError={gpsError}
        />
      )}

      {/* AR Info Cards */}
      {isStreamActive && !isModelLoading && (
        <AROverlay matchedPlaces={matchedPlaces} />
      )}

      {/* Controls */}
      {isStreamActive && (
        <>
          {/* Camera Indicator */}
          <div className='absolute top-4 left-4 z-20'>
            <div className='flex items-center gap-2 bg-red-600/80 backdrop-blur-sm px-3 py-2 rounded-full'>
              <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
              <span className='text-white text-sm font-medium'>LIVE</span>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className='absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20'>
            <button
              onClick={flipCamera}
              className='bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full transition-all'
              aria-label='Flip camera'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
            </button>

            <button
              onClick={() => setShowStats(!showStats)}
              className='bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-4 rounded-full transition-all'
              aria-label='Toggle stats'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
