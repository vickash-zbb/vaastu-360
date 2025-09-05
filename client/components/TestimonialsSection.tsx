import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      const testimonials = gsap.utils.toArray('.testimonial-card');

      testimonials.forEach((testimonial, index) => {
        gsap.from(testimonial as Element, {
          x: index % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: testimonial as Element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }
  }, []);

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Homeowner',
      avatar: 'PS',
      rating: 5,
      text: 'Vaastu360 completely transformed how I approach home design. The AI analysis was spot-on and saved me thousands in renovation costs.',
      location: 'Mumbai, India'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Architect',
      avatar: 'RK',
      rating: 5,
      text: 'As an architect, I\'m impressed by the accuracy and depth of analysis. It\'s become an essential tool in my design process.',
      location: 'Delhi, India'
    },
    {
      name: 'Anita Patel',
      role: 'Interior Designer',
      avatar: 'AP',
      rating: 5,
      text: 'The personalized remedies and energy mapping features are incredible. My clients love the detailed insights and recommendations.',
      location: 'Ahmedabad, India'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={`material-icons-outlined text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        star
      </span>
    ));
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-gradient-to-br from-[#FDF6FC] to-[#F7EEF9]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their spaces with Vaastu360
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Rating */}
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold text-lg">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">{testimonial.location}</p>
                </div>
              </div>

              {/* Decorative element */}
              <div className="absolute top-4 right-4 opacity-10">
                <span className="material-icons-outlined text-4xl text-primary">format_quote</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-gray-600">Happy Users</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50,000+</div>
            <div className="text-gray-600">Analyses Done</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600">AI Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
