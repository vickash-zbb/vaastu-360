import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const MotionGifAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<GSAPTimeline>();
  const [currentScene, setCurrentScene] = useState(0);

  const scenes = [
    { name: 'Upload', duration: 2 },
    { name: 'AI Scan', duration: 2.5 },
    { name: 'Report', duration: 2 },
    { name: 'Loop', duration: 1 }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create main timeline for the looping animation
    const mainTimeline = gsap.timeline({
      repeat: -1,
      yoyo: false,
      ease: "power2.inOut",
      onUpdate: () => {
        // Update scene indicator based on timeline progress
        const progress = mainTimeline.progress();
        const totalScenes = scenes.length;
        const currentSceneIndex = Math.floor(progress * totalScenes);
        setCurrentScene(currentSceneIndex);
      }
    });

    timelineRef.current = mainTimeline;

    // Scene 1: Upload (0-2s)
    mainTimeline
      .addLabel('upload')
      .fromTo('.upload-icon', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, 'upload')
      .fromTo('.upload-text', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3 }, 'upload+=0.3')
      .to('.upload-icon', { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1 }, 'upload+=0.8');

    // Scene 2: AI Scan (2-4.5s)
    mainTimeline
      .addLabel('scan', '+=0.5')
      .to('.upload-icon', { scale: 0.8, opacity: 0, duration: 0.3 }, 'scan')
      .to('.upload-text', { opacity: 0, duration: 0.3 }, 'scan')
      .fromTo('.floor-plan', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, 'scan+=0.2')
      .fromTo('.scan-line', { x: -200, opacity: 0 }, { x: 200, opacity: 1, duration: 1.5, ease: "power2.inOut" }, 'scan+=0.5')
      .fromTo('.ai-brain', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 'scan+=0.8')
      .to('.ai-brain', { scale: 1.2, duration: 0.3, yoyo: true, repeat: 2 }, 'scan+=1.2');

    // Scene 3: Report (4.5-6.5s)
    mainTimeline
      .addLabel('report', '+=0.5')
      .to('.floor-plan', { scale: 0.7, y: -30, duration: 0.5 }, 'report')
      .to('.scan-line', { opacity: 0, duration: 0.3 }, 'report')
      .to('.ai-brain', { opacity: 0, duration: 0.3 }, 'report')
      .fromTo('.report-card', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }, 'report+=0.2')
      .fromTo('.chart-bar', { scaleY: 0 }, { scaleY: 1, duration: 0.8, stagger: 0.1, ease: "bounce.out" }, 'report+=0.4')
      .fromTo('.checkmark', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }, 'report+=1.2');

    // Scene 4: Loop Reset (6.5-7.5s)
    mainTimeline
      .addLabel('reset', '+=0.5')
      .to('.report-card', { y: -50, opacity: 0, duration: 0.4 }, 'reset')
      .to('.chart-bar', { scaleY: 0, duration: 0.3 }, 'reset')
      .to('.checkmark', { scale: 0, opacity: 0, duration: 0.3 }, 'reset')
      .to('.floor-plan', { scale: 1, y: 0, duration: 0.5 }, 'reset+=0.2');

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[600px] h-[700px] bg-gradient-to-br from-[#FDF6FC] to-[#F7EEF9] overflow-hidden"
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 ">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-primary/20"></div>
          ))}
        </div>
      </div>

      {/* Scene Indicator */}
     

      {/* Upload Scene */}
      <div className="upload-icon absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center">
          <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl border-4 border-primary/10">
            <span className="material-icons-outlined text-6xl text-primary">cloud_upload</span>
          </div>
          <div className="upload-text text-primary text-3xl font-bold">Upload Floor Plan</div>
          <div className="text-primary/80 text-lg mt-2">Drag & drop your blueprint</div>
        </div>
      </div>

      {/* Floor Plan */}
      <div className="floor-plan absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0">
        <svg width="400" height="280" viewBox="0 0 400 280" className="drop-shadow-2xl">
          <rect x="30" y="30" width="340" height="220" fill="none" stroke="#421034" strokeWidth="4" rx="6"/>
          <line x1="170" y1="30" x2="170" y2="250" stroke="#421034" strokeWidth="3"/>
          <line x1="230" y1="30" x2="230" y2="250" stroke="#421034" strokeWidth="3"/>
          <line x1="30" y1="140" x2="370" y2="140" stroke="#421034" strokeWidth="3"/>
          <circle cx="100" cy="85" r="12" fill="#421034" opacity="0.4"/>
          <circle cx="300" cy="85" r="12" fill="#421034" opacity="0.4"/>
          <rect x="170" y="200" width="60" height="30" fill="none" stroke="#421034" strokeWidth="3"/>
          {/* Room labels */}
          <text x="100" y="200" textAnchor="middle" fill="#421034" fontSize="14" fontWeight="bold">Living</text>
          <text x="300" y="200" textAnchor="middle" fill="#421034" fontSize="14" fontWeight="bold">Kitchen</text>
          <text x="200" y="110" textAnchor="middle" fill="#421034" fontSize="14" fontWeight="bold">Bedroom</text>
        </svg>
      </div>

      {/* AI Scan Elements */}
      <div className="scan-line absolute top-1/2 left-1/2 transform -translate-x-full -translate-y-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 rounded-full"></div>
      <div className="ai-brain absolute top-32 right-32 opacity-0">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center shadow-lg">
          <span className="material-icons-outlined text-4xl text-primary">psychology</span>
        </div>
      </div>

      {/* Report Card */}
      <div className="report-card absolute bottom-32 left-1/2 transform -translate-x-1/2 opacity-0 bg-white rounded-xl shadow-2xl p-8 min-w-[500px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Vaastu Analysis Complete</h3>
          <div className="checkmark flex items-center text-green-600 opacity-0">
            <span className="material-icons-outlined mr-2 text-2xl">check_circle</span>
            <span className="text-lg font-medium">82% Score</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Energy Flow Chart */}
          <div className="text-center">
            <div className="relative h-20 mb-3">
              <div className="chart-bar absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 bg-green-500 rounded-t shadow-sm" style={{ height: '60%' }}></div>
              <div className="chart-bar absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-x-3 w-6 bg-blue-500 rounded-t shadow-sm" style={{ height: '80%' }}></div>
              <div className="chart-bar absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-x-3 w-6 bg-orange-500 rounded-t shadow-sm" style={{ height: '40%' }}></div>
            </div>
            <div className="text-sm text-gray-600 font-medium">Energy Flow</div>
          </div>

          {/* Room Balance */}
          <div className="text-center">
            <div className="relative h-20 mb-3">
              <div className="chart-bar absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 bg-primary rounded-t shadow-sm" style={{ height: '70%' }}></div>
              <div className="chart-bar absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-x-3 w-6 bg-purple-500 rounded-t shadow-sm" style={{ height: '50%' }}></div>
            </div>
            <div className="text-sm text-gray-600 font-medium">Room Balance</div>
          </div>

          {/* Overall Score */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="text-xl font-bold text-green-600">82</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">Overall Score</div>
          </div>
        </div>
      </div>

      {/* Brand Overlay */}
      <div className="absolute top-8 left-8 text-primary bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg">
        <div className="text-4xl font-bold mb-2">Vaastu360</div>
        <div className="text-lg opacity-80">AI-Powered Analysis</div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {scenes.map((scene, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentScene ? 'bg-primary' : 'bg-primary/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MotionGifAnimation;