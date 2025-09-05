import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FinalCTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      // Parallax background
      gsap.to('.cta-bg', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Animate content on scroll
      gsap.from('.cta-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.cta-content',
          start: 'top 80%'
        }
      });

      // Floating icons animation
      const icons = gsap.utils.toArray('.floating-icon');
      icons.forEach((icon, index) => {
        gsap.to(icon as Element, {
          y: 'random(-20, 20)',
          x: 'random(-10, 10)',
          rotation: 'random(-5, 5)',
          duration: 'random(3, 6)',
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.5
        });
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 overflow-hidden bg-primary">
      {/* Background Elements */}
      <div className="cta-bg absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-white/20"></div>
          ))}
        </div>
      </div>

      {/* Floating Icons */}
      <div className="floating-icon absolute top-20 left-20 opacity-20">
        <span className="material-icons-outlined text-4xl text-white">explore</span>
      </div>
      <div className="floating-icon absolute top-40 right-32 opacity-15">
        <span className="material-icons-outlined text-3xl text-white">home</span>
      </div>
      <div className="floating-icon absolute bottom-32 left-32 opacity-25">
        <span className="material-icons-outlined text-5xl text-white">architecture</span>
      </div>
      <div className="floating-icon absolute bottom-20 right-20 opacity-20">
        <span className="material-icons-outlined text-4xl text-white">lightbulb</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="cta-content text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6l font-bold text-white mb-6 leading-tight">
            Bring Balance to Your Space with AI-Powered Vaastu
          </h2>
          <p className=" text-white/90 mb-8 leading-relaxed">
            Start free today — no credit card required. Transform your home or office with scientifically-backed Vaastu insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Get Started Free →
            </Button>
            {/* <p className="text-white/80 text-sm">
              Join 10,000+ users • 30-day free trial • Cancel anytime
            </p> */}
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/70">
            <div className="flex items-center">
              <span className="material-icons-outlined mr-2">verified</span>
              <span>Trusted by Architects</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons-outlined mr-2">security</span>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons-outlined mr-2">support</span>
              <span>24/7 AI Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div> */}
    </section>
  );
};

export default FinalCTASection;