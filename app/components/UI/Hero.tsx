import Image from 'next/image';

interface HeroProps {
  onLaunchCamera: () => void;
}

export default function Hero({ onLaunchCamera }: HeroProps) {
  return (
    <section className=' pb-20 grid grid-cols-12 gap-8'>
      {/* Left Content */}
      <div className='col-span-12 lg:col-span-8'>
        <h1 className='text-7xl font-bold leading-tight mb-8'>
          Meet the <br />
          <span className='gradient-text'>New Virtual Reality</span>
        </h1>
        <p className='text-zinc-400 text-lg md:text-xl max-w-2xl mb-12'>
          Discover the world around you <br />
          <span className=''>
            Point your camera at buildings, landmarks, and objects to get
            instant information with augmented reality overlays.
          </span>
        </p>

        <div className='flex flex-wrap gap-6 items-end'>
          <div className='relative w-80 h-48 rounded-3xl overflow-hidden group'>
            <Image
              src='/vr-headset.svg'
              alt='VR'
              width={40}
              height={40}
              className='object-cover w-full h-full'
            />
            <button
              onClick={onLaunchCamera}
              className='absolute bottom-4 right-4 bg-[#C5FF41] text-black p-4 rounded-2xl flex items-center gap-2 font-bold hover:scale-105 transition'
            >
              Get started <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Navigation Sidebar */}
      <div className='col-span-12 lg:col-span-4 flex flex-col justify-center items-end'>
        <div className='flex flex-col gap-6 text-right'>
          <span className='text-zinc-500 hover:text-white cursor-pointer transition'>
            World
          </span>
          <span className='text-white font-bold border-r-2 border-cyan-400 pr-4'>
            AR
          </span>
          <span className='text-zinc-500 hover:text-white cursor-pointer transition'>
            intelligence
          </span>
          <span className='text-zinc-500 hover:text-white cursor-pointer transition'>
            Information
          </span>
        </div>
      </div>
    </section>
  );
}
