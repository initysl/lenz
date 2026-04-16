// app/page.tsx
import Navbar from '@/app/components/UI/Navbar';
import Hero from '@/app/components/UI/Hero';
import Features from '@/app/components/UI/Features';
import ProductGrid from '@/app/components/UI/ProductGrid';
import Newsletter from '@/app/components/UI/Footer';

export default function Home() {
  return (
    <main className='min-h-screen bg-[#0A0A0A] text-white'>
      <Navbar />
      <div className='max-w-7xl mx-auto px-6'>
        <Hero />
        <Features /> {/* Integrated here */}
        <ProductGrid />
        <Newsletter />
      </div>
    </main>
  );
}
