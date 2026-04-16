export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Open App',
      description: 'Launch Lenz in your mobile browser.',
    },
    {
      step: '02',
      title: 'Point & Scan',
      description: 'Hold your phone in landscape mode.',
    },
    {
      step: '03',
      title: 'Get Insights',
      description: 'See real-time data overlays instantly.',
    },
  ];

  return (
    <section className='py-20'>
      <div className='bg-linear-to-br from-[#B4F1FF] via-[#E8FFB1] to-[#FFF6A2] rounded-[40px] p-8 md:p-12 text-black flex flex-col lg:flex-row justify-between items-center gap-10 md:gap-16'>
        {/* Left Content: Text - Full width on mobile, constrained on desktop */}
        <div className='max-w-full lg:max-w-xs text-center lg:text-left'>
          <h2 className='text-4xl font-black mb-4 uppercase tracking-tighter'>
            How it works
          </h2>
          <p className='text-sm font-medium opacity-70 mb-6'>
            Three simple steps to unlock augmented reality insights about your
            surroundings.
          </p>
          <button className='hidden lg:block font-bold underline text-sm uppercase'>
            Learn more
          </button>
        </div>

        {/* Right Content: The Grid - 1 column mobile, 3 columns desktop */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full lg:w-auto'>
          {steps.map((item) => (
            <div
              key={item.step}
              className='bg-white/40 p-6 md:p-8 rounded-4xl backdrop-blur-md w-full lg:w-56 text-center border border-white/20 flex flex-col items-center justify-center'
            >
              <div className='text-5xl md:text-6xl font-black text-black/10 mb-2 leading-none'>
                {item.step}
              </div>
              <p className='text-base font-black mb-2 uppercase tracking-tight'>
                {item.title}
              </p>
              <p className='text-xs font-medium opacity-70 leading-relaxed max-w-37.5'>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
