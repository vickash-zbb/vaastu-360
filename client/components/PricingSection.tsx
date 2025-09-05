import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (plan: any) => {
    if (plan.name === 'Bronze') {
      // Free trial - navigate to dashboard
      navigate('/dashboard');
    } else {
      // Subscription - navigate to payment page
      navigate('/payment', { state: { plan } });
    }
  };

  const plans = [
    {
      name: 'Bronze',
      price: '₹0',
      period: 'Free',
      description: 'Perfect for small spaces',
      highlights: {
        sft: '< 1000',
        floors: '1',
        properties: '1'
      },
      features: [
        'Vastu Compliance Report',
        'Remedies for Vastu Dosh: X'
      ],
      cta: 'Start Free',
      popular: false,
      badge: 'Free'
    },
    {
      name: 'Silver',
      price: '₹299',
      period: 'per month',
      description: 'For standard properties',
      highlights: {
        sft: '> 1000',
        floors: '3',
        properties: '1'
      },
      features: [
        'Vastu Compliance Report',
        'Remedies for Vastu Dosh: X'
      ],
      cta: 'Subscribe',
      popular: false,
      badge: null
    },
    {
      name: 'Gold',
      price: '₹599',
      period: 'per month',
      description: 'Best value for multiple properties',
      highlights: {
        sft: '> 1000',
        floors: '3',
        properties: '3'
      },
      features: [
        'Vastu Compliance Report',
        'Remedies for Vastu Dosh: X'
      ],
      cta: 'Subscribe',
      popular: true,
      badge: 'Most Popular'
    },
    {
      name: 'Platinum',
      price: '₹999',
      period: 'per month',
      description: 'Premium with full remedies',
      highlights: {
        sft: '> 1000',
        floors: '3',
        properties: '10'
      },
      features: [
        'Vastu Compliance Report',
        'Remedies for Vastu Dosh: ✔'
      ],
      cta: 'Subscribe',
      popular: false,
      badge: 'Premium'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with Bronze for free and upgrade to premium features. Cancel anytime, no setup fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-[#421034] shadow-lg' : ''
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-[#421034] text-white">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-[#421034] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-4">
                    <span className="text-4xl font-bold text-[#421034]">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period !== 'Free' ? `/${plan.period}` : plan.period}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                {/* Highlights Row */}
                <div className="mb-6 py-3 px-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                    <div className="flex items-center">
                      <span className="material-icons-outlined text-[#421034] mr-2 text-lg">straighten</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">SFT</span>
                    </div>
                    <span className="text-sm font-medium text-[#421034]">{plan.highlights.sft}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                    <div className="flex items-center">
                      <span className="material-icons-outlined text-[#421034] mr-2 text-lg">apartment</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Floors</span>
                    </div>
                    <span className="text-sm font-medium text-[#421034]">{plan.highlights.floors}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="material-icons-outlined text-[#421034] mr-2 text-lg">home_work</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wide">Properties</span>
                    </div>
                    <span className="text-sm font-medium text-[#421034]">{plan.highlights.properties}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      {feature.includes('✘') ? (
                        <span className="material-icons-outlined text-[#9E9E9E] mr-3 text-lg">cancel</span>
                      ) : (
                        <span className="material-icons-outlined text-[#4CAF50] mr-3 text-lg">check_circle</span>
                      )}
                      <span className="text-gray-700 text-base font-medium">{feature.replace(': ✘', '').replace(': ✔', '')}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  className={`w-full py-3 px-6 text-base font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
                    plan.name === 'Bronze'
                      ? 'bg-[#421034] hover:bg-[#2E0824] text-white border-0 hover:shadow-xl'
                      : 'border-2 border-[#421034] text-[#421034] hover:bg-[#421034] hover:text-white bg-transparent hover:shadow-lg'
                  }`}
                  style={{
                    color: plan.name === 'Bronze' ? 'white' : '#421034',
                    borderColor: '#421034'
                  }}
                  onMouseEnter={(e) => {
                    if (plan.name !== 'Bronze') {
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.backgroundColor = '#421034';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.name !== 'Bronze') {
                      e.currentTarget.style.color = '#421034';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                  onClick={() => handlePlanSelect(plan)}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="text-center mt-12">
          <p className="text-gray-600 flex items-center justify-center">
            <span className="material-icons-outlined text-green-500 mr-2">verified</span>
            30-day money-back guarantee • Monthly billing • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
