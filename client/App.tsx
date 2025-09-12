import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("https://assets9.lottiefiles.com/packages/lf20_Gbabwr.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <section className="bg-[#F5F5F5] py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Unlock the Secrets of Your Home's Energy
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Our AI-powered platform analyzes your floor plan to reveal hidden
              energy inefficiencies and provides personalized recommendations to
              save you money and improve your comfort.
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={() => navigate("/login")}
                className="bg-[#4A90E2] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Get Started
              </button>
              <button className="ml-4 bg-transparent text-[#4A90E2] font-bold py-3 px-6 rounded-lg border-2 border-[#4A90E2] hover:bg-[#4A90E2] hover:text-white transition duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{ width: "100%", height: "400px" }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <div className="bg-[#4A90E2] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            1
          </div>
          <h3 className="text-xl font-semibold mb-2">Upload Your Floor Plan</h3>
          <p className="text-gray-600">
            Simply upload a digital copy of your home's floor plan.
          </p>
        </div>
        <div>
          <div className="bg-[#4A90E2] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
          <p className="text-gray-600">
            Our AI scans and analyzes your layout for energy loss points.
          </p>
        </div>
        <div>
          <div className="bg-[#4A90E2] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2">Get Your Report</h3>
          <p className="text-gray-600">
            Receive a detailed report with actionable recommendations.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const FeaturesSection = () => (
  <section className="py-20 bg-[#F5F5F5]">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-[#4A90E2]">
            Personalized Recommendations
          </h3>
          <p className="text-gray-600">
            Get advice tailored specifically to your home's layout and needs.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-[#4A90E2]">
            Cost-Saving Insights
          </h3>
          <p className="text-gray-600">
            Discover how much you can save by implementing our suggestions.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-[#4A90E2]">
            Comfort Improvement
          </h3>
          <p className="text-gray-600">
            Learn how to make your home more comfortable year-round.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const InteractiveExplainerSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Interactive Explainer
      </h2>
      <p className="text-gray-600 mb-8">
        See our AI in action. (Placeholder for interactive element)
      </p>
      <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Interactive demo coming soon!</p>
      </div>
    </div>
  </section>
);

const SocialProofSection = () => (
  <section className="py-20 bg-[#F5F5F5]">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">
        What Our Users Say
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Testimonial 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 italic">
            "I was amazed at the insights I got. I've already saved 15% on my
            energy bill!"
          </p>
          <p className="mt-4 font-semibold">- Jane Doe</p>
        </div>
        {/* Testimonial 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 italic">
            "Finally, a tool that gives concrete advice. Highly recommended."
          </p>
          <p className="mt-4 font-semibold">- John Smith</p>
        </div>
        {/* Testimonial 3 */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-600 italic">
            "The report was easy to understand and the recommendations were
            simple to implement."
          </p>
          <p className="mt-4 font-semibold">- Emily Jones</p>
        </div>
      </div>
    </div>
  </section>
);

const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Pricing</h2>
        <div className="flex justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 lg:w-1/3">
            <h3 className="text-2xl font-semibold mb-4">Standard Plan</h3>
            <p className="text-5xl font-bold text-[#4A90E2] mb-4">$29</p>
            <p className="text-gray-600 mb-6">
              One-time analysis of your floor plan.
            </p>
            <ul className="text-left mb-8">
              <li className="flex items-center mb-2">
                <span className="text-green-500 mr-2">✔</span> Full Energy Report
              </li>
              <li className="flex items-center mb-2">
                <span className="text-green-500 mr-2">✔</span> Personalized
                Recommendations
              </li>
              <li className="flex items-center mb-2">
                <span className="text-green-500 mr-2">✔</span> Email Support
              </li>
            </ul>
            <button
              onClick={() => navigate('/subscription')}
              className="bg-[#4A90E2] text-white font-bold py-3 px-6 rounded-lg w-full hover:bg-blue-600 transition duration-300"
            >
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCallToActionSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-[#4A90E2]">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Uncover Your Home's Energy Secrets?
        </h2>
        <p className="text-lg mb-8">
          Get started today and take the first step towards a more
          energy-efficient home.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-[#4A90E2] font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition duration-300"
        >
          Get Started Now
        </button>
      </div>
    </section>
  );
};

const LandingPage = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <InteractiveExplainerSection />
      <SocialProofSection />
      <PricingSection />
      <FinalCallToActionSection />
    </div>
  );
};

import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

import Subscription from "./pages/Subscription";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/DashboardNew";
import Report from "./pages/Report";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/payment" element={<Payment />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

createRoot(document.getElementById("root")!).render(<App />);
