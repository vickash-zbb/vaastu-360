import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const FinalCTASection: React.FC = () => {
  return (
    <section className="py-24 bg-[#110c35]">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bring Balance to Your Space with
            <span className="block text-3xl md:text-4xl text-white/90">
              AI-Powered Vaastu
            </span>
          </h2>
          <p className="text-white/90 mb-8 text-lg md:text-xl">
            Start free today — no credit card required. Transform your home or
            office with scientifically-backed Vaastu insights and personalized
            recommendations.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <span className="text-white">✓</span>
              <span className="text-white text-sm">Free Analysis</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <span className="text-white">✓</span>
              <span className="text-white text-sm">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <span className="text-white">✓</span>
              <span className="text-white text-sm">Instant Results</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-white text-[#110c35] hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg"
              >
                Get Started Free
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-[#110c35] px-8 py-3 text-lg font-semibold rounded-lg"
            >
              Watch Demo
            </Button>
          </div>

          <p className="text-white/80 mt-6 text-sm">
            Join 10,000+ users who have transformed their spaces
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
