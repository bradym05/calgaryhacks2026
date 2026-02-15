"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  ArrowRightIcon,
  SparklesIcon,
  ChartBarIcon,
  ClockIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  HeartIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

import { useAuth } from "@/services/AuthContext";
import questions from "@/services/questions.json";
import Footer from "@/components/Footer";
import SnapshotPage from "@/pages/snapshots";

const CTA_PRIMARY =
  "bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] text-white px-8 py-4 rounded-xl font-semibold";
const CTA_SECONDARY =
  "bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-semibold border-2 border-[#d4e4c8]";

function StatCard({
  value,
  label,
  icon,
}: {
  value: React.ReactNode;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="text-center group cursor-pointer">
      <div className="text-3xl font-bold text-[#6b8e23] group-hover:scale-110 transition-transform">
        {value}
      </div>
      <div className="text-sm text-gray-500 flex items-center justify-center gap-1">
        {icon}
        <span>{label}</span>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    icon: (
      <ChartBarIcon className="w-8 h-8 text-[#6b8e23] mb-4" />
    ),
    title: "Visual Evolution",
    body: "See your growth through beautiful charts and timelines",
  },
  {
    icon: (
      <SparklesIcon className="w-8 h-8 text-[#8aa66e] mb-4" />
    ),
    title: "Deep Questions",
    body: "Thoughtfully crafted prompts that spark real reflection",
  },
  {
    icon: (
      <ClockIcon className="w-8 h-8 text-[#556b2f] mb-4" />
    ),
    title: "Gentle Reminders",
    body: "Perfectly timed check-ins every 3-4 months",
  },
  {
    icon: (
      <ShieldCheckIcon className="w-8 h-8 text-[#8aa66e] mb-4" />
    ),
    title: "Private & Secure",
    body: "Your journey stays yours with encrypted storage",
  },
];

const SAMPLE_QUESTIONS = [
  "On a scale of 1-10, how aligned are you with your career path?",
  "Define 'success' in one sentence.",
  "Rank what matters most to you today: Career, Romance, Health, Creativity, Financial Security",
];

