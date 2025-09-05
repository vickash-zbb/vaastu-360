import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardSimple() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Dashboard Test
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Test Card 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This is a test dashboard component.
              </p>
              <Button className="mt-4">Test Button</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Card 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                If you can see this, routing is working.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Card 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Dashboard is accessible at /dashboard
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
