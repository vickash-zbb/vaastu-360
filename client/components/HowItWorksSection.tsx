import React from "react";

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Your Floor Plan",
      description:
        "Drag and drop your floor plan image or PDF. Our system supports all common formats.",
      icon: "upload_file",
    },
    {
      number: "02",
      title: "AI Room Detection",
      description:
        "Our advanced AI automatically identifies rooms, doors, windows, and structural elements.",
      icon: "psychology",
    },
    {
      number: "03",
      title: "Get Instant Report",
      description:
        "Receive a comprehensive Vaastu analysis with personalized recommendations and energy mapping.",
      icon: "analytics",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your space with AI-powered Vaastu analysis in three simple
            steps - from upload to instant insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-[#110c35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-icons-outlined text-3xl text-[#110c35]">
                  {step.icon}
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-300 mb-4">
                {step.number}
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
