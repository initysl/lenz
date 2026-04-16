export default function Hero() {
  return (
    <section className='pt-32 pb-20 grid grid-cols-12 gap-8'>
      {/* Left Content */}
      <div className='col-span-12 lg:col-span-8'>
        <h1 className='text-7xl font-bold leading-tight mb-8'>
          Meet the <br />
          <span className='gradient-text'>New Virtual Reality</span>
        </h1>
        <p className='text-zinc-400 text-lg md:text-xl max-w-2xl mb-12'>
          Discover the world around you <br />
          <span className='gradient-text'>
            Point your camera at buildings, landmarks, and objects to get
            instant information with augmented reality overlays.
          </span>
        </p>

        <div className='flex flex-wrap gap-6 items-end'>
          <div className='relative w-80 h-48 rounded-3xl overflow-hidden group'>
            <img
              src='/vr-headset-hero.jpg'
              alt='VR'
              className='object-cover w-full h-full'
            />
            <button className='absolute bottom-4 right-4 bg-[#C5FF41] text-black p-4 rounded-2xl flex items-center gap-2 font-bold hover:scale-105 transition'>
              Get started <span>→</span>
            </button>
          </div>

          <div className='flex gap-10 items-center bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800'>
            <div>
              <p className='text-3xl font-bold'>
                1K <span className='text-cyan-400 text-sm'>+</span>
              </p>
              <p className='text-xs text-zinc-400 uppercase'>Games Provided</p>
            </div>
            <div className='w-px h-10 bg-zinc-700' />
            <div>
              <p className='text-3xl font-bold'>
                30K <span className='text-cyan-400 text-sm'>+</span>
              </p>
              <p className='text-xs text-zinc-400 uppercase'>Players Online</p>
            </div>
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
