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
import { CheckCircle } from "lucide-react";

export default function SubscriptionUpgrade() {
  const currentPlan = {
    name: "Gold Plan",
    price: 99,
    features: [
      "Complete Vastu Analysis Suite",
      "Advanced Energy Flow Visualization",
      "Custom Remedial Strategies",
      "24/7 Priority Support",
      "Bulk Property Analysis",
    ],
  };

  const availablePlans = [
    {
      id: "bronze",
      name: "Bronze Plan",
      price: 0,
      period: "1 Week Free",
      features: [
        "Up to 1,000 sq ft properties",
        "1 Level analysis",
        "1 Property analysis",
        "Vastu Compliance Report",
        "Remedies for Vastu Dosh",
      ],
      popular: false,
      current: false,
    },
    {
      id: "silver",
      name: "Silver Plan",
      price: 45,
      period: "1 Week",
      features: [
        "Over 1,000 sq ft properties",
        "3 Levels analysis",
        "1 Property analysis",
        "Vastu Compliance Report",
        "Remedies for Vastu Dosh",
        "Priority Email Support",
      ],
      popular: false,
      current: false,
    },
    {
      id: "gold",
      name: "Gold Plan",
      price: 99,
      period: "1 Month",
      features: [
        "Over 1,000 sq ft properties",
        "3 Levels analysis",
        "3 Properties analysis",
        "Vastu Compliance Report",
        "Remedies for Vastu Dosh",
        "24/7 Priority Support",
        "Bulk Property Analysis",
      ],
      popular: true,
      current: true,
    },
    {
      id: "platinum",
      name: "Platinum Plan",
      price: 299,
      period: "2 Months",
      features: [
        "Over 1,000 sq ft properties",
        "10 Levels analysis",
        "10 Properties analysis",
        "Vastu Compliance Report",
        "Remedies for Vastu Dosh",
        "Enterprise Vastu Intelligence Platform",
        "AI-Powered Remedial Design",
        "White-Label Reporting",
        "Dedicated Success Manager",
        "API Integration",
        "Advanced Analytics Dashboard",
      ],
      popular: false,
      current: false,
    },
  ];

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

      {/* Current Plan */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                Current Plan: {currentPlan.name}
              </CardTitle>
              <CardDescription>${currentPlan.price}/month</CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {availablePlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative ${plan.popular ? "border-blue-500 shadow-lg" : ""} ${plan.current ? "border-green-500" : ""}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-blue-500 text-white">Most Popular</Badge>
              </div>
            )}
            {plan.current && (
              <div className="absolute -top-3 right-4">
                <Badge className="bg-green-500 text-white">Current</Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">
                {plan.price === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  <>
                    ${plan.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{plan.period}
                    </span>
                  </>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full mt-6 ${plan.current ? "bg-gray-100 text-gray-500 hover:bg-gray-100" : "bg-blue-600 hover:bg-blue-700"}`}
                disabled={plan.current}
              >
                {plan.current
                  ? "✓ Current Plan"
                  : plan.price === 0
                    ? "Start Free Trial"
                    : "Upgrade Now"}
              </Button>
            </CardContent>
          </Card>
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
