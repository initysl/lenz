'use client';

import { Place } from '@/app/types';
import { spatialUtils } from '@/app/utils/spatialCalculations';

interface InfoCardProps {
  place: Place & { matchConfidence?: number };
  onExpand: () => void;
}

export const InfoCard = ({ place, onExpand }: InfoCardProps) => {
  const getCategoryIcon = (category: string): string => {
    const iconMap: Record<string, string> = {
      university: '🎓',
      college: '🎓',
      school: '🏫',
      hospital: '🏥',
      clinic: '🏥',
      pharmacy: '💊',
      police: '🚔',
      fire_station: '🚒',
      townhall: '🏛️',
      monument: '🗿',
      museum: '🏛️',
      place_of_worship: '⛪',
      church: '⛪',
      mosque: '🕌',
      restaurant: '🍽️',
      cafe: '☕',
      hotel: '🏨',
      bank: '🏦',
      mall: '🛍️',
      park: '🌳',
      default: '📍',
    };

    return iconMap[category] || iconMap.default;
  };

  const getCategoryColor = (category: string): string => {
    const colorMap: Record<string, string> = {
      university: 'from-blue-500 to-cyan-500',
      hospital: 'from-red-500 to-pink-500',
      police: 'from-blue-600 to-blue-800',
      restaurant: 'from-orange-500 to-yellow-500',
      monument: 'from-purple-500 to-pink-500',
      default: 'from-cyan-500 to-blue-600',
    };

    return colorMap[category] || colorMap.default;
  };

  return (
    <div
      onClick={onExpand}
      className='bg-black/70 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:border-cyan-400 transition-all cursor-pointer hover:scale-105 transform max-w-xs'
    >
      <div className='flex items-start gap-3'>
        {/* Icon */}
        <div
          className={`w-12 h-12 rounded-xl bg-linear-to-br ${getCategoryColor(
            place.category,
          )} flex items-center justify-center text-2xl shrink-0`}
        >
          {getCategoryIcon(place.category)}
        </div>

        {/* Content */}
        <div className='flex-1 min-w-0'>
          <h3 className='text-white font-bold text-sm mb-1 truncate'>
            {place.name}
          </h3>
          <p className='text-cyan-400 text-xs capitalize mb-2'>
            {place.category.replace(/_/g, ' ')}
          </p>

          {/* Distance */}
          {place.distance !== undefined && (
            <div className='flex items-center gap-2 text-xs text-gray-300'>
              <svg
                className='w-3 h-3'
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
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
              <span>{spatialUtils.formatDistance(place.distance)}</span>
            </div>
          )}

          {/* Confidence (if available) */}
          {place.matchConfidence !== undefined && (
            <div className='mt-2 flex items-center gap-1'>
              <div className='flex-1 h-1 bg-white/20 rounded-full overflow-hidden'>
                <div
                  className='h-full bg-cyan-400'
                  style={{ width: `${place.matchConfidence}%` }}
                />
              </div>
              <span className='text-[10px] text-gray-400'>
                {Math.round(place.matchConfidence)}%
              </span>
            </div>
          )}
        </div>

        {/* Expand arrow */}
        <svg
          className='w-5 h-5 text-cyan-400 shrink-0'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 5l7 7-7 7'
          />
        </svg>
      </div>
    </div>
  );
};
