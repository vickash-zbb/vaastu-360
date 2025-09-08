import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CheckCircle, Home, Building, MapPin } from "lucide-react";

export default function SubscriptionUpgrade() {
  const availablePlans = [
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
      cta: "Current",
      popular: false,
      badge: "Current Plan",
      isCurrent: true,
    },
    {
      name: "Silver",
      price: "₹45",
      period: "1 Week",
      description: "For standard properties",
      highlights: {
        sft: "> 1000",
        floors: "3",
        properties: "1",
      },
      features: ["Vastu Compliance Report"],
      cta: "Upgrade",
      popular: false,
      badge: null,
      isCurrent: false,
    },
    {
      name: "Gold",
      price: "₹99",
      period: "1 Month",
      description: "Best value for multiple properties",
      highlights: {
        sft: "> 1000",
        floors: "3",
        properties: "3",
      },
      features: ["Vastu Compliance Report"],
      cta: "Upgrade",
      popular: true,
      badge: "Most Popular",
      isCurrent: false,
    },
    {
      name: "Platinum",
      price: "₹299",
      period: "2 Months",
      description: "Premium with full remedies",
      highlights: {
        sft: "> 1000",
        floors: "3",
        properties: "10",
      },
      features: ["Vastu Compliance Report", "Remedies for Vastu Dosha"],
      cta: "Upgrade",
      popular: false,
      badge: "Premium",
      isCurrent: false,
    },
  ];

  const handlePlanSelect = (plan: any) => {
    // Handle plan selection: integrate with your payment/checkout flow or update component state
    // For now, log the selected plan (replace with real behavior as needed)
    console.log("Selected plan:", plan);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Upgrade Your Plan
          </h2>
          <p className="text-muted-foreground">
            Choose the perfect plan for your Vastu analysis needs
          </p>
        </div>
      </div>

      {/* Available Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-10">
        {availablePlans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
              plan.popular ? "ring-2 ring-[#421034] shadow-lg" : ""
            } ${plan.isCurrent ? "opacity-75" : ""}`}
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
                <h3 className="text-xl font-bold text-[#421034] mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-4xl font-bold text-[#421034]">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {plan.price === "₹0" ? plan.period : `/${plan.period}`}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              {/* Highlights Row */}
              <div className="mb-6 py-3 px-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                  <div className="flex items-center">
                    <Home className="text-[#421034] mr-2 h-5 w-5" />
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      SFT
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#421034]">
                    {plan.highlights.sft}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                  <div className="flex items-center">
                    <Building className="text-[#421034] mr-2 h-5 w-5" />
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Floors
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#421034]">
                    {plan.highlights.floors}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="text-[#421034] mr-2 h-5 w-5" />
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      Properties
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#421034]">
                    {plan.highlights.properties}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="text-[#4CAF50] mr-3 h-5 w-5" />
                    <span className="text-gray-700 text-base font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                className={`w-full py-3 px-6 text-base font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
                  plan.isCurrent
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : plan.name === "Bronze"
                      ? "bg-[#421034] hover:bg-[#2E0824] text-white"
                      : "border-2 border-[#421034] text-[#421034] hover:bg-[#421034] hover:text-white bg-transparent"
                }`}
                disabled={plan.isCurrent}
                onClick={() => !plan.isCurrent && handlePlanSelect(plan)}
              >
                {plan.cta}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes
              take effect immediately.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Is there a free trial?</h4>
            <p className="text-sm text-muted-foreground">
              We offer a 14-day free trial for all plans. No credit card
              required to start.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              What payment methods do you accept?
            </h4>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards, PayPal, and bank transfers for
              annual plans.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
