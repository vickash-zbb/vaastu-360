import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Headline animation from left
    setTimeout(() => {
      if (headlineRef.current) {
        headlineRef.current.style.opacity = "1";
        headlineRef.current.style.transform = "translateX(0)";
      }
    }, 200);

    // Subheadline animation from right
    setTimeout(() => {
      if (subheadlineRef.current) {
        subheadlineRef.current.style.opacity = "1";
        subheadlineRef.current.style.transform = "translateX(0)";
      }
    }, 400);

    // Buttons animation from bottom
    setTimeout(() => {
      if (buttonsRef.current) {
        buttonsRef.current.style.opacity = "1";
        buttonsRef.current.style.transform = "translateY(0)";
      }
    }, 600);

    // Trust indicators animation from left
    setTimeout(() => {
      if (trustRef.current) {
        trustRef.current.style.opacity = "1";
        trustRef.current.style.transform = "translateX(0)";
      }
    }, 800);

    // Social proof animation from right
    setTimeout(() => {
      if (socialRef.current) {
        socialRef.current.style.opacity = "1";
        socialRef.current.style.transform = "translateX(0)";
      }
    }, 1000);
  }, []);

  return (
    <section className="min-h-screen bg-white flex items-center py-16 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            {/* Main Headline */}
            <div className="space-y-4">
              <h1
                ref={headlineRef}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight transition-all duration-1000 ease-out opacity-0 transform -translate-x-8"
              >
                AI-Powered Vaastu
                <span className="block text-3xl md:text-4xl lg:text-5xl text-primary mt-2">
                  Analysis for Modern Spaces
                </span>
              </h1>
              <p
                ref={subheadlineRef}
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ease-out opacity-0 transform translate-x-8"
              >
                Transform your space with AI-driven Vaastu insights. Upload your
                floor plan and get instant analysis with personalized
                recommendations tailored to your unique space.
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4 transition-all duration-1000 ease-out opacity-0 transform translate-y-8"
            >
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-[#110c35] hover:bg-[#0f0a2e] text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Free Analysis →
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div
              ref={trustRef}
              className="flex flex-wrap justify-center gap-8 pt-8 transition-all duration-1000 ease-out opacity-0 transform -translate-x-8"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#110c35] text-lg">✓</span>
                <span className="text-gray-700 font-medium">Free Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#110c35] text-lg">✓</span>
                <span className="text-gray-700 font-medium">
                  Secure & Private
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#110c35] text-lg">✓</span>
                <span className="text-gray-700 font-medium">
                  Instant Results
                </span>
              </div>
            </div>

            {/* Social Proof */}
            <div
              ref={socialRef}
              className="pt-12 border-t border-gray-200 max-w-md mx-auto transition-all duration-1000 ease-out opacity-0 transform translate-x-8"
            >
              <p className="text-sm text-gray-500 mb-6 font-medium">
                Trusted by professionals worldwide
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    10,000+
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-xs text-gray-500 mt-1">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    50,000+
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Analyses Done
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
