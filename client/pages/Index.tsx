import React from 'react';
import HeroSection from '../components/HeroSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeaturesSection from '../components/FeaturesSection';
import InteractiveExplainer from '../components/InteractiveExplainer';
import TestimonialsSection from '../components/TestimonialsSection';
import PricingSection from '../components/PricingSection';
import FinalCTASection from '../components/FinalCTASection';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <InteractiveExplainer />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTASection />
    </div>
  );
};

export default Index;