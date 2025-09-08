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
import { Download } from "lucide-react";

export default function SubscriptionHistory() {
  const subscriptionHistory = [
    {
      id: "1",
      plan: "Premium Plan",
      status: "Active",
      startDate: "2024-01-15",
      endDate: "2024-12-15",
      amount: "$29.99",
      paymentMethod: "Credit Card ****1234",
      autoRenew: true,
    },
    {
      id: "2",
      plan: "Basic Plan",
      status: "Expired",
      startDate: "2023-01-15",
      endDate: "2024-01-15",
      amount: "$19.99",
      paymentMethod: "PayPal",
      autoRenew: false,
    },
    {
      id: "3",
      plan: "Free Trial",
      status: "Expired",
      startDate: "2022-12-01",
      endDate: "2023-01-01",
      amount: "$0.00",
      paymentMethod: "N/A",
      autoRenew: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Subscription History
          </h2>
          <p className="text-muted-foreground">
            View your subscription history and billing information
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Invoice
        </Button>
      </div>

      <div className="grid gap-4">
        {subscriptionHistory.map((subscription) => (
          <Card key={subscription.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{subscription.plan}</CardTitle>
                  <CardDescription>
                    {subscription.startDate} - {subscription.endDate}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      subscription.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {subscription.status}
                  </div>
                  <div className="text-lg font-semibold mt-1">
                    {subscription.amount}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-sm font-medium">Payment Method</Label>
                  <p className="text-sm text-muted-foreground">
                    {subscription.paymentMethod}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Auto Renewal</Label>
                  <p className="text-sm text-muted-foreground">
                    {subscription.autoRenew ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" size="sm">
                  View Invoice
                </Button>
                {subscription.status === "Active" && (
                  <Button variant="outline" size="sm">
                    Cancel Subscription
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Subscription Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label className="text-sm font-medium">Current Plan</Label>
              <p className="text-lg font-semibold">Premium Plan</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Next Billing Date</Label>
              <p className="text-lg font-semibold">Dec 15, 2024</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Monthly Cost</Label>
              <p className="text-lg font-semibold">$29.99</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
