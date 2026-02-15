"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contract() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]">
      {/* Navigation */}
      <Navbar />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
          User <span className="bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent">Agreement</span>
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <p className="text-sm text-gray-600 italic">Last Updated: February 2026</p>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">1. Parties</h2>
            <p>
              This User Agreement ("Agreement") is entered into between LifeMap ("Company") and the individual or entity creating an account ("User").
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">2. Services Provided</h2>
            <p>
              LifeMap provides a personal development platform that allows users to respond to reflective questions, track their responses over time, and visualize how their perspectives evolve. The Company reserves the right to modify, suspend, or discontinue services with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">3. User Responsibilities</h2>
            <p>
              User agrees to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and complete information when creating an account</li>
              <li>Maintain the confidentiality of login credentials</li>
              <li>Use the service only for lawful purposes and in compliance with all applicable laws</li>
              <li>Not attempt to gain unauthorized access to LifeMap systems</li>
              <li>Not upload or transmit harmful or malicious content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">4. Intellectual Property Rights</h2>
            <p>
              LifeMap and its content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by LifeMap, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">5. User-Generated Content</h2>
            <p>
              User retains ownership of all responses and content submitted to LifeMap. By submitting content, User grants LifeMap a non-exclusive license to use, reproduce, modify, and display such content solely for the purpose of providing the LifeMap service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, LifeMap shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from User's use of or inability to use the service, even if LifeMap has been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">7. Indemnification</h2>
            <p>
              User agrees to indemnify, defend, and hold harmless LifeMap and its officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">8. Termination</h2>
            <p>
              LifeMap may terminate or suspend User's account and access to the service at any time, without notice or liability, for any reason, including if User violates this Agreement or applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">9. Governing Law</h2>
            <p>
              This Agreement shall be governed by and construed in accordance with the laws applicable in the jurisdiction where LifeMap operates.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">10. Contact & Disputes</h2>
            <p>
              For any questions or disputes regarding this Agreement, please contact us at legal@lifemap.app. We are committed to resolving any issues promptly and fairly.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
