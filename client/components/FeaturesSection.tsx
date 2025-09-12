import React from "react";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: "architecture",
      title: "AI Room Detection",
      description:
        "Automatically identifies and analyzes all rooms in your floor plan with precision.",
    },
    {
      icon: "explore",
      title: "Directional Energy Mapping",
      description:
        "Maps energy flow according to traditional Vaastu principles and modern science.",
    },
    {
      icon: "assessment",
      title: "Compliance Reports",
      description:
        "Detailed reports showing compliance with Vaastu guidelines and improvement suggestions.",
    },
    {
      icon: "home",
      title: "Personalized Remedies",
      description:
        "Custom recommendations to enhance positive energy in your specific space.",
    },
    {
      icon: "search",
      title: "Floor Plan Insights",
      description:
        "Deep analysis of layout, proportions, and spatial relationships.",
    },
    {
      icon: "bolt",
      title: "Instant Analysis",
      description: "Get comprehensive Vaastu insights in seconds, not hours.",
    },
  ];

  return (
    <section className="py-24 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Everything you need for comprehensive Vaastu analysis powered by
            cutting-edge AI technology and ancient wisdom
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#110c35]/10 rounded-lg flex items-center justify-center mb-6">
                <span className="material-icons-outlined text-2xl text-[#110c35]">
                  {feature.icon}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-[#110c35]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons-outlined text-2xl text-[#110c35]">
                verified
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Scientifically Backed
            </h4>
            <p className="text-gray-600">
              Combining ancient Vaastu principles with modern research
            </p>
          </div>

          <div className="text-center bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons-outlined text-2xl text-blue-600">
                speed
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Lightning Fast
            </h4>
            <p className="text-gray-600">
              Get comprehensive analysis in under 30 seconds
            </p>
          </div>

          <div className="text-center bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-icons-outlined text-2xl text-purple-600">
                security
              </span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Privacy First
            </h4>
            <p className="text-gray-600">
              Your floor plans are processed securely and never stored
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
