'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/UI/Navbar';
import Hero from '@/app/components/UI/Hero';
import Features from '@/app/components/UI/Features';
import HowItWorks from '@/app/components/UI/HowItWorks';
import ProductSection from './components/UI/ProductGrid';
import Footer from '@/app/components/UI/Footer';
import { CameraFeed } from '@/app/components/Camera/CameraFeed';
import { PermissionPrompt } from '@/app/components/Camera/PermissionPrompt';

export default function Home() {
  const [showCamera, setShowCamera] = useState(false);
  const [hasAcceptedPermissions, setHasAcceptedPermissions] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Camera experience
  if (showCamera && isMounted) {
    if (!hasAcceptedPermissions) {
      return (
        <PermissionPrompt onAllow={() => setHasAcceptedPermissions(true)} />
      );
    }
    return <CameraFeed />;
  }

  // Landing page
  return (
    <main className='min-h-screen bg-[#0A0A0A] text-white'>
      <Navbar />
      <div className='max-w-7xl mx-auto px-6'>
        <Hero onLaunchCamera={() => setShowCamera(true)} />
        <Features />
        <HowItWorks />
        <ProductSection />
        <Footer />
      </div>
    </main>
  );
}
