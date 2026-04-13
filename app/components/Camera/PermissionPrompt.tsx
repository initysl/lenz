'use client';

interface PermissionPromptProps {
  onAllow: () => void;
}

export const PermissionPrompt = ({ onAllow }: PermissionPromptProps) => {
  return (
    <div className='fixed inset-0 bg-linear-to-br from-blue-600 to-purple-700 flex items-center justify-center z-50'>
      <div className='text-center px-6 max-w-lg'>
        <div className='mb-8'>
          <div className='w-24 h-24 bg-white/20 backdrop-blur-md rounded-full mx-auto mb-6 flex items-center justify-center'>
            <svg
              className='w-12 h-12 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          </div>
          <h1 className='text-white text-4xl font-bold mb-4'>
            Welcome to Lenz
          </h1>
          <p className='text-white/90 text-lg mb-8'>
            Point your camera at buildings and landmarks to discover information
            instantly with AR overlays.
          </p>
        </div>

        <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8'>
          <h3 className='text-white font-semibold mb-4 flex items-center justify-center gap-2'>
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
                d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
              />
            </svg>
            We need your permission
          </h3>
          <ul className='text-white/80 text-sm space-y-2 text-left'>
            <li className='flex items-start gap-2'>
              <span className='text-green-400 mt-0.5'>✓</span>
              <span>Camera access to detect objects in real-time</span>
            </li>
            <li className='flex items-start gap-2'>
              <span className='text-green-400 mt-0.5'>✓</span>
              <span>Location access to identify nearby places</span>
            </li>
            <li className='flex items-start gap-2'>
              <span className='text-green-400 mt-0.5'>✓</span>
              <span>Your privacy is protected - no data is stored</span>
            </li>
          </ul>
        </div>

        <button
          onClick={onAllow}
          className='w-full bg-white hover:bg-gray-100 text-blue-600 font-bold text-lg px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105'
        >
          Launch Camera
        </button>

        <p className='text-white/60 text-xs mt-6'>
          By continuing, you agree to allow camera and location access
        </p>
      </div>
    </div>
  );
};
