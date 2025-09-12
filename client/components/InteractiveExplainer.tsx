import React from "react";

const InteractiveExplainer: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience our AI-powered Vaastu analysis workflow with interactive
            demonstrations
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#110c35]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-icons-outlined text-3xl text-[#110c35]">
                  upload_file
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Upload Your Floor Plan
              </h3>
              <p className="text-gray-600 mb-6">
                Drag and drop your floor plan image or PDF. Our system supports
                all common formats.
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <p className="text-gray-500">
                  Drop your floor plan here or click to browse
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Supported: JPG, PNG, PDF
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveExplainer;
