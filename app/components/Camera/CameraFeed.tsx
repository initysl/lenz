'use client';

import { useCamera } from '@/app/hooks/useCamera';
import { useEffect } from 'react';

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

  useEffect(() => {
    // Auto-start camera when component mounts
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

      {/* Loading Overlay */}
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/70 z-10'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
            <p className='text-white text-lg'>Initializing camera...</p>
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

      {/* Unsupported Browser */}
      {permissionState.state === 'unsupported' && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/90 z-10'>
          <div className='text-center px-6'>
            <p className='text-white text-lg'>{permissionState.error}</p>
          </div>
        </div>
      )}

      {/* Camera Controls */}
      {isStreamActive && (
        <div className='absolute bottom-8 left-0 right-0 flex justify-center z-20'>
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
        </div>
      )}

      {/* Camera Indicator */}
      {isStreamActive && (
        <div className='absolute top-4 left-4 z-20'>
          <div className='flex items-center gap-2 bg-red-600/80 backdrop-blur-sm px-3 py-2 rounded-full'>
            <div className='w-2 h-2 bg-white rounded-full animate-pulse'></div>
            <span className='text-white text-sm font-medium'>LIVE</span>
          </div>
        </div>
      )}
    </div>
  );
};
