const products = [
  { id: 1, name: 'Standalone VR', price: '$230', img: '/vr1.png' },
  { id: 2, name: 'Premium VR', price: '$235', img: '/vr2.png' },
];

export default function ProductGrid() {
  return (
    <section className='py-20'>
      <div className='bg-linear-to-br from-[#B4F1FF] via-[#E8FFB1] to-[#FFF6A2] rounded-[40px] p-12 text-black flex flex-col md:flex-row justify-between items-center gap-10'>
        <div className='max-w-xs'>
          <h2 className='text-4xl font-bold mb-4'>Shop VR products</h2>
          <p className='text-sm opacity-70 mb-6'>
            Explore our latest standalone hardware for immersive experiences.
          </p>
          <button className='flex items-center gap-2 font-bold underline'>
            View All →
          </button>
        </div>

        <div className='flex gap-8'>
          {products.map((product) => (
            <div
              key={product.id}
              className='bg-white/40 p-6 rounded-3xl backdrop-blur-md w-48 text-center'
            >
              <img
                src={product.img}
                alt={product.name}
                className='h-32 mx-auto object-contain mb-4'
              />
              <p className='text-sm font-bold'>{product.name}</p>
              <div className='flex justify-between items-center mt-4'>
                <span className='font-bold'>{product.price}</span>
                <button className='bg-black text-white text-xs px-3 py-1 rounded-full'>
                  BUY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
