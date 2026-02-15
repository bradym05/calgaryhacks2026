"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  SparklesIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import questions from "../services/questions.json";
import Footer from "@/components/Footer";
import LifeMapTrendGraph from "@/components/GraphDisplay";

export default function Home() {
  const router = useRouter();

  const startJourney = () => {
    // 1. Pick a random question from the array
    const questionKeys = Object.keys(questions);
    const randomIndex = Math.floor(Math.random() * questionKeys.length);
    const randomKey = questionKeys[randomIndex];

    // 2. Navigate to /[id].tsx (e.g., /101)
    router.push(`/question/${randomKey}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#8aa66e] to-[#a8c686] rounded-lg"></div>
          <span className="text-xl font-bold bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent">
            <Link
              href="/"
            >
              LifeMap
            </Link>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-gray-700 hover:text-gray-900 px-4 py-2 transition"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white px-5 py-2 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg"
          >
            Sign up free
          </Link>
        </div>
      </nav>

      <LifeMapTrendGraph
        title="Career Alignment Trend"
        subtitle="See how your career clarity changes each quarter"
        valueLabel="Career Alignment"
        valueSuffix="%"
        data={[
          { date: "2025-05-01", value: 52 },
          { date: "2025-08-01", value: 58 },
          { date: "2025-11-01", value: 61 },
          { date: "2026-02-01", value: 75 },
        ]}
      />
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 py-16 md:py-24 max-w-7xl mx-auto overflow-hidden">
        {/* Animated background with parallax effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0e2]/30 via-transparent to-[#c4d9a8]/30"></div>
          <div
            className="w-full h-full bg-cover bg-center opacity-20 scale-110 animate-ken-burns"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          />

          {/* Floating orbs */}
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#8aa66e]/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-[#a8c686]/10 rounded-full blur-3xl animate-float animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c4d9a8]/5 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#d4e4c8] shadow-sm animate-fade-up">
              <span className="w-2 h-2 bg-[#6b8e23] rounded-full animate-pulse mr-2"></span>
              <span className="text-sm font-medium text-[#556b2f]">
                ✨ New: 3-4 Month Check-ins
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-gray-800">Map Your</span>
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-[#6b8e23] via-[#8aa66e] to-[#a8c686] bg-clip-text text-transparent relative z-10">
                  Evolving Self
                </span>
                {/* Underline animation */}
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#c4d9a8]/30 -rotate-1 rounded-full blur-sm"></span>
              </span>
            </h1>

            {/* Description with animated gradient border */}
            <p className="text-xl lg:text-2xl text-gray-600 max-w-lg leading-relaxed relative pl-6 border-l-4 border-[#8aa66e] animate-fade-up animation-delay-100">
              Watch your perspectives transform over time. LifeMap helps you
              track how your thoughts on career, relationships, and purpose
              evolve through regular check-ins.
            </p>

            {/* CTA Buttons with micro-interactions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-up animation-delay-200">
              <button
                onClick={startJourney}
                className="group relative bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] text-white px-8 py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/20 animate-shine" />
                </div>

                <span className="relative z-10 flex items-center justify-center text-lg">
                  Start Your Journey
                  <ArrowRightIcon className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
                </span>
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group relative bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-[#d4e4c8] hover:border-[#8aa66e] transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center text-lg">
                  See How It Works
                  <svg
                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7-7-7m14-6l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Stats with counters */}
            <div className="flex gap-8 pt-8 animate-fade-up animation-delay-300">
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-bold text-[#6b8e23] group-hover:scale-110 transition-transform">
                  10K+
                </div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-bold text-[#6b8e23] group-hover:scale-110 transition-transform">
                  50K+
                </div>
                <div className="text-sm text-gray-500">Reflections</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-bold text-[#6b8e23] group-hover:scale-110 transition-transform">
                  4.9★
                </div>
                <div className="text-sm text-gray-500">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Preview Card */}
          <div className="relative animate-fade-up animation-delay-100">
            {/* Main Preview Card */}
            <div className="relative group perspective">
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-[#d4e4c8]/60 hover:shadow-3xl hover:-translate-y-2 hover:rotate-1 transition-all duration-500 transform-gpu">
                {/* Card Header with animated dots */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse animation-delay-200"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-400"></div>
                  </div>
                  <span className="text-sm text-gray-400 ml-2 font-mono">
                    lifemap.app/dashboard
                  </span>

                  {/* Live indicator */}
                  <div className="ml-auto flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-gray-400">Live</span>
                  </div>
                </div>

                {/* Progress Visualization */}
                <div className="space-y-6">
                  {/* Career Progress */}
                  <div className="group/item cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 group-hover/item:text-[#6b8e23] transition-colors">
                        Career Alignment
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-[#6b8e23]">
                          ↑ 15%
                        </span>
                        <span className="text-xs text-gray-400">
                          vs last quarter
                        </span>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] rounded-full transition-all duration-1000"
                        style={{ width: "75%" }}
                      >
                        <div className="w-full h-full animate-shimmer"></div>
                      </div>
                    </div>
                  </div>

                  {/* Work-Life Balance */}
                  <div className="group/item cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 group-hover/item:text-[#6b8e23] transition-colors">
                        Work-Life Balance
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-[#556b2f]">
                          → Stable
                        </span>
                        <span className="text-xs text-gray-400">
                          consistent
                        </span>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#8aa66e] to-[#a8c686] rounded-full transition-all duration-1000"
                        style={{ width: "50%" }}
                      />
                    </div>
                  </div>

                  {/* Personal Growth */}
                  <div className="group/item cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 group-hover/item:text-[#6b8e23] transition-colors">
                        Personal Growth
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-[#6b8e23]">
                          ↑ 28%
                        </span>
                        <span className="text-xs text-gray-400">
                          accelerating
                        </span>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#a8c686] to-[#c4d9a8] rounded-full transition-all duration-1000"
                        style={{ width: "82%" }}
                      />
                    </div>
                  </div>

                  {/* Next Milestone */}
                  <div className="mt-6 pt-6 border-t border-[#d4e4c8]/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                          Next Check-in
                        </p>
                        <p className="text-lg font-semibold text-[#6b8e23]">
                          March 2026
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">
                          Progress
                        </p>
                        <p className="text-lg font-semibold text-gray-700">
                          Day 67/90
                        </p>
                      </div>
                    </div>
                    {/* Mini progress bar */}
                    <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-gradient-to-r from-[#8aa66e] to-[#a8c686] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-[#d4e4c8] animate-float animation-delay-1000 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#e8f0e2] rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-[#6b8e23]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Reflection Streak</p>
                  <p className="text-lg font-bold text-[#6b8e23]">12 weeks</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-[#d4e4c8] animate-float animation-delay-2000 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#e8f0e2] rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-[#6b8e23]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Insights Gained</p>
                  <p className="text-lg font-bold text-[#6b8e23]">
                    24 patterns
                  </p>
                </div>
              </div>
            </div>

            {/* Animated background elements */}
            <div className="absolute -z-10 inset-0">
              <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#c4d9a8]/20 rounded-full blur-3xl animate-pulse-slow"></div>
              <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#e8f0e2]/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#8aa66e] rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#8aa66e] rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section - updated bg */}
      <section
        id="how-it-works"
        className="px-6 py-16 bg-gradient-to-b from-[#f8f4ed] to-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            How LifeMap Works
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A simple rhythm of reflection that reveals the beautiful complexity
            of your growth
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-[#d4e4c8]">
              <div className="w-12 h-12 bg-[#e8f0e2] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#6b8e23]">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Check In
              </h3>
              <p className="text-gray-600">
                Answer thoughtful questions about your life, values, and
                perspectives. Takes just 10-15 minutes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-[#d4e4c8]">
              <div className="w-12 h-12 bg-[#f0f5e9] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#8aa66e]">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Wait & Reflect
              </h3>
              <p className="text-gray-600">
                We'll remind you every 3-4 months to check in again. Watch
                subtle shifts become clear patterns.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-[#d4e4c8]">
              <div className="w-12 h-12 bg-[#e8f0e2] rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-[#556b2f]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Discover Growth
              </h3>
              <p className="text-gray-600">
                Visualize your evolution over time. See how your priorities,
                beliefs, and goals transform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - updated icons & colors */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          More Than Just a Journal
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-md border border-[#d4e4c8]">
            <ChartBarIcon className="w-8 h-8 text-[#6b8e23] mb-4" />
            <h3 className="font-semibold mb-2 text-gray-800">
              Visual Evolution
            </h3>
            <p className="text-sm text-gray-600">
              See your growth through beautiful charts and timelines
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md border border-[#d4e4c8]">
            <SparklesIcon className="w-8 h-8 text-[#8aa66e] mb-4" />
            <h3 className="font-semibold mb-2 text-gray-800">Deep Questions</h3>
            <p className="text-sm text-gray-600">
              Thoughtfully crafted prompts that spark real reflection
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md border border-[#d4e4c8]">
            <ClockIcon className="w-8 h-8 text-[#556b2f] mb-4" />
            <h3 className="font-semibold mb-2 text-gray-800">
              Gentle Reminders
            </h3>
            <p className="text-sm text-gray-600">
              Perfectly timed check-ins every 3-4 months
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md border border-[#d4e4c8]">
            <ShieldCheckIcon className="w-8 h-8 text-[#8aa66e] mb-4" />
            <h3 className="font-semibold mb-2 text-gray-800">
              Private & Secure
            </h3>
            <p className="text-sm text-gray-600">
              Your journey stays yours with encrypted storage
            </p>
          </div>
        </div>
      </section>

      {/* Sample Questions Preview - updated gradient */}
      <section className="px-6 py-16 bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions That Matter
          </h2>
          <p className="text-xl text-green-50 mb-12 max-w-2xl mx-auto">
            Each check-in invites you to explore different dimensions of your
            life
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              "On a scale of 1-10, how aligned are you with your career path?"
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              "Define 'success' in one sentence."
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              "Rank what matters most to you today: Career, Romance, Health,
              Creativity, Financial Security"
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-[#d4e4c8]">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Start Mapping Your Life Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of others on a journey of self-discovery. Free
            forever.
          </p>
          <Link
            href="/register"
            className="bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition shadow-lg hover:shadow-xl inline-flex items-center group text-lg"
          >
            Create Your Life Map
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
