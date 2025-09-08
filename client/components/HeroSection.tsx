import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import MotionGifAnimation from './MotionGifAnimation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroRef.current) {
      // Parallax effect for background
      gsap.to('.hero-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Animate headline on load
      gsap.from('.hero-headline', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2
      });

      gsap.from('.hero-subheadline', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.4
      });

      gsap.from('.hero-ctas', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.6
      });
    }
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FDF6FC] to-[#F7EEF9] py-20">
      {/* Background Grid */}
      <div className="hero-bg absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-primary/20"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 ">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center min-h-[600px]">
          {/* Left Content */}
          <div className="text-center xl:text-left">
            <h1 className="hero-headline text-5xl md:text-7l xl:text-8l font-bold text-primary mb-8 leading-tight">
              AI-Powered Vaastu Analysis for Modern Spaces
            </h1>
            <p className="hero-subheadline text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl">
              Upload your floor plan. Our AI detects rooms, maps energy flow, and gives you instant Vaastu insights with personalized recommendations.
            </p>
            <div className="hero-ctas flex flex-col sm:flex-row gap-6 justify-center xl:justify-start">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-10 py-5 text-xl font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                Start Free Analysis
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-5 text-xl font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Right Animation - Optimized for MotionGifAnimation */}
          <div className="relative flex justify-center items-center border border-gray-300 p-4 overflow-hidden rounded-3xl shadow-2xl bg-white">
            <div className="relative w-full max-w-[800px] aspect-[12/7]">
              <MotionGifAnimation />
            </div>
            {/* Enhanced floating elements */}
            <div className="absolute top-16 right-16 w-24 h-24 bg-primary/20 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute bottom-16 left-16 w-20 h-20 bg-primary/30 rounded-full animate-bounce shadow-lg"></div>
            <div className="absolute top-1/2 right-12 w-16 h-16 bg-primary/15 rounded-lg animate-ping shadow-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
