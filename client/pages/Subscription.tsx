import React from 'react';

export default function Subscription() {
  return (
    <section id="pricing" className="choose-plan-section py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="plan-section-header text-center mb-12">
          <h2 className="plan-main-title text-4xl font-bold text-gray-800 mb-4">Choose Your Plan</h2>
          <p className="plan-subtitle text-lg text-gray-600 max-w-2xl mx-auto">
            Start with Bronze for free and upgrade to premium features. Cancel anytime, no setup fees - your satisfaction is guaranteed.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="plan-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Bronze Plan */}
          <div className="plan-card bronze-plan bg-white rounded-lg shadow-lg p-6 relative border-2 border-gray-200">
            <div className="plan-badge free-badge absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Free
            </div>
            <div className="plan-content">
              <h3 className="plan-title text-2xl font-bold text-center mb-4 text-gray-800">Bronze</h3>
              <div className="plan-pricing text-center mb-4">
                <span className="plan-currency text-2xl font-bold text-gray-600">₹</span>
                <span className="plan-amount text-4xl font-bold text-gray-800">0</span>
                <span className="plan-period text-lg text-gray-600">/1 Week Free</span>
              </div>
              <p className="plan-desc text-center text-gray-600 mb-6">Perfect for small spaces</p>

              <div className="plan-features-list space-y-3 mb-6">
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Area (SFT)</span>
                  <span className="feature-value font-semibold">&lt; 1000</span>
                </div>
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Floors</span>
                  <span className="feature-value font-semibold">1</span>
                </div>
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Properties</span>
                  <span className="feature-value font-semibold">1</span>
                </div>
                <div className="feature-row included flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="feature-text">Vastu Compliance Report</span>
                </div>
              </div>

              <button className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                Start Free
              </button>
            </div>
          </div>

          {/* Silver Plan */}
          <div className="plan-card silver-plan bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
            <div className="plan-content">
              <h3 className="plan-title text-2xl font-bold text-center mb-4 text-gray-800">Silver</h3>
              <div className="plan-pricing text-center mb-4">
                <span className="plan-currency text-2xl font-bold text-gray-600">$</span>
                <span className="plan-amount text-4xl font-bold text-gray-800">45</span>
                <span className="plan-period text-lg text-gray-600">/1 Week</span>
              </div>
              <p className="plan-desc text-center text-gray-600 mb-6">For standard properties</p>

              <div className="plan-features-list space-y-3 mb-6">
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Area (SFT)</span>
                  <span className="feature-value font-semibold">&gt; 1000</span>
                </div>
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Floors</span>
                  <span className="feature-value font-semibold">3</span>
                </div>
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Properties</span>
                  <span className="feature-value font-semibold">1</span>
                </div>
                <div className="feature-row included flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="feature-text">Vastu Compliance Report</span>
                </div>
              </div>

              <button className="btn btn-outline-primary w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                Join Now
              </button>
            </div>
          </div>

          {/* Gold Plan (Most Popular) */}
          <div className="plan-card gold-plan most-popular bg-white rounded-lg shadow-lg p-6 relative border-2 border-yellow-400">
            <div className="popular-label absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <div className="plan-content">
              <h3 className="plan-title text-2xl font-bold text-center mb-4 text-gray-800">Gold</h3>
              <div className="plan-pricing text-center mb-4">
                <span className="plan-currency text-2xl font-bold text-gray-600">$</span>
                <span className="plan-amount text-4xl font-bold text-gray-800">99</span>
                <span className="plan-period text-lg text-gray-600">/1 month</span>
              </div>
              <p className="plan-desc text-center text-gray-600 mb-6">Best value for multiple properties</p>

              <div className="plan-features-list space-y-3 mb-6">
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Area (SFT)</span>
                  <span className="feature-value font-semibold">&gt; 1000</span>
                </div>
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Floors</span>
                  <span className="feature-value font-semibold">3</span>
                </div>
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Properties</span>
                  <span className="feature-value font-semibold">3</span>
                </div>
                <div className="feature-row included flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="feature-text">Vastu Compliance Report</span>
                </div>
              </div>

              <button className="btn btn-outline-primary w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                Join Now
              </button>
            </div>
          </div>

          {/* Platinum Plan */}
          <div className="plan-card platinum-plan bg-white rounded-lg shadow-lg p-6 relative border-2 border-purple-400">
            <div className="plan-badge premium-badge absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Premium
            </div>
            <div className="plan-content">
              <h3 className="plan-title text-2xl font-bold text-center mb-4 text-gray-800">Platinum</h3>
              <div className="plan-pricing text-center mb-4">
                <span className="plan-currency text-2xl font-bold text-gray-600">$</span>
                <span className="plan-amount text-4xl font-bold text-gray-800">299</span>
                <span className="plan-period text-lg text-gray-600">/2 month</span>
              </div>
              <p className="plan-desc text-center text-gray-600 mb-6">Premium with full remedies</p>

              <div className="plan-features-list space-y-3 mb-6">
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Area (SFT)</span>
                  <span className="feature-value font-semibold">&gt; 1000</span>
                </div>
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Floors</span>
                  <span className="feature-value font-semibold">3</span>
                </div>
                <div className="feature-row flex justify-between items-center">
                  <span className="feature-label text-gray-600">Properties</span>
                  <span className="feature-value font-semibold">10</span>
                </div>
                <div className="feature-row included flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="feature-text">Vastu Compliance Report</span>
                </div>
                <div className="feature-row included flex items-center text-green-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="feature-text">Remedies for Vastu Dosha</span>
                </div>
              </div>

              <button className="btn btn-outline-primary w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Guarantee Section */}
        <div className="plan-guarantee text-center mt-12">
          <div className="guarantee-items flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="guarantee-item flex items-center text-green-600">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>30-day money-back guarantee</span>
            </div>
            <div className="guarantee-item flex items-center text-green-600">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
