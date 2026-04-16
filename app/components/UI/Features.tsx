// components/Features.tsx

export default function Features() {
  const featureData = [
    {
      title: 'Landmark Recognition',
      highlight: 'AI-Powered',
      description:
        'Identify famous landmarks, historical sites, and monuments instantly with AI-powered visual recognition.',
      image: '/landmark.jpg',
      icon: '🏛️',
      accent: 'bg-[#C5FF41]',
    },
    {
      title: 'Educational Insights',
      highlight: 'Learn more',
      description:
        'Discover universities, schools, hospitals, and government buildings with detailed information.',
      image: '/official.jpg',
      icon: '🎓',
      accent: 'bg-cyan-400',
    },
    {
      title: 'Object Detection',
      highlight: 'Real-time',
      description:
        'Real-time detection of vehicles, pedestrians, traffic signs, and other objects in your environment.',
      image: '/traffic.jpg',
      icon: '🚗',
      accent: 'bg-yellow-400',
    },
  ];

  return (
    <section id='features' className='py-20 flex flex-col gap-24'>
      {featureData.map((feature, index) => (
        <div
          key={index}
          className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'
        >
          {/* Text Content - spans 5 columns */}
          <div
            className={`lg:col-span-5 ${index % 2 !== 0 ? 'lg:order-2 lg:pl-12' : 'lg:pr-12'}`}
          >
            <h2 className='text-4xl font-bold mb-4 leading-tight'>
              {feature.title} <br />
              <span className='gradient-text'>{feature.highlight}</span>
            </h2>
            <p className='text-zinc-400 mb-6 text-sm leading-relaxed'>
              {feature.description}
            </p>
          </div>

          {/* Visual Content - spans 7 columns, shorter height */}
          <div
            className={`relative lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}
          >
            <div className='relative h-80 w-full rounded-[40px] overflow-hidden border-[6px] border-zinc-900 shadow-xl'>
              <img
                src={feature.image}
                alt={feature.title}
                className='w-full h-full object-cover'
              />
              {/* Optional: Dark overlay to make the image look more "integrated" */}
              <div className='absolute inset-0 bg-linear-to-t from-black/40 to-transparent' />
            </div>

            {/* Smaller Floating Icon */}
            <div
              className={`absolute -bottom-6 ${index % 2 === 0 ? '-left-6' : '-right-6'} w-24 h-24 ${feature.accent} rounded-full flex items-center justify-center border-[6px] border-[#0A0A0A] shadow-2xl z-10`}
            >
              <span className='text-3xl rotate-12'>{feature.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
