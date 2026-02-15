"use client";

import NavHeader from "@/components/header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]">
      {/* Navigation */}
      <NavHeader />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-8">
          About <span className="bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent">LifeMap</span>
        </h1>

        <div className="space-y-8 text-gray-700 leading-relaxed">
          <p className="text-xl">
            LifeMap is a personal development platform designed to help you track and understand how your perspectives evolve over time.
          </p>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p>
              We believe that self-reflection is the foundation of personal growth. LifeMap enables you to document your thoughts on the most important aspects of life—career, relationships, purpose, and more—and watch as your understanding transforms through regular check-ins.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p>
              Every few months, LifeMap prompts you with thoughtful questions about your life. Your responses are securely stored and visualized over time, showing you trends and patterns in how your perspectives have shifted. This reflection tool helps you make more intentional decisions and understand your personal journey.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why LifeMap</h2>
            <ul className="list-disc list-inside space-y-3">
              <li><strong>Track Your Growth:</strong> See how your perspectives evolve with visual timelines.</li>
              <li><strong>Thoughtful Questions:</strong> Our curated questions guide deep reflection.</li>
              <li><strong>Privacy First:</strong> Your data is encrypted and belongs entirely to you.</li>
              <li><strong>Simple & Beautiful:</strong> A clean interface that makes reflection effortless.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Built for You</h2>
            <p>
              Whether you're starting a new chapter, navigating life transitions, or simply seeking greater self-awareness, LifeMap is your companion in understanding and shaping your evolving self.
            </p>
          </section>
        </div>

        {/* Call to Action */}
        <div className="mt-16 pt-8 border-t border-[#d4e4c8]">
          <Link
            href="/register"
            className="inline-block bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white px-8 py-3 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg font-medium"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
