import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful signup
      setSuccess(
        `Successfully signed up with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`,
      );
      setTimeout(() => {
        navigate("/subscription");
      }, 1500);
    } catch (err) {
      setError(`Failed to sign up with ${provider}. Please try again.`);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful signup
      setSuccess(
        "Account created successfully! Redirecting to subscription...",
      );
      setTimeout(() => {
        navigate("/subscription");
      }, 1500);
    } catch (err) {
      setError("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border-2 border-white rounded-lg rotate-45"></div>
          <div className="absolute bottom-32 left-40 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-white rounded-lg rotate-12"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          {/* Logo/Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Vastu360</h1>
            <p className="text-xl opacity-90">Smart Vastu Analysis</p>
          </div>

          {/* Features */}
          <div className="space-y-6 w-full max-w-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Expert Analysis</h3>
                <p className="text-sm opacity-80">
                  Professional Vastu consultation
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Quick Setup</h3>
                <p className="text-sm opacity-80">
                  Get started in under 5 minutes
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Secure Platform</h3>
                <p className="text-sm opacity-80">Enterprise-grade security</p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-white/30 rounded-full"></div>
          <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-lg rotate-45"></div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50 min-h-screen">
        <div className="w-full max-w-md space-y-6">
          {/* Back Navigation */}
          <div className="flex justify-start">
            <Link
              to="/subscription"
              className="inline-flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-200 group"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="group-hover:-translate-x-0.5 transition-transform"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 6C12 6.41421 11.6642 6.75 11.25 6.75L2.56066 6.75L5.78033 9.96967C6.07322 10.2626 6.07322 10.7374 5.78033 11.0303C5.48744 11.3232 5.01256 11.3232 4.71967 11.0303L0.219669 6.53033C-0.0732231 6.23744 -0.0732231 5.76256 0.219669 5.46967L4.71967 0.96967C5.01256 0.676777 5.48744 0.676777 5.78033 0.96967C6.07322 1.26256 6.07322 1.73744 5.78033 2.03033L2.56066 5.25L11.25 5.25C11.6642 5.25 12 5.58579 12 6Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-medium">Back to Subscription</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">
              Join Vastu360 and start your journey
            </p>
          </div>
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-2 mb-4">
            <Button
              onClick={() => handleSocialLogin("google")}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
              variant="outline"
            >
              {socialLoading === "google" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_5611_1220)">
                      <path
                        d="M24.0998 12.2763C24.0998 11.4605 24.0336 10.6404 23.8925 9.83789H12.5737V14.4589H19.0555C18.7865 15.9492 17.9223 17.2676 16.6568 18.1054V21.1037H20.5238C22.7946 19.0137 24.0998 15.9272 24.0998 12.2763Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12.5736 24.0013C15.81 24.0013 18.5394 22.9387 20.528 21.1044L16.661 18.106C15.5852 18.838 14.1962 19.2525 12.578 19.2525C9.44738 19.2525 6.79296 17.1404 5.84054 14.3008H1.8501V17.3917C3.88721 21.4439 8.03639 24.0013 12.5736 24.0013Z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.83627 14.3007C5.33361 12.8103 5.33361 11.1965 5.83627 9.70618V6.61523H1.85023C0.14823 10.006 0.14823 14.0009 1.85023 17.3916L5.83627 14.3007Z"
                        fill="#FBBC04"
                      />
                      <path
                        d="M12.5736 4.74966C14.2844 4.7232 15.9379 5.36697 17.1769 6.54867L20.603 3.12262C18.4336 1.0855 15.5543 -0.034466 12.5736 0.000808666C8.03639 0.000808666 3.88721 2.55822 1.8501 6.61481L5.83613 9.70575C6.78414 6.86173 9.44297 4.74966 12.5736 4.74966Z"
                        fill="#EA4335"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_5611_1220">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.333496)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                </>
              )}
            </Button>

            <Button
              onClick={() => handleSocialLogin("facebook")}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
              variant="outline"
            >
              {socialLoading === "facebook" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_5611_1225)">
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
                      <clipPath id="clip0_5611_1225">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="font-medium">Continue with Facebook</span>
                </>
              )}
            </Button>

            <Button
              onClick={() => handleSocialLogin("apple")}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 p-4 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
              variant="outline"
            >
              {socialLoading === "apple" ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5098 17.1447C21.1771 17.9133 20.7833 18.6208 20.327 19.2713C19.7051 20.158 19.1958 20.7719 18.8034 21.1127C18.195 21.6722 17.5432 21.9587 16.8451 21.975C16.3441 21.975 15.7398 21.8324 15.0363 21.5432C14.3306 21.2553 13.682 21.1127 13.089 21.1127C12.467 21.1127 11.8 21.2553 11.0865 21.5432C10.3719 21.8324 9.79628 21.9832 9.35615 21.9981C8.68681 22.0266 8.01963 21.7319 7.35368 21.1127C6.92863 20.742 6.39698 20.1064 5.76009 19.2061C5.07675 18.2446 4.51495 17.1297 4.07483 15.8587C3.60348 14.4857 3.36719 13.1563 3.36719 11.8692C3.36719 10.3948 3.68577 9.12321 4.32389 8.0576C4.82539 7.20166 5.49256 6.52647 6.32759 6.03081C7.16261 5.53514 8.06485 5.28256 9.03649 5.2664C9.56814 5.2664 10.2653 5.43085 11.1317 5.75405C11.9957 6.07834 12.5504 6.24279 12.7936 6.24279C12.9754 6.24279 13.5917 6.0505 14.6364 5.66714C15.6243 5.31162 16.4581 5.16441 17.1412 5.2224C18.9921 5.37178 20.3827 6.10142 21.3075 7.41595C19.6521 8.41896 18.8332 9.82379 18.8495 11.626C18.8645 13.0297 19.3737 14.1979 20.3745 15.1254C20.8281 15.5558 21.3346 15.8885 21.8982 16.1248C21.776 16.4793 21.647 16.8188 21.5098 17.1447ZM17.2648 0.440125C17.2648 1.54038 16.8628 2.56768 16.0616 3.51854C15.0947 4.64892 13.9252 5.30211 12.657 5.19904C12.6408 5.06705 12.6315 4.92812 12.6315 4.78214C12.6315 3.7259 13.0913 2.59552 13.9078 1.67127C14.3155 1.20331 14.834 0.814209 15.4627 0.503814C16.0901 0.19805 16.6835 0.0289566 17.2417 0C17.258 0.147086 17.2648 0.294182 17.2648 0.440111V0.440125Z"
                      fill="black"
                    />
                  </svg>
                  <span className="font-medium">Continue with Apple</span>
                </>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gray-50 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Email or Mobile Number
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email or mobile"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200"
                required
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="w-4 h-4 mt-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-100"
                required
              />
              <label className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
