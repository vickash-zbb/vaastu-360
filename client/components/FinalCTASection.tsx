import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const FinalCTASection: React.FC = () => {
  return (
    <section id="cta" className="py-20 bg-primary">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Bring Balance to Your Space with AI-Powered Vaastu
        </h2>
        <p className="text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
          Start free today — no credit card required. Transform your home or
          office with scientifically-backed Vaastu insights.
        </p>

        <div className="flex justify-center">
          <Link to="/subscription">
            <Button
              variant="inverse"
              size="lg"
              className="px-8 py-4 text-lg font-semibold rounded-2xl"
            >
              Get Started Free →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
