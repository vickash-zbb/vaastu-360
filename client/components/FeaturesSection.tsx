import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      const cards = gsap.utils.toArray('.feature-card');

      cards.forEach((card, index) => {
        gsap.from(card as Element, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card as Element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }
  }, []);

  const features = [
    {
      icon: 'architecture',
      title: 'AI Room Detection',
      description: 'Automatically identifies and analyzes all rooms in your floor plan with precision.'
    },
    {
      icon: 'explore',
      title: 'Directional Energy Mapping',
      description: 'Maps energy flow according to traditional Vaastu principles and modern science.'
    },
    {
      icon: 'assessment',
      title: 'Compliance Reports',
      description: 'Detailed reports showing compliance with Vaastu guidelines and improvement suggestions.'
    },
    {
      icon: 'home',
      title: 'Personalized Remedies',
      description: 'Custom recommendations to enhance positive energy in your specific space.'
    },
    {
      icon: 'search',
      title: 'Floor Plan Insights',
      description: 'Deep analysis of layout, proportions, and spatial relationships.'
    },
    {
      icon: 'bolt',
      title: 'Instant Analysis',
      description: 'Get comprehensive Vaastu insights in seconds, not hours.'
    }
  ];

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-gradient-to-br from-[#FDF6FC] to-[#F7EEF9]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for comprehensive Vaastu analysis powered by cutting-edge AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <span className="material-icons-outlined text-3xl text-primary">
                    {feature.icon}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
