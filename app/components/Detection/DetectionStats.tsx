'use client';

import { GPSCoordinates } from '@/app/types';
import { spatialUtils } from '@/app/utils/spatialCalculations';

interface DetectionStatsProps {
  fps: number;
  objectCount: number;
  location: GPSCoordinates | null;
  accuracyLevel: 'good' | 'acceptable' | 'poor' | null;
  compassHeading: number | null;
  gpsError: string | null;
}

export const DetectionStats = ({
  fps,
  objectCount,
  location,
  accuracyLevel,
  compassHeading,
  gpsError,
}: DetectionStatsProps) => {
  const getAccuracyColor = () => {
    switch (accuracyLevel) {
      case 'good':
        return 'text-green-400';
      case 'acceptable':
        return 'text-yellow-400';
      case 'poor':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className='absolute top-4 right-4 z-20 space-y-2'>
      {/* FPS Counter */}
      <div className='bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg'>
        <p className='text-white text-sm font-mono'>
          <span className='text-cyan-400'>{fps}</span> FPS
        </p>
      </div>

      {/* Object Count */}
      <div className='bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg'>
        <p className='text-white text-sm font-mono'>
          <span className='text-cyan-400'>{objectCount}</span> detected
        </p>
      </div>

      {/* GPS Info */}
      {location && !gpsError ? (
        <div className='bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg'>
          <p className='text-white text-xs font-mono mb-1'>
            📍 {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
          </p>
          <p className={`text-xs font-mono ${getAccuracyColor()}`}>
            ±{Math.round(location.accuracy)}m accuracy
          </p>
        </div>
      ) : gpsError ? (
        <div className='bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg'>
          <p className='text-red-400 text-xs'>GPS: {gpsError}</p>
        </div>
      ) : null}

      {/* Compass Heading */}
      {compassHeading !== null && (
        <div className='bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg'>
          <p className='text-white text-sm font-mono'>
            🧭 {Math.round(compassHeading)}° (
            {spatialUtils.getCardinalDirection(compassHeading)})
          </p>
        </div>
      )}
    </div>
  );
};
