'use client';

import { useState, useEffect } from 'react';
import { DeviceDetection } from '@/app/utils/deviceDetection';

export const BatteryWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

  useEffect(() => {
    const checkBattery = async () => {
      const info = await DeviceDetection.getBatteryInfo();

      if (info && !info.charging && info.level < 0.2) {
        setBatteryLevel(Math.round(info.level * 100));
        setShowWarning(true);
      } else {
        setShowWarning(false);
      }
    };

    checkBattery();
    const interval = setInterval(checkBattery, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  if (!showWarning) return null;

  return (
    <div className='fixed bottom-24 left-1/2 transform -translate-x-1/2 z-30'>
      <div className='bg-orange-500/90 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-xl'>
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
            d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
          />
        </svg>
        <span className='font-medium text-sm'>
          Low battery ({batteryLevel}%) - AR features may drain battery
        </span>
      </div>
    </div>
  );
};
