'use client';

import { useState, useEffect } from 'react';

interface OnboardingTutorialProps {
  onComplete: () => void;
}

export const OnboardingTour = ({ onComplete }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('lenz_tutorial_completed');
    if (!hasSeenTutorial) {
      setTimeout(() => setShow(true), 1000);
    } else {
      onComplete();
    }
  }, [onComplete]);

  const steps = [
    {
      title: 'Point Your Camera',
      description:
        'Aim your camera at buildings, landmarks, or objects around you.',
      icon: '📱',
    },
    {
      title: 'AI Detection',
      description:
        'Our AI instantly identifies objects and nearby places in real-time.',
      icon: '🤖',
    },
    {
      title: 'Tap to Explore',
      description:
        'Tap on AR cards to see detailed information and get directions.',
      icon: '👆',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('lenz_tutorial_completed', 'true');
      setShow(false);
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem('lenz_tutorial_completed', 'true');
    setShow(false);
    onComplete();
  };

  if (!show) return null;

  const step = steps[currentStep];

  return (
    <div className='fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6'>
      <div className='max-w-md w-full text-center'>
        {/* Icon */}
        <div className='text-8xl mb-8 animate-bounce'>{step.icon}</div>

        {/* Content */}
        <h2 className='text-white text-3xl font-bold mb-4'>{step.title}</h2>
        <p className='text-gray-300 text-lg mb-8'>{step.description}</p>

        {/* Progress Dots */}
        <div className='flex justify-center gap-2 mb-8'>
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentStep ? 'bg-cyan-400 w-8' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className='flex gap-4'>
          <button
            onClick={handleSkip}
            className='flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition'
          >
            Skip
          </button>
          <button
            onClick={handleNext}
            className='flex-1 px-6 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition'
          >
            {currentStep === steps.length - 1 ? "Let's Go!" : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};
