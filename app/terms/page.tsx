"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]">
      {/* Navigation */}
      <Navbar />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
          Terms of{" "}
          <span className="bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent">
            Service
          </span>
        </h1>
        <p className="text-sm text-gray-600 italic">
          Disclaimer: This Terms of Service is a work in progress and may be
          updated in the future. Not all features are fully implemented yet.
        </p>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <p className="text-sm text-gray-600 italic">
            Last Updated: February 2026
          </p>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using LifeMap, you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree
              to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              2. Use License
            </h2>
            <p>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on LifeMap for personal,
              non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may
              not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>Attempt to decompile or reverse engineer any software</li>
              <li>Remove any copyright or other proprietary notations</li>
              <li>
                Transfer the materials to another person or "mirror" the
                materials on any other server
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              3. Disclaimer
            </h2>
            <p>
              The materials on LifeMap are provided on an 'as is' basis. LifeMap
              makes no warranties, expressed or implied, and hereby disclaims
              and negates all other warranties including, without limitation,
              implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              4. Limitations of Liability
            </h2>
            <p>
              In no event shall LifeMap or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on LifeMap, even if LifeMap or a
              LifeMap-authorized representative has been notified orally or in
              writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              5. Accuracy of Materials
            </h2>
            <p>
              The materials appearing on LifeMap could include technical,
              typographical, or photographic errors. LifeMap does not warrant
              that any of the materials on its website are accurate, complete,
              or current. LifeMap may make changes to the materials contained on
              its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">6. Links</h2>
            <p>
              LifeMap has not reviewed all of the sites linked to its website
              and is not responsible for the contents of any such linked site.
              The inclusion of any link does not imply endorsement by LifeMap of
              the site. Use of any such linked website is at the user's own
              risk.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              7. Modifications
            </h2>
            <p>
              LifeMap may revise these terms of service for its website at any
              time without notice. By using this website, you are agreeing to be
              bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              8. Governing Law
            </h2>
            <p>
              These terms and conditions are governed by and construed in
              accordance with the laws of the jurisdiction in which LifeMap
              operates, and you irrevocably submit to the exclusive jurisdiction
              of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at terms@lifemap.app
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