export default function Home() {
  const router = useRouter();
  const { user, logOut, signInWithGoogle, loading } = useAuth();

  const startJourney = () => {
    const keys = Object.keys(questions);
    if (!keys.length) return;
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    router.push(`/question/${randomKey}`);
  };

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const getUserName = () => {
    if (!user?.email) return "there";
    return user.email.split("@")[0].split(".")[0] || "there";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#f8f4ed] to-[#e8f0e2]">
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <Link href="/" className="inline-flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="currentColor"
              className="text-[#6b8e23]"
            >
              <path d="M11.774 2a10 10 0 1 1-10 10a10 10 0 0 1 10-10m5.5 5.98l-1.112 1.732a4.9 4.9 0 0 1 .535 2.246a4.96 4.96 0 0 1-4.956 4.964h-.009a4.8 4.8 0 0 1-2.232-.535L7.754 17.51a6.826 6.826 0 0 0 9.652-9.34Zm-5.542-2.855a6.833 6.833 0 0 0-6.832 6.82v.013a6.77 6.77 0 0 0 1.332 4.052A8 8 0 0 1 7.4 14.4a10 10 0 0 1 1.187-1.06a8.17 8.17 0 0 1 4.833-1.575a8 8 0 0 1 1.458.132l.284.058a3.428 3.428 0 1 0-6.855-.151v.151a2 2 0 0 0 .015.312l.018.155a8.2 8.2 0 0 0-1.292 1.2a5 5 0 0 1-.283-1.649A4.96 4.96 0 0 1 11.714 7h.008a4.8 4.8 0 0 1 2.235.537l1.732-1.124a6.67 6.67 0 0 0-3.957-1.288m1.722 7.263a7.8 7.8 0 0 0-4.567 1.47a3.43 3.43 0 0 0 6.213-1.291a7.7 7.7 0 0 0-1.646-.179" />
            </svg>
            <span className="text-xl font-bold bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] bg-clip-text text-transparent">
              LifeMap
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#d4e4c8]">
                    <UserCircleIcon className="w-5 h-5 text-[#6b8e23]" />
                    <span className="text-gray-700 text-sm font-medium">
                      {getUserName()}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 transition text-sm rounded-lg"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white px-5 py-2 rounded-lg hover:opacity-90 transition shadow-md"
                >
                  Sign in with Google
                </button>
              )}
            </>
          )}
        </div>
      </nav>

      <section className="relative min-h-[90vh] flex items-center px-6 py-16 md:py-24 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8f0e2]/30 via-transparent to-[#c4d9a8]/30" />
          <div
            className="w-full h-full bg-cover bg-center opacity-20 scale-110 animate-ken-burns"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            }}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#d4e4c8] shadow-sm">
              <span className="w-2 h-2 bg-[#6b8e23] rounded-full animate-pulse mr-2" />
              <span className="text-sm font-medium text-[#556b2f]">
                {user ? (
                  <>✨ Welcome back, {getUserName()}! Ready to reflect?</>
                ) : (
                  <>✨ New: 3-4 Month Check-ins</>
                )}
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              {user ? (
                <>
                  <span className="text-gray-800">Continue Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#6b8e23] to-[#a8c686] bg-clip-text text-transparent">
                    Growth Journey
                  </span>
                </>
              ) : (
                <>
                  <span className="text-gray-800">Map Your</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#6b8e23] to-[#a8c686] bg-clip-text text-transparent">
                    Evolving Self
                  </span>
                </>
              )}
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 max-w-lg leading-relaxed relative pl-6 border-l-4 border-[#8aa66e]">
              {user ? (
                <>
                  You've started mapping your journey. Continue where you left
                  off and watch your perspectives evolve.
                </>
              ) : (
                <>
                  Watch your perspectives transform over time. LifeMap helps you
                  track how your thoughts on career, relationships, and purpose
                  evolve through regular check-ins.
                </>
              )}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={startJourney}
                className={`${CTA_PRIMARY} group relative overflow-hidden transition-all duration-300 hover:shadow-2xl`}
              >
                <span className="relative z-10 flex items-center justify-center text-lg">
                  {user ? "Continue Reflecting" : "Start Your Journey"}{" "}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </span>
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById(user ? "snapshots" : "how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`${CTA_SECONDARY} group`}
              >
                <span className="relative z-10 flex items-center justify-center text-lg">
                  {user ? "View Your Snapshot" : "See How It Works"}
                </span>
              </button>
            </div>

            <div className="flex gap-8 pt-8">
              {user ? (
                <>
                  <StatCard
                    value={12}
                    label="Reflections"
                    icon={
                      <HeartIcon className="w-4 h-4 text-[#6b8e23]" />
                    }
                  />
                  <StatCard
                    value={3}
                    label="Check-ins"
                    icon={<ClockIcon className="w-4 h-4 text-[#6b8e23]" />}
                  />
                  <StatCard
                    value="85%"
                    label="Growth"
                    icon={<ChartBarIcon className="w-4 h-4 text-[#6b8e23]" />}
                  />
                </>
              ) : (
                <>
                  <StatCard
                    value="50+"
                    label="Reflection Prompts"
                    icon={
                      <HeartIcon className="w-4 h-4 text-[#6b8e23]" />
                    }
                  />
                  <StatCard
                    value="3-4 mo"
                    label="Check-in Rhythm"
                    icon={<ClockIcon className="w-4 h-4 text-[#6b8e23]" />}
                  />
                  <StatCard
                    value="100%"
                    label="Private & Secure"
                    icon={
                      <ShieldCheckIcon className="w-4 h-4 text-[#6b8e23]" />
                    }
                  />
                </>
              )}
            </div>

            {user && (
              <div className="pt-4 flex items-center gap-3 text-sm text-gray-600">
                <BookOpenIcon className="w-5 h-5 text-[#8aa66e]" />
                <span>
                  Last reflection:{" "}
                  <span className="font-medium text-[#6b8e23]">2 days ago</span>
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>
                  Next check-in:{" "}
                  <span className="font-medium text-[#6b8e23]">
                    in 2 months
                  </span>
                </span>
              </div>
            )}
          </div>

          <div className="relative">
            <div
              className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border ${
                user ? "border-[#8aa66e]" : "border-[#d4e4c8]/60"
              } hover:shadow-3xl transition-all duration-500`}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                </div>
                <span className="text-sm text-gray-400 ml-2 font-mono">
                  {user
                    ? `${getUserName()}'s journey`
                    : "lifemap.app/dashboard"}
                </span>

                <div className="ml-auto flex items-center space-x-1">
                  <span
                    className={`w-2 h-2 ${
                      user ? "bg-green-500" : "bg-green-400"
                    } rounded-full animate-pulse`}
                  />
                  <span className="text-xs text-gray-400">Live</span>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Career Alignment",
                    value: "75%",
                    meta: "↑ 15% vs last quarter",
                    width: "75%",
                  },
                  {
                    title: "Work-Life Balance",
                    value: "50%",
                    meta: "→ Stable",
                    width: "50%",
                  },
                  {
                    title: "Personal Growth",
                    value: "82%",
                    meta: "↑ 28% accelerating",
                    width: "82%",
                  },
                ].map((s) => (
                  <div key={s.title} className="group/item cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 group-hover/item:text-[#6b8e23] transition-colors">
                        {s.title}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-[#6b8e23]">
                          {s.meta.split(" ")[0]}
                        </span>
                        <span className="text-xs text-gray-400">
                          {s.meta.split(" ").slice(1).join(" ")}
                        </span>
                      </div>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#6b8e23] to-[#8aa66e] rounded-full transition-all duration-1000"
                        style={{ width: s.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-[#d4e4c8] hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#e8f0e2] rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-5 h-5 text-[#6b8e23]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">
                    {user ? "Your Streak" : "Reflection Streak"}
                  </p>
                  <p className="text-lg font-bold text-[#6b8e23]">
                    {user ? "8 weeks" : "12 weeks"}
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-[#d4e4c8] hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#e8f0e2] rounded-lg flex items-center justify-center">
                  <ChartBarIcon className="w-5 h-5 text-[#6b8e23]" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">
                    {user ? "Your Insights" : "Insights Gained"}
                  </p>
                  <p className="text-lg font-bold text-[#6b8e23]">
                    {user ? "12 patterns" : "24 patterns"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#8aa66e] rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#8aa66e] rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </section>

      {user ? (
        <section id="snapshots" className="scroll-mt-16">
          <SnapshotPage />
        </section>
      ) : (
        <>
          <section
            id="how-it-works"
            className="px-6 py-16 bg-gradient-to-b from-[#f8f4ed] to-white"
          >
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
                How LifeMap Works
              </h2>
              <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
                A simple rhythm of reflection that reveals the beautiful
                complexity of your growth
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    n: "1",
                    title: "Check In",
                    body: "Answer thoughtful questions about your life, values, and perspectives. Takes just 10-15 minutes.",
                  },
                  {
                    n: "2",
                    title: "Wait & Reflect",
                    body: "We'll remind you every 3-4 months to check in again. Watch subtle shifts become clear patterns.",
                  },
                  {
                    n: "3",
                    title: "Discover Growth",
                    body: "Visualize your evolution over time. See how your priorities, beliefs, and goals transform.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-[#d4e4c8]"
                  >
                    <div className="w-12 h-12 bg-[#e8f0e2] rounded-lg flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-[#6b8e23]">
                        {c.n}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {c.title}
                    </h3>
                    <p className="text-sm text-gray-600">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="px-6 py-16 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              More Than Just a Journal
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="p-6 bg-white rounded-xl shadow-md border border-[#d4e4c8]"
                >
                  {f.icon}
                  <h3 className="font-semibold mb-2 text-gray-800">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-600">{f.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 py-16 bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Questions That Matter
              </h2>
              <p className="text-xl text-green-50 mb-12 max-w-2xl mx-auto">
                Each check-in invites you to explore different dimensions of
                your life
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
                {SAMPLE_QUESTIONS.map((q) => (
                  <div
                    key={q}
                    className="bg-white/15 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                  >
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </section>

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
                className="bg-gradient-to-r from-[#8aa66e] to-[#a8c686] text-white px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition shadow-lg inline-flex items-center group text-lg"
              >
                Create Your Life Map
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
              </Link>
              <p className="text-sm text-gray-500 mt-4">
                No credit card required • Cancel anytime
              </p>
            </div>
          </section>
          <Footer />
        </>
      )}
    </div>
  );
}
