import React from "react";

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Homeowner",
      avatar: "PS",
      rating: 5,
      text: "Vaastu360 completely transformed how I approach home design. The AI analysis was spot-on and saved me thousands in renovation costs.",
      location: "Mumbai, India",
    },
    {
      name: "Rajesh Kumar",
      role: "Architect",
      avatar: "RK",
      rating: 5,
      text: "As an architect, I'm impressed by the accuracy and depth of analysis. It's become an essential tool in my design process.",
      location: "Delhi, India",
    },
    {
      name: "Anita Patel",
      role: "Interior Designer",
      avatar: "AP",
      rating: 5,
      text: "The personalized remedies and energy mapping features are incredible. My clients love the detailed insights and recommendations.",
      location: "Ahmedabad, India",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`text-yellow-400 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their spaces
            with Vaastu360's AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {testimonial.rating}.0
                </span>
              </div>

              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10,000+", label: "Happy Users", icon: "people" },
            { number: "50,000+", label: "Analyses Done", icon: "analytics" },
            { number: "4.9/5", label: "Average Rating", icon: "star" },
            { number: "24/7", label: "AI Support", icon: "support" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="material-icons-outlined text-xl text-green-600">
                  {stat.icon}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
