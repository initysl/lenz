'use client';

import { Place } from '@/app/types';
import { spatialUtils } from '@/app/utils/spatialCalculations';

interface InfoCardExpandedProps {
  place: Place;
  onClose: () => void;
}

export const InfoCardExpanded = ({ place, onClose }: InfoCardExpandedProps) => {
  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className='fixed inset-0 z-50 flex items-end md:items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/80 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-linear-to-br from-gray-900 to-black rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto border border-white/20 shadow-2xl'>
        {/* Header */}
        <div className='sticky top-0 bg-black/80 backdrop-blur-md p-6 border-b border-white/10 z-10'>
          <div className='flex items-start justify-between'>
            <div className='flex-1'>
              <h2 className='text-2xl font-bold text-white mb-2'>
                {place.name}
              </h2>
              <p className='text-cyan-400 text-sm capitalize'>
                {place.category.replace(/_/g, ' ')}
              </p>
            </div>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-white transition'
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
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Description */}
          {place.description && (
            <div>
              <h3 className='text-white font-semibold mb-2'>About</h3>
              <p className='text-gray-300 text-sm leading-relaxed'>
                {place.description}
              </p>
            </div>
          )}

          {/* Location Info */}
          <div className='grid grid-cols-2 gap-4'>
            {place.distance !== undefined && (
              <div className='bg-white/5 rounded-xl p-4'>
                <p className='text-gray-400 text-xs mb-1'>Distance</p>
                <p className='text-white font-bold text-lg'>
                  {spatialUtils.formatDistance(place.distance)}
                </p>
              </div>
            )}

            {place.bearing !== undefined && (
              <div className='bg-white/5 rounded-xl p-4'>
                <p className='text-gray-400 text-xs mb-1'>Direction</p>
                <p className='text-white font-bold text-lg'>
                  {Math.round(place.bearing)}° (
                  {spatialUtils.getCardinalDirection(place.bearing)})
                </p>
              </div>
            )}
          </div>

          {/* Coordinates */}
          <div className='bg-white/5 rounded-xl p-4'>
            <p className='text-gray-400 text-xs mb-2'>Coordinates</p>
            <p className='text-white font-mono text-sm'>
              {place.latitude.toFixed(6)}, {place.longitude.toFixed(6)}
            </p>
          </div>

          {/* Source */}
          <div className='flex items-center gap-2 text-xs text-gray-500'>
            <span>Source:</span>
            <span className='uppercase font-mono'>{place.source}</span>
          </div>
        </div>

        {/* Actions */}
        <div className='sticky bottom-0 bg-black/80 backdrop-blur-md p-6 border-t border-white/10'>
          <div className='flex gap-3'>
            <button
              onClick={handleGetDirections}
              className='flex-1 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
                />
              </svg>
              Get Directions
            </button>
            <button
              onClick={onClose}
              className='px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
