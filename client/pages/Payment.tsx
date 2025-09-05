import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handlePayment = () => {
    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            No Plan Selected
          </h1>
          <Button
            onClick={() => navigate("/subscription")}
            className="bg-[#421034] hover:bg-[#2E0824] text-white"
          >
            Back to Subscription
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#421034] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-icons-outlined text-white text-2xl">
              credit_card
            </span>
          </div>
          <h1
            className="text-2xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Complete Payment
          </h1>
          <p
            className="text-gray-600 text-sm"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {plan.name} Plan • {plan.price} {plan.period}
          </p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Plan Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3
                className="font-semibold text-gray-900"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {plan.name} Plan
              </h3>
              {plan.badge && (
                <span className="px-2 py-1 bg-[#421034] text-white text-xs rounded-full font-medium">
                  {plan.badge}
                </span>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  SFT
                </div>
                <div className="text-sm font-semibold text-[#421034]">
                  {plan.highlights.sft}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Floors
                </div>
                <div className="text-sm font-semibold text-[#421034]">
                  {plan.highlights.floors}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">
                  Properties
                </div>
                <div className="text-sm font-semibold text-[#421034]">
                  {plan.highlights.properties}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-3"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-3 border-2 rounded-lg text-center transition-all ${
                  paymentMethod === "card"
                    ? "border-[#421034] bg-[#421034] text-white"
                    : "border-gray-200 hover:border-[#421034] text-gray-700"
                }`}
              >
                <span className="material-icons-outlined text-lg block mb-1">
                  credit_card
                </span>
                <span className="text-xs font-medium">Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod("upi")}
                className={`p-3 border-2 rounded-lg text-center transition-all ${
                  paymentMethod === "upi"
                    ? "border-[#421034] bg-[#421034] text-white"
                    : "border-gray-200 hover:border-[#421034] text-gray-700"
                }`}
              >
                <span className="material-icons-outlined text-lg block mb-1">
                  currency_rupee
                </span>
                <span className="text-xs font-medium">UPI</span>
              </button>
              <button
                onClick={() => setPaymentMethod("netbanking")}
                className={`p-3 border-2 rounded-lg text-center transition-all ${
                  paymentMethod === "netbanking"
                    ? "border-[#421034] bg-[#421034] text-white"
                    : "border-gray-200 hover:border-[#421034] text-gray-700"
                }`}
              >
                <span className="material-icons-outlined text-lg block mb-1">
                  account_balance
                </span>
                <span className="text-xs font-medium">Net Banking</span>
              </button>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            {paymentMethod === "card" && (
              <>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#421034] focus:border-transparent transition-all"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    />
                    <span className="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      credit_card
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#421034] focus:border-transparent transition-all"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#421034] focus:border-transparent transition-all"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#421034] focus:border-transparent transition-all"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  />
                </div>
              </>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-6">
                {/* UPI Apps */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-3"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Choose UPI App
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => window.open("tez://", "_blank")}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#421034] hover:bg-gray-50 transition-all"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm border overflow-hidden">
                        <svg
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          stroke-linejoin="round"
                          stroke-miterlimit="2"
                          className="w-8 h-8"
                        >
                          <g transform="matrix(.6782 0 0 .6782 1.226 120.628)">
                            <clipPath id="prefix__a">
                              <path d="M0 0h752v400H0z" />
                            </clipPath>
                            <g clip-path="url(#prefix__a)">
                              <path
                                d="M552 0H200C90 0 0 90 0 200s90 200 200 200h352c110 0 200-90 200-200S662 0 552 0z"
                                fill="#fff"
                                fill-rule="nonzero"
                              />
                              <path
                                d="M552 16.2c24.7 0 48.7 4.9 71.3 14.5 21.9 9.3 41.5 22.6 58.5 39.5 16.9 16.9 30.2 36.6 39.5 58.5 9.6 22.6 14.5 46.6 14.5 71.3 0 24.7-4.9 48.7-14.5 71.3-9.3 21.9-22.6 41.5-39.5 58.5-16.9 16.9-36.6 30.2-58.5 39.5-22.6 9.6-46.6 14.5-71.3 14.5H200c-24.7 0-48.7-4.9-71.3-14.5-21.9-9.3-41.5-22.6-58.5-39.5-16.9-16.9-30.2-36.6-39.5-58.5-9.6-22.6-14.5-46.6-14.5-71.3 0-24.7 4.9-48.7 14.5-71.3 9.3-21.9 22.6-41.5 39.5-58.5 16.9-16.9 36.6-30.2 58.5-39.5 22.6-9.6 46.6-14.5 71.3-14.5h352M552 0H200C90 0 0 90 0 200s90 200 200 200h352c110 0 200-90 200-200S662 0 552 0z"
                                fill="#3c4043"
                                fill-rule="nonzero"
                              />
                              <g fill-rule="nonzero">
                                <g fill="#3c4043">
                                  <path d="M358.6 214.1v60.6h-19.2V125.3h50.9c12.9 0 23.9 4.3 32.9 12.9 9.2 8.6 13.8 19.1 13.8 31.5 0 12.7-4.6 23.2-13.8 31.7-8.9 8.5-19.9 12.7-32.9 12.7h-31.7zm0-70.4v52.1h32.1c7.6 0 14-2.6 19-7.7 5.1-5.1 7.7-11.3 7.7-18.3 0-6.9-2.6-13-7.7-18.1-5-5.3-11.3-7.9-19-7.9h-32.1v-.1zM487.2 169.1c14.2 0 25.4 3.8 33.6 11.4 8.2 7.6 12.3 18 12.3 31.2v63h-18.3v-14.2h-.8c-7.9 11.7-18.5 17.5-31.7 17.5-11.3 0-20.7-3.3-28.3-10-7.6-6.7-11.4-15-11.4-25 0-10.6 4-19 12-25.2 8-6.3 18.7-9.4 32-9.4 11.4 0 20.8 2.1 28.1 6.3v-4.4c0-6.7-2.6-12.3-7.9-17-5.3-4.7-11.5-7-18.6-7-10.7 0-19.2 4.5-25.4 13.6l-16.9-10.6c9.3-13.5 23.1-20.2 41.3-20.2zm-24.8 74.2c0 5 2.1 9.2 6.4 12.5 4.2 3.3 9.2 5 14.9 5 8.1 0 15.3-3 21.6-9 6.3-6 9.5-13 9.5-21.1-6-4.7-14.3-7.1-25-7.1-7.8 0-14.3 1.9-19.5 5.6-5.3 3.9-7.9 8.6-7.9 14.1zM637.5 172.4l-64 147.2h-19.8l23.8-51.5-42.2-95.7h20.9l30.4 73.4h.4l29.6-73.4h20.9z" />
                                </g>
                                <path
                                  d="M282.23 202c0-6.26-.56-12.25-1.6-18.01h-80.48v33l46.35.01c-1.88 10.98-7.93 20.34-17.2 26.58v21.41h27.59c16.11-14.91 25.34-36.95 25.34-62.99z"
                                  fill="#4285f4"
                                />
                                <path
                                  d="M229.31 243.58c-7.68 5.18-17.57 8.21-29.14 8.21-22.35 0-41.31-15.06-48.1-35.36h-28.46v22.08c14.1 27.98 43.08 47.18 76.56 47.18 23.14 0 42.58-7.61 56.73-20.71l-27.59-21.4z"
                                  fill="#34a853"
                                />
                                <path
                                  d="M149.39 200.05c0-5.7.95-11.21 2.68-16.39v-22.08h-28.46c-5.83 11.57-9.11 24.63-9.11 38.47s3.29 26.9 9.11 38.47l28.46-22.08a51.657 51.657 0 01-2.68-16.39z"
                                  fill="#fabb05"
                                />
                                <path
                                  d="M200.17 148.3c12.63 0 23.94 4.35 32.87 12.85l24.45-24.43c-14.85-13.83-34.21-22.32-57.32-22.32-33.47 0-62.46 19.2-76.56 47.18l28.46 22.08c6.79-20.3 25.75-35.36 48.1-35.36z"
                                  fill="#e94235"
                                />
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          GPay
                        </div>
                        <div className="text-xs text-gray-500">Google Pay</div>
                      </div>
                    </button>
                    <button
                      onClick={() =>
                        window.open("https://www.paypal.com", "_blank")
                      }
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#421034] hover:bg-gray-50 transition-all"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm border">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 170 48"
                          className="w-10 h-3"
                        >
                          <path
                            fill="#003087"
                            d="M62.56 28.672a10.111 10.111 0 009.983-8.56c.78-4.967-3.101-9.303-8.6-9.303H55.08a.689.689 0 00-.69.585l-3.95 25.072a.643.643 0 00.634.742h4.69a.689.689 0 00.688-.585l1.162-7.365a.689.689 0 01.689-.586h4.257zm3.925-8.786c-.29 1.836-1.709 3.189-4.425 3.189h-3.474l1.053-6.68h3.411c2.81.006 3.723 1.663 3.435 3.496v-.005zm26.378-1.18H88.41a.69.69 0 00-.69.585l-.144.924s-3.457-3.775-9.575-1.225c-3.51 1.461-5.194 4.48-5.91 6.69 0 0-2.277 6.718 2.87 10.417 0 0 4.771 3.556 10.145-.22l-.093.589a.642.642 0 00.634.742h4.451a.689.689 0 00.69-.585l2.708-17.175a.643.643 0 00-.634-.742zm-6.547 9.492a4.996 4.996 0 01-4.996 4.276 4.513 4.513 0 01-1.397-.205c-1.92-.616-3.015-2.462-2.7-4.462a4.996 4.996 0 015.014-4.277c.474-.005.946.065 1.398.206 1.913.614 3.001 2.46 2.686 4.462h-.005z"
                          />
                          <path
                            fill="#0070E0"
                            d="M126.672 28.672a10.115 10.115 0 009.992-8.56c.779-4.967-3.101-9.303-8.602-9.303h-8.86a.69.69 0 00-.689.585l-3.962 25.079a.637.637 0 00.365.683.64.64 0 00.269.06h4.691a.69.69 0 00.689-.586l1.163-7.365a.688.688 0 01.689-.586l4.255-.007zm3.925-8.786c-.29 1.836-1.709 3.189-4.426 3.189h-3.473l1.054-6.68h3.411c2.808.006 3.723 1.663 3.434 3.496v-.005zm26.377-1.18h-4.448a.69.69 0 00-.689.585l-.146.924s-3.456-3.775-9.574-1.225c-3.509 1.461-5.194 4.48-5.911 6.69 0 0-2.276 6.718 2.87 10.417 0 0 4.772 3.556 10.146-.22l-.093.589a.637.637 0 00.365.683c.084.04.176.06.269.06h4.451a.686.686 0 00.689-.586l2.709-17.175a.657.657 0 00-.148-.518.632.632 0 00-.49-.224zm-6.546 9.492a4.986 4.986 0 01-4.996 4.276 4.513 4.513 0 01-1.399-.205c-1.921-.616-3.017-2.462-2.702-4.462a4.996 4.996 0 014.996-4.277c.475-.005.947.064 1.399.206 1.933.614 3.024 2.46 2.707 4.462h-.005z"
                          />
                          <path
                            fill="#003087"
                            d="M109.205 19.131l-5.367 9.059-2.723-8.992a.69.69 0 00-.664-.492h-4.842a.516.516 0 00-.496.689l4.88 15.146-4.413 7.138a.517.517 0 00.442.794h5.217a.858.858 0 00.741-.418l13.632-22.552a.516.516 0 00-.446-.789h-5.215a.858.858 0 00-.746.417z"
                          />
                          <path
                            fill="#0070E0"
                            d="M161.982 11.387l-3.962 25.079a.637.637 0 00.365.683c.084.04.176.06.269.06h4.689a.688.688 0 00.689-.586l3.963-25.079a.637.637 0 00-.146-.517.645.645 0 00-.488-.225h-4.69a.69.69 0 00-.689.585z"
                          />
                          <path
                            fill="#001C64"
                            d="M37.146 22.26c-1.006 5.735-5.685 10.07-11.825 10.07h-3.898c-.795 0-1.596.736-1.723 1.55l-1.707 10.835c-.099.617-.388.822-1.013.822h-6.27c-.634 0-.784-.212-.689-.837l.72-7.493-7.526-.389c-.633 0-.862-.345-.772-.977l5.135-32.56c.099-.617.483-.882 1.106-.882h13.023c6.269 0 10.235 4.22 10.72 9.692 3.73 2.52 5.474 5.873 4.72 10.168z"
                          />
                          <path
                            fill="#0070E0"
                            d="M12.649 25.075l-1.907 12.133-1.206 7.612a1.034 1.034 0 001.016 1.19h6.622a1.27 1.27 0 001.253-1.072l1.743-11.06a1.27 1.27 0 011.253-1.071h3.898A12.46 12.46 0 0037.617 22.26c.675-4.307-1.492-8.228-5.201-10.165a9.96 9.96 0 01-.12 1.37 12.461 12.461 0 01-12.295 10.54h-6.1a1.268 1.268 0 00-1.252 1.07z"
                          />
                          <path
                            fill="#003087"
                            d="M10.741 37.208H3.03a1.035 1.035 0 01-1.018-1.192L7.208 3.072A1.268 1.268 0 018.46 2H21.7c6.269 0 10.827 4.562 10.72 10.089a11.567 11.567 0 00-5.399-1.287H15.983a1.27 1.27 0 00-1.254 1.071l-2.08 13.202-1.908 12.133z"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          PayPal
                        </div>
                        <div className="text-xs text-gray-500">PayPal</div>
                      </div>
                    </button>
                    <button
                      onClick={() => window.open("phonepe://", "_blank")}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#421034] hover:bg-gray-50 transition-all"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm border">
                        <svg viewBox="0 0 512 512" className="w-8 h-8">
                          <circle
                            cx="-25.926"
                            cy="41.954"
                            r="29.873"
                            fill="#5f259f"
                            transform="rotate(-76.714 -48.435 5.641) scale(8.56802)"
                          />
                          <path
                            d="M372.164 189.203c0-10.008-8.576-18.593-18.584-18.593h-34.323l-78.638-90.084c-7.154-8.577-18.592-11.439-30.03-8.577l-27.17 8.577c-4.292 1.43-5.723 7.154-2.862 10.007l85.8 81.508H136.236c-4.293 0-7.154 2.861-7.154 7.154v14.292c0 10.016 8.585 18.592 18.592 18.592h20.015v68.639c0 51.476 27.17 81.499 72.931 81.499 14.292 0 25.739-1.431 40.03-7.146v45.753c0 12.87 10.016 22.886 22.885 22.886h20.015c4.293 0 8.577-4.293 8.577-8.586V210.648h32.893c4.292 0 7.145-2.861 7.145-7.145v-14.3zM280.65 312.17c-8.576 4.292-20.015 5.723-28.591 5.723-22.886 0-34.324-11.438-34.324-37.176v-68.639h62.915v100.092z"
                            fill="#fff"
                            fill-rule="nonzero"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          PhonePe
                        </div>
                        <div className="text-xs text-gray-500">PhonePe</div>
                      </div>
                    </button>
                    <button
                      onClick={() => window.open("paytmmp://", "_blank")}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-[#421034] hover:bg-gray-50 transition-all"
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm border">
                        <svg
                          width="32"
                          height="12"
                          viewBox="0 0 122.88 38.52"
                          className="w-8 h-3"
                        >
                          <g>
                            <path
                              fill="#00BAF2"
                              d="M122.47,11.36c-1.12-3.19-4.16-5.48-7.72-5.48h-0.08c-2.32,0-4.41,0.97-5.9,2.52 c-1.49-1.55-3.58-2.52-5.9-2.52h-0.07c-2.04,0-3.91,0.75-5.34,1.98V7.24c-0.05-0.63-0.56-1.12-1.2-1.12h-5.48 c-0.67,0-1.21,0.54-1.21,1.21v29.74c0,0.67,0.54,1.21,1.21,1.21h5.48c0.61,0,1.12-0.46,1.19-1.04l0-21.35c0-0.08,0-0.14,0.01-0.21 c0.09-0.95,0.79-1.74,1.89-1.83h1.01c0.46,0.04,0.85,0.2,1.15,0.45c0.48,0.38,0.74,0.96,0.74,1.6l0.02,21.24 c0,0.67,0.54,1.22,1.21,1.22h5.48c0.65,0,1.17-0.51,1.2-1.15l0-21.33c0-0.7,0.32-1.34,0.89-1.71c0.28-0.18,0.62-0.3,1.01-0.34h1.01 c1.19,0.1,1.9,1,1.9,2.05l0.02,21.22c0,0.67,0.54,1.21,1.21,1.21h5.48c0.64,0,1.17-0.5,1.21-1.13V13.91 C122.86,12.6,122.69,11.99,122.47,11.36L122.47,11.36z"
                            />
                            <path
                              fill="#20336B"
                              d="M85.39,6.2h-3.13V1.12c0-0.01,0-0.01,0-0.02C82.26,0.5,81.77,0,81.15,0 c-0.07,0-0.14,0.01-0.21,0.02c-3.47,0.95-2.78,5.76-9.12,6.17h-0.61c-0.09,0-0.18,0.01-0.27,0.03h-0.01l0.01,0 C70.41,6.35,70,6.83,70,7.41v5.48c0,0.67,0.54,1.21,1.21,1.21h3.3l-0.01,23.22c0,0.66,0.54,1.2,1.2,1.2h5.42 c0.66,0,1.2-0.54,1.2-1.2l0-23.22h3.07c0.66,0,1.21-0.55,1.21-1.21V7.41C86.6,6.74,86.06,6.2,85.39,6.2L85.39,6.2z"
                            />
                            <path
                              fill="#20336B"
                              d="M65.69,6.2h-5.48C59.55,6.2,59,6.74,59,7.41v11.33c-0.01,0.7-0.58,1.26-1.28,1.26h-2.29 c-0.71,0-1.29-0.57-1.29-1.28L54.12,7.41c0-0.67-0.54-1.21-1.21-1.21h-5.48c-0.67,0-1.21,0.54-1.21,1.21v12.41 c0,4.71,3.36,8.08,8.08,8.08c0,0,3.54,0,3.65,0.02c0.64,0.07,1.13,0.61,1.13,1.27c0,0.65-0.48,1.19-1.12,1.27 c-0.03,0-0.06,0.01-0.09,0.02l-8.01,0.03c-0.67,0-1.21,0.54-1.21,1.21v5.47c0,0.67,0.54,1.21,1.21,1.21h8.95 c4.72,0,8.08-3.36,8.08-8.07V7.41C66.9,6.74,66.36,6.2,65.69,6.2L65.69,6.2z"
                            />
                            <path
                              fill="#20336B"
                              d="M34.53,6.23h-7.6c-0.67,0-1.22,0.51-1.22,1.13v2.13 c0,0.01,0,0.03,0,0.04c0,0.02,0,0.03,0,0.05v2.92c0,0.66,0.58,1.21,1.29,1.21h7.24c0.57,0.09,1.02,0.51,1.09,1.16v0.71 c-0.06,0.62-0.51,1.07-1.06,1.12h-3.58c-4.77,0-8.16,3.17-8.16,7.61v6.37c0,4.42,2.92,7.56,7.65,7.56h9.93 c1.78,0,3.23-1.35,3.23-3.01V14.45C43.34,9.41,40.74,6.23,34.53,6.23L34.53,6.23z"
                            />
                            <path
                              fill="#20336B"
                              d="M35.4,29.09v0.86c0,0.07-0.01,0.14-0.02,0.2 c-0.01,0.06-0.03,0.12-0.05,0.18c-0.17,0.48-0.65,0.83-1.22,0.83h-2.28c-0.71,0-1.29-0.54-1.29-1.21v-1.03c0-0.01,0-0.03,0-0.04 l0-2.75v-0.86l0-0.01c0-0.66,0.58-1.2,1.29-1.2h2.28c0.71,0,1.29,0.54,1.29,1.21V29.09L35.4,29.09z"
                            />
                            <path
                              fill="#20336B"
                              d="M13.16,6.19H1.19 C0.53,6.19,0,6.73,0,7.38v5.37c0,0.01,0,0.02,0,0.03c0,0.03,0,0.05,0,0.07v24.29c0,0.66,0.49,1.2,1.11,1.21h5.58 c0.67,0,1.21-0.54,1.21-1.21l0.02-8.32h5.24c4.38,0,7.44-3.04,7.44-7.45v-7.72C20.6,9.25,17.54,6.19,13.16,6.19L13.16,6.19z"
                            />
                            <path
                              fill="#20336B"
                              d="M12.68,16.23v3.38c0,0.71-0.57,1.29-1.28,1.29l-3.47,0v-6.77h3.47c0.71,0,1.28,0.57,1.28,1.28V16.23L12.68,16.23z"
                            />
                          </g>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          Paytm
                        </div>
                        <div className="text-xs text-gray-500">Paytm</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* UPI ID Input */}
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-3"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Or enter UPI ID
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#421034] focus:border-transparent transition-all"
                      style={{ fontFamily: "Roboto, sans-serif" }}
                    />
                    <span className="material-icons-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      account_circle
                    </span>
                  </div>
                  <p
                    className="text-xs text-gray-500 mt-2"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Enter your UPI ID (e.g., yourname@paytm)
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "netbanking" && (
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-2"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Select Bank
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#421034] focus:border-transparent transition-all"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  <option>Select your bank</option>
                  <option>SBI</option>
                  <option>HDFC</option>
                  <option>ICICI</option>
                  <option>Axis Bank</option>
                  <option>Other</option>
                </select>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-[#421034] border-gray-300 rounded focus:ring-[#421034] focus:ring-2"
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-relaxed"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                I agree to the{" "}
                <a
                  href="#"
                  className="text-[#421034] hover:text-[#2E0824] underline"
                >
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-[#421034] hover:text-[#2E0824] underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full py-4 text-lg font-semibold bg-[#421034] hover:bg-[#2E0824] text-white rounded-lg disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              "Pay Now"
            )}
          </Button>

          {/* Security Notice */}
          <div className="text-center pt-2">
            <p
              className="text-xs text-gray-500 flex items-center justify-center"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              <span className="material-icons-outlined text-green-500 mr-1 text-sm">
                verified_user
              </span>
              Secure payment powered by SSL
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/subscription")}
            className="text-[#421034] hover:text-[#2E0824] text-sm font-medium transition-colors"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            ← Back to Plans
          </button>
        </div>
      </div>
    </div>
  );
}
