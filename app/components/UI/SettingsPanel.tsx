'use client';

import { useState } from 'react';
import { CacheService } from '@/app/services/cacheService';

interface SettingsPanelProps {
  onClose: () => void;
}

export const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  const [showBoxes, setShowBoxes] = useState(
    localStorage.getItem('lenz_show_boxes') !== 'false',
  );
  const [showStats, setShowStats] = useState(
    localStorage.getItem('lenz_show_stats') !== 'false',
  );

  const handleToggleBoxes = () => {
    const newValue = !showBoxes;
    setShowBoxes(newValue);
    localStorage.setItem('lenz_show_boxes', String(newValue));
  };

  const handleToggleStats = () => {
    const newValue = !showStats;
    setShowStats(newValue);
    localStorage.setItem('lenz_show_stats', String(newValue));
  };

  const handleClearCache = () => {
    if (
      confirm(
        'Clear all cached data? This will require re-downloading place information.',
      )
    ) {
      CacheService.clearAll();
      alert('Cache cleared successfully!');
    }
  };

  const handleResetTutorial = () => {
    localStorage.removeItem('lenz_tutorial_completed');
    alert('Tutorial reset! Reload the app to see it again.');
  };

  const cacheSize = CacheService.getCacheSize();

  return (
    <div className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4'>
      <div className='absolute inset-0' onClick={onClose} />

      <div className='relative bg-linear-to-br from-gray-900 to-black rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto border border-white/20 shadow-2xl'>
        {/* Header */}
        <div className='sticky top-0 bg-black/80 backdrop-blur-md p-6 border-b border-white/10 z-10'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-white'>Settings</h2>
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

        {/* Settings */}
        <div className='p-6 space-y-6'>
          {/* Display Settings */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Display</h3>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-gray-300'>Show Detection Boxes</span>
                <button
                  onClick={handleToggleBoxes}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    showBoxes ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      showBoxes ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-gray-300'>Show Stats Overlay</span>
                <button
                  onClick={handleToggleStats}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    showStats ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      showStats ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data & Storage */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Data & Storage</h3>
            <div className='bg-white/5 rounded-xl p-4 mb-4'>
              <p className='text-gray-400 text-sm mb-2'>Cache Size</p>
              <p className='text-white font-mono text-lg'>{cacheSize}</p>
            </div>
            <button
              onClick={handleClearCache}
              className='w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-medium py-3 rounded-xl transition'
            >
              Clear Cache
            </button>
          </div>

          {/* Tutorial */}
          <div>
            <h3 className='text-white font-semibold mb-4'>Help</h3>
            <button
              onClick={handleResetTutorial}
              className='w-full bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition'
            >
              Reset Tutorial
            </button>
          </div>

          {/* About */}
          <div>
            <h3 className='text-white font-semibold mb-4'>About</h3>
            <div className='bg-white/5 rounded-xl p-4 text-sm text-gray-400 space-y-2'>
              <p>
                <strong className='text-white'>Version:</strong> 1.0.0
              </p>
              <p>
                <strong className='text-white'>Data Sources:</strong>{' '}
                OpenStreetMap, WikiData
              </p>
              <p>
                <strong className='text-white'>AI Model:</strong> TensorFlow.js
                COCO-SSD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
