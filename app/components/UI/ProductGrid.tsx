// components/ProductSection.tsx
import Image from 'next/image';

export default function ProductSection() {
  return (
    <section className='py-24'>
      <div className='relative group overflow-hidden rounded-[40px] p-12 w-full h-120 border-10  shadow-3xl bg-black'>
        <Image
          src='/lenz.png'
          alt='Smartphone running Lenz AR identifying NYU Hall and Tesla Model 3 in landscape'
          layout='fill'
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0'
        />
        <div className='absolute inset-x-0 bottom-0 p-6 z-20 bg-black/60 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-center'>
          <p className='text-sm flex items-center justify-center font-bold tracking-tight'>
            Immersive Context Active: {'[Tesla Model 3, NYU Hall]'}
          </p>
        </div>
      </div>
    </section>
  );
}
