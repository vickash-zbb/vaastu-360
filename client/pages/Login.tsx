import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful login
      setSuccess(
        `Successfully logged in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`,
      );
      setTimeout(() => {
        navigate("/subscription");
      }, 1500);
    } catch (err) {
      setError(`Failed to login with ${provider}. Please try again.`);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful login
      setSuccess("Login successful! Redirecting to subscription...");
      setTimeout(() => {
        navigate("/subscription");
      }, 1500);
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Back Navigation */}
      <div className="container mx-80 px-50 pt-8">
        <Link
          to="/subscription"
          className="inline-flex items-center gap-4 text-black hover:text-primary transition-colors"
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6C12 6.41421 11.6642 6.75 11.25 6.75L2.56066 6.75L5.78033 9.96967C6.07322 10.2626 6.07322 10.7374 5.78033 11.0303C5.48744 11.3232 5.01256 11.3232 4.71967 11.0303L0.219669 6.53033C-0.0732231 6.23744 -0.0732231 5.76256 0.219669 5.46967L4.71967 0.96967C5.01256 0.676777 5.48744 0.676777 5.78033 0.96967C6.07322 1.26256 6.07322 1.73744 5.78033 2.03033L2.56066 5.25L11.25 5.25C11.6642 5.25 12 5.58579 12 6Z"
                fill="#212529"
              />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "Noto Sans Devanagari, sans-serif",
              fontSize: "16px",
            }}
          >
            Back to Subscription selection
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 sm:py-12 flex justify-center">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12">
          <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
            {/* Error/Success Messages */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <Button
                onClick={() => handleSocialLogin("google")}
                disabled={socialLoading !== null}
                className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
                variant="outline"
              >
                {socialLoading === "google" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_5611_3425)">
                      <path
                        d="M24.0995 12.2763C24.0995 11.4605 24.0334 10.6404 23.8923 9.83789H12.5735V14.4589H19.0552C18.7862 15.9492 17.922 17.2676 16.6565 18.1054V21.1037H20.5235C22.7943 19.0137 24.0995 15.9272 24.0995 12.2763Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.5731 24.0013C15.8096 24.0013 18.5389 22.9387 20.5275 21.1044L16.6606 18.106C15.5847 18.838 14.1957 19.2525 12.5775 19.2525C9.44689 19.2525 6.79247 17.1404 5.84006 14.3008H1.84961V17.3917C3.88672 21.4439 8.03591 24.0013 12.5731 24.0013Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.83603 14.3007C5.33336 12.8103 5.33336 11.1965 5.83603 9.70618V6.61523H1.84999C0.147986 10.006 0.147986 14.0009 1.84999 17.3916L5.83603 14.3007Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M12.5731 4.74966C14.2839 4.7232 15.9374 5.36697 17.1765 6.54867L20.6025 3.12262C18.4331 1.0855 15.5538 -0.034466 12.5731 0.000808666C8.0359 0.000808666 3.88672 2.55822 1.84961 6.61481L5.83565 9.70575C6.78365 6.86173 9.44248 4.74966 12.5731 4.74966Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5611_3425">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.333252)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </Button>

              <Button
                onClick={() => handleSocialLogin("facebook")}
                disabled={socialLoading !== null}
                className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
                variant="outline"
              >
                {socialLoading === "facebook" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_5611_3171)">
                      <path
                        d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                        fill="#1877F2"
                      />
                      <path
                        d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.80102 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.3674 24.0486 12.6326 24.0486 13.875 23.8542V15.4688H16.6711Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5611_3171">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </Button>

              <Button
                onClick={() => handleSocialLogin("apple")}
                disabled={socialLoading !== null}
                className="flex items-center justify-center p-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-50"
                variant="outline"
              >
                {socialLoading === "apple" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5093 17.1447C21.1766 17.9133 20.7828 18.6208 20.3265 19.2713C19.7046 20.158 19.1953 20.7719 18.8029 21.1127C18.1945 21.6722 17.5427 21.9587 16.8447 21.975C16.3436 21.975 15.7393 21.8324 15.0358 21.5432C14.3301 21.2553 13.6815 21.1127 13.0885 21.1127C12.4665 21.1127 11.7995 21.2553 11.086 21.5432C10.3714 21.8324 9.79579 21.9832 9.35567 21.9981C8.68632 22.0266 8.01914 21.7319 7.35319 21.1127C6.92814 20.742 6.39649 20.1064 5.7596 19.2061C5.07626 18.2446 4.51446 17.1297 4.07434 15.8587C3.60299 14.4857 3.3667 13.1563 3.3667 11.8692C3.3667 10.3948 3.68528 9.12321 4.3234 8.0576C4.8249 7.20166 5.49208 6.52647 6.3271 6.03081C7.16212 5.53514 8.06436 5.28256 9.036 5.2664C9.56765 5.2664 10.2648 5.43085 11.1312 5.75405C11.9952 6.07834 12.5499 6.24279 12.7931 6.24279C12.975 6.24279 13.5912 6.0505 14.6359 5.66714C15.6238 5.31162 16.4576 5.16441 17.1407 5.2224C18.9916 5.37178 20.3822 6.10142 21.307 7.41595C19.6516 8.41896 18.8327 9.82379 18.849 11.626C18.864 13.0297 19.3732 14.1979 20.3741 15.1254C20.8276 15.5558 21.3341 15.8885 21.8977 16.1248C21.7755 16.4793 21.6465 16.8188 21.5093 17.1447ZM17.2643 0.440125C17.2643 1.54038 16.8623 2.56768 16.0611 3.51854C15.0942 4.64892 13.9247 5.30211 12.6565 5.19904C12.6404 5.06705 12.631 4.92812 12.631 4.78214C12.631 3.7259 13.0908 2.59552 13.9073 1.67127C14.315 1.20331 14.8335 0.814209 15.4622 0.503814C16.0896 0.19805 16.6831 0.0289566 17.2412 0C17.2575 0.147086 17.2643 0.294182 17.2643 0.440111V0.440125Z"
                      fill="black"
                    />
                  </svg>
                )}
              </Button>
            </div>

            {/* Sign in Link */}
            <div
              className="text-center"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                lineHeight: "200%",
              }}
            >
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/signup" className="text-blue-600 hover:text-blue-700">
                Sign up
              </Link>
            </div>

            {/* Divider */}
            <div
              className="text-center text-gray-600"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "16px",
                lineHeight: "200%",
              }}
            >
              Or
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7">
                {/* First Name */}
                <div className="space-y-1.5">
                  <label
                    className="text-gray-700 font-medium"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter Your First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors shadow-sm"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <label
                    className="text-gray-700 font-medium"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter Your Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors shadow-sm"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      lineHeight: "24px",
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  className="text-gray-700 font-medium"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    lineHeight: "20px",
                  }}
                >
                  Email Or Mobile Number
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email Or Mobile Number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors shadow-sm"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  className="text-gray-700 font-medium"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    lineHeight: "20px",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors shadow-sm"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-lg sm:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: "Roboto, sans-serif", lineHeight: "150%" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
