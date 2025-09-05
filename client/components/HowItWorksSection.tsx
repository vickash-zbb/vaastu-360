import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HowItWorksSection: React.FC = () => {
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  } as const;

  const item = {
    hidden: (i: number) => ({ opacity: 0, y: 24, x: i % 2 === 0 ? -32 : 32 }),
    show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  } as const;

  const [activeStep, setActiveStep] = useState<number>(-1);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      if (typeof detail === 'number') setActiveStep(detail);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('hero-step', handler as EventListener);
      return () => window.removeEventListener('hero-step', handler as EventListener);
    }
    return () => {};
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
    <motion.section
      id="how-it-works"
      className="py-20 bg-white "
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container max-w-7xl ">
        <div className="text-center mb-16 ">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your space with AI-powered Vaastu analysis in three simple steps
          </p>
        </div>

        <motion.div variants={container} className="space-y-16 lg:space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              custom={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* Text */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className={`mb-4 text-6xl font-bold ${activeStep === index ? 'text-primary/40' : 'text-primary/20'}`}>{step.number}</div>
                <div className="mb-6">
                  <span className="material-icons-outlined text-5xl text-primary">{step.icon}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>

              {/* Visual */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {index === 0 && (
                  <motion.div className="border-2 border-dashed border-primary/30 rounded-xl p-8 bg-white shadow-sm" whileHover={{ scale: 1.01 }}>
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="material-icons-outlined text-4xl text-primary">upload_file</span>
                    </div>
                    <p className="text-center text-gray-600">Drop your floor plan here</p>
                    <div className="mt-3 text-center text-xs text-gray-500">Supported: JPG, PNG, PDF</div>
                  </motion.div>
                )}

                {index === 1 && (
                  <div className="relative mx-auto bg-white rounded-lg border border-gray-200 shadow p-3 w-full max-w-[480px] h-[260px] overflow-hidden">
                    <svg viewBox="0 0 480 260" className="w-full h-full">
                      <rect x="10" y="10" width="460" height="240" rx="10" fill="none" stroke="#421034" strokeWidth="2" />
                      <line x1="240" y1="10" x2="240" y2="250" stroke="#421034" strokeWidth="1.5" />
                      <line x1="10" y1="130" x2="470" y2="130" stroke="#421034" strokeWidth="1.5" />
                      <rect x="25" y="25" width="190" height="90" fill="#42103422" stroke="#421034" strokeWidth="1" />
                      <rect x="265" y="25" width="190" height="90" fill="#42103422" stroke="#421034" strokeWidth="1" />
                      <rect x="25" y="145" width="190" height="90" fill="#42103422" stroke="#421034" strokeWidth="1" />
                      <rect x="265" y="145" width="190" height="90" fill="#42103422" stroke="#421034" strokeWidth="1" />
                    </svg>
                    <motion.div
                      className="absolute top-0 bottom-0 w-28 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                      initial={{ x: -160 }}
                      whileInView={{ x: 560 }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                )}

                {index === 2 && (
                  <div className="bg-white rounded-xl shadow p-6 max-w-[480px]">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">Vaastu Analysis Complete</h4>
                      <div className="flex items-center text-green-600">
                        <span className="material-icons-outlined mr-2 text-xl">check_circle</span>
                        <span className="text-sm font-medium">85% Score</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="relative h-16 mb-2">
                          <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 bg-green-500 rounded" initial={{ height: 0 }} whileInView={{ height: 48 }} transition={{ duration: 0.6 }} />
                        </div>
                        <div className="text-xs text-gray-600">Energy</div>
                      </div>
                      <div className="text-center">
                        <div className="relative h-16 mb-2">
                          <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 bg-blue-500 rounded" initial={{ height: 0 }} whileInView={{ height: 56 }} transition={{ duration: 0.6, delay: 0.1 }} />
                        </div>
                        <div className="text-xs text-gray-600">Balance</div>
                      </div>
                      <div className="text-center">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-lg font-bold text-green-600">85</span>
                        </div>
                        <div className="text-xs text-gray-600">Score</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Progress Bar */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;
