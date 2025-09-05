import React from 'react';
import PricingSection from '../components/PricingSection';

export default function Subscription() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 max-w-lg mx-auto">
          <p className="text-gray-600 font-normal mb-3" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', lineHeight: '150%' }}>
            Choose Your Plan
          </p>
          <h1 className="text-black mb-3" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '45px', lineHeight: '52px', letterSpacing: '0', fontWeight: 'normal' }}>
            Subscription & Pricing
          </h1>
          <p className="text-black" style={{ fontFamily: 'Roboto, sans-serif', fontSize: '16px', lineHeight: '150%' }}>
            Start for free or unlock premium capabilities to get the most out of Vaastu 360
          </p>
        </div>

        <PricingSection />
      </div>
    </div>
  );
}
