import Link from "next/link";
import {
  ArrowRightIcon,
  SparklesIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LifeMap
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-gray-600 hover:text-gray-900 px-4 py-2 transition"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-lg hover:opacity-90 transition shadow-md hover:shadow-lg"
          >
            Sign up free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Map Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Evolving Self
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Watch your perspectives transform over time. LifeMap helps you
              track how your thoughts on career, relationships, and purpose
              evolve through regular check-ins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                Start Your Journey
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* Preview Image/Graphic */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-400 ml-2">lifemap.app</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Career Alignment
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    ↑ 15%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">
                    Work-Life Balance
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    Stable
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-green-400 to-teal-500 rounded-full"></div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Last check-in: Dec 2025
                    </span>
                    <span className="text-purple-600 font-semibold">
                      Next: Mar 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="px-6 py-16 bg-white/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            How LifeMap Works
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A simple rhythm of reflection that reveals the beautiful complexity
            of your growth
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Check In</h3>
              <p className="text-gray-600">
                Answer thoughtful questions about your life, values, and
                perspectives. Takes just 10-15 minutes.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Wait & Reflect</h3>
              <p className="text-gray-600">
                We'll remind you every 3-4 months to check in again. Watch
                subtle shifts become clear patterns.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Growth</h3>
              <p className="text-gray-600">
                Visualize your evolution over time. See how your priorities,
                beliefs, and goals transform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          More Than Just a Journal
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-md">
            <ChartBarIcon className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">Visual Evolution</h3>
            <p className="text-sm text-gray-600">
              See your growth through beautiful charts and timelines
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <SparklesIcon className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold mb-2">Deep Questions</h3>
            <p className="text-sm text-gray-600">
              Thoughtfully crafted prompts that spark real reflection
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <ClockIcon className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-semibold mb-2">Gentle Reminders</h3>
            <p className="text-sm text-gray-600">
              Perfectly timed check-ins every 3-4 months
            </p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md">
            <ShieldCheckIcon className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="font-semibold mb-2">Private & Secure</h3>
            <p className="text-sm text-gray-600">
              Your journey stays yours with encrypted storage
            </p>
          </div>
        </div>
      </section>

      {/* Sample Questions Preview */}
      <section className="px-6 py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Questions That Matter
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Each check-in invites you to explore different dimensions of your
            life
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              "On a scale of 1-10, how aligned are you with your career path?"
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              "Define 'success' in one sentence."
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              "Rank what matters most to you today: Career, Romance, Health,
              Creativity, Financial Security"
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Mapping Your Life Today
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of others on a journey of self-discovery. Free
            forever.
          </p>
          <Link
            href="/register"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition shadow-lg hover:shadow-xl inline-flex items-center group text-lg"
          >
            Create Your Life Map
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
          </Link>
          <p className="text-sm text-gray-400 mt-4">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
              <span className="font-semibold text-gray-800">LifeMap</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="/about" className="hover:text-gray-900">
                About
              </Link>
              <Link href="/privacy" className="hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gray-900">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-gray-900">
                Contact
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-4 md:mt-0">
              © 2026 LifeMap. Made for Calgary Hacks.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
