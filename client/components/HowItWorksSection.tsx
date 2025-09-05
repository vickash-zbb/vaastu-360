import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      const steps = gsap.utils.toArray('.step-item');

      steps.forEach((step, index) => {
        gsap.from(step as Element, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: step as Element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Upload Your Floor Plan',
      description: 'Drag and drop your floor plan image or PDF. Our system supports all common formats.',
      icon: 'upload_file'
    },
    {
      number: '02',
      title: 'AI Room Detection',
      description: 'Our advanced AI automatically identifies rooms, doors, windows, and structural elements.',
      icon: 'psychology'
    },
    {
      number: '03',
      title: 'Get Instant Report',
      description: 'Receive a comprehensive Vaastu analysis with personalized recommendations and energy mapping.',
      icon: 'analytics'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white ">
      <div className="container max-w-7xl ">
        <div className="text-center mb-16 ">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your space with AI-powered Vaastu analysis in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-item relative group"
            >
              {/* Step Number */}
              <div className="text-6xl font-bold text-primary/20 mb-4 group-hover:text-primary/40 transition-colors duration-300">
                {step.number}
              </div>

              {/* Icon */}
              <div className="mb-6">
                <span className="material-icons-outlined text-5xl text-primary">
                  {step.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent transform -translate-x-6"></div>
              )}
            </div>
          ))}
        </div>

        {/* Animated Progress Bar */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '33%' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;