"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]">
      {/* Navigation */}
      <Navbar />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
          Privacy{" "}
          <span className="bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent">
            Policy
          </span>
        </h1>
        <p className="text-sm text-gray-600 italic">
          Disclaimer: This Privacy Policy is a work in progress and may be
          updated in the future. Not all features are fully implemented yet
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <p className="text-sm text-gray-600 italic">
            Last Updated: February 2026
          </p>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p>
              At LifeMap, we are committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website and use our
              services.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <p>
              <strong>Account Information:</strong> When you create an account,
              we collect your email, name, and password.
            </p>
            <p>
              <strong>Responses to Questions:</strong> We collect your responses
              to LifeMap's reflection questions.
            </p>
            <p>
              <strong>Usage Data:</strong> We collect information about how you
              interact with our service, including timestamps and feature usage.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li>To provide, maintain, and improve LifeMap services</li>
              <li>To send you service-related announcements</li>
              <li>To respond to your inquiries</li>
              <li>To analyze usage patterns and improve user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              4. Data Security
            </h2>
            <p>
              Your data is encrypted both in transit (using TLS/SSL) and at
              rest. We implement industry-standard security measures to protect
              your information from unauthorized access, alteration, disclosure,
              or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              5. Data Retention
            </h2>
            <p>
              We retain your data for as long as your account is active. You may
              request deletion of your account and associated data at any time,
              and we will comply within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              6. Third-Party Sharing
            </h2>
            <p>
              We do not sell, trade, or rent your personal information to third
              parties. We may share information with trusted service providers
              who assist us in operating our website and conducting our
              business, under strict confidentiality agreements.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              7. Your Rights
            </h2>
            <p>
              You have the right to access, correct, or delete your personal
              information. You can also opt out of non-essential communications
              at any time.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at alexandercarlson03@gmail.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
