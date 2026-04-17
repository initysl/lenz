'use client';

import { useState } from 'react';
import { Place } from '@/app/types';
import { InfoCard } from './InfoCard';
import { InfoCardExpanded } from './InfoCardExpanded';

interface AROverlayProps {
  matchedPlaces: (Place & { matchConfidence?: number })[];
}

export const AROverlay = ({ matchedPlaces }: AROverlayProps) => {
  const [expandedPlace, setExpandedPlace] = useState<Place | null>(null);

  if (matchedPlaces.length === 0) return null;

  return (
    <>
      {/* Info Cards */}
      <div className='absolute top-24 left-4 right-4 z-20 space-y-3'>
        {matchedPlaces.slice(0, 3).map((place) => (
          <InfoCard
            key={place.id}
            place={place}
            onExpand={() => setExpandedPlace(place)}
          />
        ))}

        {matchedPlaces.length > 3 && (
          <div className='text-center'>
            <span className='text-white/60 text-xs'>
              +{matchedPlaces.length - 3} more nearby
            </span>
          </div>
        )}
      </div>

      {/* Expanded Modal */}
      {expandedPlace && (
        <InfoCardExpanded
          place={expandedPlace}
          onClose={() => setExpandedPlace(null)}
        />
      )}
    </>
  );
};
