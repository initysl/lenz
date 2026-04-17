'use client';

import { GPSCoordinates } from '@/app/types';

interface GPSAccuracyIndicatorProps {
  location: GPSCoordinates | null;
  accuracyLevel: 'good' | 'acceptable' | 'poor' | null;
}

export const GPSAccuracyIndicator = ({
  location,
  accuracyLevel,
}: GPSAccuracyIndicatorProps) => {
  if (!location || accuracyLevel === 'good') return null;

  const getMessage = () => {
    if (accuracyLevel === 'poor') {
      return 'GPS accuracy is poor. Move outdoors for better results.';
    }
    return 'GPS accuracy is acceptable. Results may vary.';
  };

  const getColor = () => {
    return accuracyLevel === 'poor' ? 'bg-red-500/90' : 'bg-yellow-500/90';
  };

  return (
    <div className='fixed bottom-24 left-4 right-4 z-30 flex justify-center'>
      <div
        className={`${getColor()} backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-xl max-w-sm text-sm`}
      >
        <svg
          className='w-4 h-4 shrink-0'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
          />
        </svg>
        <span>{getMessage()}</span>
      </div>
    </div>
  );
};
