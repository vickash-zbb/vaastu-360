import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const InteractiveExplainer: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      // Parallax background
      gsap.to('.explainer-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Animate on scroll
      gsap.from('.explainer-content', {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.explainer-content',
          start: 'top 80%'
        }
      });
    }
  }, []);

  const steps = [
    {
      title: 'Upload Floor Plan',
      description: 'Drag and drop your floor plan',
      animation: 'upload'
    },
    {
      title: 'AI Processing',
      description: 'AI detects rooms and analyzes layout',
      animation: 'process'
    },
    {
      title: 'View Results',
      description: 'Get instant Vaastu insights',
      animation: 'results'
    }
  ];

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="explainer-bg absolute inset-0 opacity-5">
        <div className="grid grid-cols-6 grid-rows-6 h-full w-full">
          {Array.from({ length: 36 }).map((_, i) => (
            <div key={i} className="border border-primary/20"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our AI-powered Vaastu analysis workflow
          </p>
        </div>

        <div className="explainer-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Demo */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-2xl">
              {/* Mock App Interface */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Vaastu360 Analysis</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="space-y-4">
                  {currentStep === 0 && (
                    <div className="text-center py-12">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-icons-outlined text-4xl text-primary">upload_file</span>
                      </div>
                      <p className="text-gray-600">Drop your floor plan here</p>
                      <div className="mt-4 border-2 border-dashed border-primary/30 rounded-lg p-8">
                        <p className="text-sm text-gray-500">Supported: JPG, PNG, PDF</p>
                      </div>
                    </div>
                  )}

                  {currentStep === 1 && (
                    <div className="text-center py-12">
                      <div className="relative">
                        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                          <span className="material-icons-outlined text-4xl text-primary">psychology</span>
                        </div>
                        <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping"></div>
                      </div>
                      <p className="text-gray-600">AI is analyzing your floor plan...</p>
                      <div className="mt-4 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="material-icons-outlined text-xl text-green-600">check_circle</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Analysis Complete</p>
                            <p className="text-sm text-gray-600">Vaastu Score: 85/100</p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm font-medium text-blue-800">Energy Flow</p>
                          <p className="text-2xl font-bold text-blue-600">Good</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg">
                          <p className="text-sm font-medium text-orange-800">Room Balance</p>
                          <p className="text-2xl font-bold text-orange-600">Fair</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Step Controls */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${
                  currentStep === index
                    ? 'bg-primary/10 border-2 border-primary shadow-lg'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
                onClick={() => handleStepClick(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    currentStep === index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <span className="text-xl font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveExplainer;