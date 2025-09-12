import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  const handlePlanSelect = (plan: any) => {
    if (plan.name === "Bronze") {
      navigate("/dashboard");
    } else {
      navigate("/payment", { state: { plan } });
    }
  };

  const plans = [
    {
      name: "Bronze",
      price: "₹0",
      period: "1 Week Free",
      description: "Perfect for small spaces",
      highlights: {
        sft: "< 1000",
        floors: "1",
        properties: "1",
      },
      features: ["Vastu Compliance Report"],
      cta: "Start Free",
      popular: false,
      badge: "Free",
    },
    {
      name: "Silver",
      price: "$45",
      period: "1 Week",
      description: "For standard properties",
      highlights: {
        sft: "> 1000",
        floors: "3",
        properties: "1",
      },
      features: ["Vastu Compliance Report"],
      cta: "Join Now",
      popular: false,
      badge: null,
    },
    {
      name: "Gold",
      price: "$99",
      period: "1 month",
      description: "Best value for multiple properties",
      highlights: {
        sft: "> 1000",
        floors: "3",
        properties: "3",
      },
      features: ["Vastu Compliance Report"],
      cta: "Join Now",
      popular: true,
      badge: "Most Popular",
    },
    {
      name: "Platinum",
      price: "$299",
      period: "2 month",
      description: "Premium with full remedies",
      highlights: {
        sft: "> 1000",
        floors: "3",
        properties: "10",
      },
      features: ["Vastu Compliance Report", "Remedies for Vastu Dosha"],
      cta: "Join Now",
      popular: false,
      badge: "Premium",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with Bronze for free and upgrade to premium features. Cancel
            anytime, no setup fees - your satisfaction is guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative ${
                plan.popular ? "ring-2 ring-green-500" : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      plan.badge === "Most Popular"
                        ? "bg-green-500 text-white"
                        : plan.badge === "Free"
                          ? "bg-blue-500 text-white"
                          : "bg-purple-500 text-white"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2 text-sm">
                    {plan.period !== "Free" ? `/${plan.period}` : plan.period}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Area (SFT)</span>
                  <span className="font-medium text-gray-900">
                    {plan.highlights.sft}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Floors</span>
                  <span className="font-medium text-gray-900">
                    {plan.highlights.floors}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Properties</span>
                  <span className="font-medium text-gray-900">
                    {plan.highlights.properties}
                  </span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-2 px-4 text-sm font-semibold rounded-md ${
                  plan.name === "Bronze"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : plan.popular
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
                onClick={() => handlePlanSelect(plan)}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 max-w-md mx-auto">
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
