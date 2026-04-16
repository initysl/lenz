'use client';

interface PermissionPromptProps {
  onAllow: () => void;
}

export const PermissionPrompt = ({ onAllow }: PermissionPromptProps) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='text-center px-6 max-w-lg'>
        <div className='mb-8'>
          <h1 className='text-white text-4xl font-bold mb-4'>
            Welcome to Lenz
          </h1>
          <p className='text-white/90 text-lg mb-8'>
            Point your camera at buildings and landmarks to discover information
            instantly with AR overlays.
          </p>
        </div>

        <div className='bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8'>
          <ul className='text-white/80 flex flex-col items-center text-sm space-y-2'>
            <li>Camera access to detect objects in real-time</li>
            <li>Location access to identify nearby places</li>
            <li>Your privacy is protected - no data is stored</li>
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
