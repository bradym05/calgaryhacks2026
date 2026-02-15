"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!formData.agreedToTerms) {
      alert("Please agree to the Terms of Service and Privacy Policy");
      return;
    }
    setIsLoading(true);
    // TODO: Implement registration logic here
    console.log("Registration attempt:", formData);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2] flex flex-col">
      <Navbar />

      {/* Register Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-[#d4e4c8] p-8">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[#8aa66e] to-[#a8c686] rounded-lg"></div>
                <span className="text-2xl font-bold bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent">
                  LifeMap
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Create Account
              </h1>
              <p className="text-gray-600">Start your personal journey today</p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8aa66e] transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8aa66e] transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8aa66e] transition"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8aa66e] transition"
                  required
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer mt-1"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-[#8aa66e] hover:text-[#6b8e23] font-medium"
                  >
                    Terms of Service
                  </Link>
                  {" and "}
                  <Link
                    href="/privacy"
                    className="text-[#8aa66e] hover:text-[#6b8e23] font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <Link
              href="/login"
              className="block w-full text-center py-3 border-2 border-[#8aa66e] text-[#8aa66e] rounded-lg font-semibold hover:bg-[#f5f0e6] transition"
            >
              Login
            </Link>

            {/* Footer Text */}
            <p className="text-center text-xs text-gray-500 mt-6">
              Free forever • No credit card required
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
