import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';

const InteractiveExplainer: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [detected, setDetected] = useState(0);

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

  useEffect(() => {
    let timers: number[] = [];
    const cycle = () => {
      setCurrentStep(0);
      timers.push(window.setTimeout(() => setCurrentStep(1), 2000));
      timers.push(window.setTimeout(() => setCurrentStep(2), 5000));
      timers.push(window.setTimeout(cycle, 7000));
    };
    cycle();
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    if (currentStep !== 1) { setDetected(0); return; }
    let count = 0;
    const id = window.setInterval(() => {
      count += 1;
      setDetected(Math.min(count, 6));
      if (count >= 6) window.clearInterval(id);
    }, 250);
    return () => window.clearInterval(id);
  }, [currentStep]);

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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience our AI-powered Vaastu analysis workflow
          </p>
        </motion.div>

        <motion.div
          className="explainer-content grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Interactive Demo */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
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
                <div className="space-y-4 min-h-[220px]">
                  <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.35 }}
                        className="text-center py-12"
                      >
                        <motion.div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4" whileHover={{ scale: 1.05 }}>
                          <span className="material-icons-outlined text-4xl text-primary">upload_file</span>
                        </motion.div>
                        <p className="text-gray-600">Drop your floor plan here</p>
                        <div className="mt-4 border-2 border-dashed border-primary/30 rounded-lg p-8">
                          <p className="text-sm text-gray-500">Supported: JPG, PNG, PDF</p>
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 1 && (
                      <motion.div
                        key="process"
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.35 }}
                        className="text-center py-12"
                      >
                        <div className="relative mx-auto mb-4 bg-white rounded-lg border border-gray-200 shadow p-3 w-full max-w-[360px] h-[200px] overflow-hidden">
                          <svg viewBox="0 0 360 200" className="w-full h-full">
                            <rect x="10" y="10" width="340" height="180" rx="8" fill="none" stroke="#421034" strokeWidth="2" />
                            <line x1="180" y1="10" x2="180" y2="190" stroke="#421034" strokeWidth="1.5" />
                            <line x1="10" y1="100" x2="350" y2="100" stroke="#421034" strokeWidth="1.5" />
                            <rect x="25" y="25" width="140" height="60" fill="#42103422" stroke="#421034" strokeWidth="1" />
                            <rect x="195" y="25" width="140" height="60" fill="#42103422" stroke="#421034" strokeWidth="1" />
                            <rect x="25" y="115" width="140" height="60" fill="#42103422" stroke="#421034" strokeWidth="1" />
                            <rect x="195" y="115" width="140" height="60" fill="#42103422" stroke="#421034" strokeWidth="1" />
                          </svg>
                          <motion.div
                            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                            initial={{ x: -120 }}
                            animate={{ x: 420 }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </div>
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <span className="material-icons-outlined text-primary">motion_photos_on</span>
                          <p className="text-gray-700">Detecting rooms...</p>
                        </div>
                        <div className="text-sm text-gray-600">Rooms detected: <span className="font-semibold text-primary">{detected}</span></div>
                        <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <motion.div className="bg-primary h-2 rounded-full" initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ duration: 1.2 }} />
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 12, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.98 }}
                        transition={{ duration: 0.35 }}
                        className="space-y-4"
                      >
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
                            <motion.p className="text-2xl font-bold text-blue-600" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>Good</motion.p>
                          </div>
                          <div className="p-4 bg-orange-50 rounded-lg">
                            <p className="text-sm font-medium text-orange-800">Room Balance</p>
                            <motion.p className="text-2xl font-bold text-orange-600" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>Fair</motion.p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step Controls */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${
                  currentStep === index
                    ? 'bg-primary/10 border-2 border-primary shadow-lg'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
                onClick={() => handleStepClick(index)}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep === index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <span className="text-xl font-bold">{index + 1}</span>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveExplainer;
