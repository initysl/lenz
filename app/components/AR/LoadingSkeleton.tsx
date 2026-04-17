'use client';

export const LoadingSkeleton = () => {
  return (
    <div className='absolute top-24 left-4 right-4 z-20 space-y-3'>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className='bg-black/70 backdrop-blur-md rounded-2xl p-4 border border-white/20 animate-pulse'
        >
          <div className='flex items-start gap-3'>
            <div className='w-12 h-12 rounded-xl bg-white/20' />
            <div className='flex-1 space-y-2'>
              <div className='h-4 bg-white/20 rounded w-3/4' />
              <div className='h-3 bg-white/20 rounded w-1/2' />
              <div className='h-2 bg-white/20 rounded w-1/4' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
