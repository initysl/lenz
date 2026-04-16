export default function Features() {
  return (
    <section className='py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
      <div>
        <h2 className='text-5xl font-bold mb-6 leading-tight'>
          Building your own <br />
          <span className='gradient-text'>world now</span>
        </h2>
        <p className='text-zinc-400 mb-8 max-w-md'>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </p>
        <button className='px-8 py-3 rounded-full border border-zinc-700 hover:bg-white hover:text-black transition-all font-medium'>
          START PLAYING
        </button>
      </div>

      <div className='relative'>
        {/* Main Feature Image with specialized rounding */}
        <div className='rounded-[60px] overflow-hidden border-8 border-zinc-900 shadow-2xl'>
          <img
            src='/vr-action.jpg'
            alt='VR Gameplay'
            className='w-full h-100 object-cover'
          />
        </div>
        {/* Floating Decorative Element (Small VR Headset) */}
        <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-[#C5FF41] rounded-full flex items-center justify-center p-4 border-8 border-[#0A0A0A]'>
          <img
            src='/headset-icon.png'
            alt='icon'
            className='w-full rotate-12'
          />
        </div>
      </div>
    </section>
  );
}
