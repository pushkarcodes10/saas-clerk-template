"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  Star,
  Bookmark,
  Zap,
  ListTodo,
  Shield,
  Layers,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  BarChart3,
  Search,
  Check,
} from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Interactive demo task items in the floating card
  const [demoTasks, setDemoTasks] = useState([
    { id: 1, text: "Design quarterly OKR dashboard", done: true },
    { id: 2, text: "Sync database schema with Prisma", done: true },
    { id: 3, text: "Ship TodoMaster v2 production release", done: false },
  ]);

  const toggleDemoTask = (id: number) => {
    setDemoTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const features = [
    {
      icon: ListTodo,
      title: "Smart Task Organization",
      desc: "Effortlessly categorize, tag, and sort your tasks. Eliminate decision fatigue with intuitive priority views.",
    },
    {
      icon: Search,
      title: "Sub-Millisecond Search",
      desc: "Instant server-side full-text search with seamless pagination powered by PostgreSQL and Prisma ORM.",
    },
    {
      icon: Zap,
      title: "Keyboard-First Velocity",
      desc: "Crafted for speed. Add, complete, and organize your tasks without your fingers ever leaving the keyboard.",
    },
    {
      icon: BarChart3,
      title: "Progress & Velocity Insights",
      desc: "Visualize completion rates and weekly momentum so you and your team stay accountable and aligned.",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Instant Capture",
      desc: "Jot down ideas, bug fixes, or deliverables in seconds without breaking your workflow.",
    },
    {
      step: "02",
      title: "Smart Prioritization",
      desc: "Group high-impact tasks, set deadlines, and let intelligent sorting surface what truly matters.",
    },
    {
      step: "03",
      title: "Frictionless Execution",
      desc: "Check off milestones with fluid visual feedback and maintain daily deep work momentum.",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever",
      description: "Ideal for individuals starting their focused productivity journey.",
      features: [
        "Up to 3 active tasks simultaneously",
        "Fast search and pagination",
        "Full task completion tracking",
        "Clean, distraction-free interface",
        "Community support",
      ],
      cta: "Get Started Free",
      href: "/sign-up",
      highlight: false,
    },
    {
      name: "Pro Master",
      price: "$9.99",
      period: "/ month",
      description: "For professionals and creators who demand unlimited productivity.",
      features: [
        "Unlimited tasks and projects",
        "Instant task search & filtering",
        "Priority sorting & due dates",
        "Comprehensive velocity insights",
        "Priority email & chat support",
      ],
      cta: "Upgrade to Pro",
      href: "/subscribe",
      highlight: true,
      badge: "Most Popular",
    },
    {
      name: "Team",
      price: "$24",
      period: "/ month",
      description: "For high-velocity squads collaborating on shared sprint deliverables.",
      features: [
        "Everything in Pro Unlimited",
        "Unlimited team workspaces",
        "Collaborative task assignment",
        "Activity audit logs",
        "Dedicated onboarding & SLA",
      ],
      cta: "Contact Sales",
      href: "/sign-up",
      highlight: false,
    },
  ];

  const testimonials = [
    {
      quote:
        "TodoMaster cut my daily planning time in half. The speed and clean interface make staying on top of critical deliverables completely effortless.",
      name: "Sarah Jenkins",
      role: "Lead Product Manager",
      company: "Veloce Labs",
    },
    {
      quote:
        "I've tested dozens of task managers, but TodoMaster strikes the perfect balance between power and minimalism. It just stays out of your way.",
      name: "Mark Thorne",
      role: "Founder & Full-Stack Engineer",
      company: "Apex Stack",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070e11] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Outer Hero Frame (Preserves the reference design's framed luxury aesthetic) */}
      <div className="w-full p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-[1560px] min-h-[92vh] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden relative border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-14 bg-radial from-[#0e1d24] via-[#091418] to-[#050b0e]">
          {/* Subtle Ambient Mesh Glows & Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(14,165,233,0.08),transparent_50%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800c_1px,transparent_1px),linear-gradient(to_bottom,#8080800c_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* TOP NAVBAR */}
          <header className="relative z-20 flex items-center justify-between w-full">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Check className="w-5 h-5 text-slate-950 stroke-[3]" />
              </div>
              <span className="text-xl sm:text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
                TodoMaster
              </span>
            </Link>

            {/* Nav Links (Desktop) */}
            <nav className="hidden md:flex items-center space-x-9 text-sm text-slate-200/90 font-normal tracking-wide">
              <a
                href="#features"
                className="hover:text-white transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#workflow"
                className="hover:text-white transition-colors duration-200"
              >
                Workflow
              </a>
              <a
                href="#pricing"
                className="hover:text-white transition-colors duration-200"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="hover:text-white transition-colors duration-200"
              >
                Reviews
              </a>
            </nav>

            {/* Right Action / Auth */}
            <div className="flex items-center gap-4">
              {isLoaded && isSignedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    className="hidden sm:inline-block text-xs uppercase tracking-wider text-slate-300 hover:text-white transition mr-1 font-medium"
                  >
                    Dashboard
                  </Link>
                  <UserButton />
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/sign-in"
                    className="hidden sm:inline-block text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="bg-white text-slate-900 font-medium px-6 py-2.5 rounded-full text-sm hover:bg-slate-100 hover:shadow-lg transition-all duration-200 active:scale-95 shadow-sm"
                  >
                    Start Free
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white/90 hover:text-white p-1 rounded-lg focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </header>

          {/* Mobile Dropdown Nav */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-6 right-6 z-30 bg-[#081215]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col space-y-4 shadow-2xl animate-in fade-in duration-200">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-slate-200 hover:text-white"
              >
                Features
              </a>
              <a
                href="#workflow"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-slate-200 hover:text-white"
              >
                Workflow
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-slate-200 hover:text-white"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-slate-200 hover:text-white"
              >
                Reviews
              </a>
              <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                <Link
                  href="/sign-in"
                  className="w-full text-center py-2 text-sm text-slate-300 hover:text-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="w-full bg-white text-slate-900 font-semibold py-2.5 rounded-xl text-center text-sm"
                >
                  Start Free
                </Link>
              </div>
            </div>
          )}

          {/* MAIN HERO CONTENT ROW */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto py-12 sm:py-16">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Massive 3-line Headline matching reference rhythm */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-[0.94] mb-8 select-none">
                Master
                <br />
                <span className="font-normal text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-white to-amber-300">
                  Your Daily
                </span>
                <br />
                Productivity
              </h1>

              {/* Subtext and Rating row */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-10 pt-4">
                <p className="max-w-md text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  Transform daily chaos into crystal-clear execution. TodoMaster
                  delivers lightning-fast task capture, priority views, and
                  focused momentum with zero friction.
                </p>

                {/* Rating Badge */}
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                  <div>
                    <div className="text-2xl font-bold text-white leading-none">
                      4.9
                    </div>
                    <div className="text-xs text-slate-300/80 mt-1 whitespace-nowrap">
                      from 12,000+ users
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Interactive Live Task Card (Preserves the reference floating card UI) */}
            <div className="lg:col-span-5 flex justify-end">
              <div className="w-full max-w-[380px] bg-[#0c181c]/85 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.65)] text-white transition-all hover:border-white/25">
                {/* Card Title & Bookmark Pin */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                        Sprint Focus
                      </span>
                    </div>
                    <h3 className="text-xl font-medium tracking-tight text-white leading-tight">
                      Q4 Product Roadmap
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    aria-label="Pin taskboard"
                    className={`p-2.5 rounded-full transition-colors ${
                      isSaved
                        ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                        : "bg-white/10 hover:bg-white/20 text-white/80 hover:text-white"
                    }`}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isSaved ? "fill-amber-400" : ""}`}
                    />
                  </button>
                </div>

                {/* Date & Remind pills (Matching Feb 11 / Mar 25 pills) */}
                <div className="grid grid-cols-2 gap-2.5 mb-3">
                  <div className="bg-[#071114]/85 border border-white/10 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-200 font-medium">Due Today</span>
                    </div>
                  </div>
                  <div className="bg-[#071114]/85 border border-white/10 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <span className="text-slate-200 font-medium">2:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Live Interactive Task Checklist */}
                <div className="bg-[#071114]/75 border border-white/5 rounded-2xl p-3.5 mb-4 text-left">
                  <span className="text-[11px] uppercase tracking-wider text-slate-400 block mb-2 font-medium">
                    Active Tasks (Click to toggle)
                  </span>
                  <div className="space-y-2">
                    {demoTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleDemoTask(task.id)}
                        className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-200 hover:text-white transition group py-1"
                      >
                        {task.done ? (
                          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-500 shrink-0 group-hover:text-amber-400" />
                        )}
                        <span
                          className={`truncate ${
                            task.done
                              ? "line-through text-slate-500"
                              : "text-slate-200"
                          }`}
                        >
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Tier and Capacity row */}
                <div className="flex items-baseline justify-between mb-5">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-semibold tracking-tight text-white">
                      $0
                    </span>
                    <span className="text-sm text-slate-400 ml-1">
                      /Free tier
                    </span>
                  </div>
                  <span className="text-xs text-slate-300 font-medium bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                    3 tasks free • Unlimited on Pro
                  </span>
                </div>

                {/* Direct Action Button */}
                <Link
                  href={isSignedIn ? "/dashboard" : "/sign-up"}
                  className="w-full bg-white text-slate-950 font-semibold py-3.5 rounded-xl hover:bg-slate-100 active:scale-[0.98] transition-all duration-200 shadow-lg text-sm tracking-wide block text-center"
                >
                  {isSignedIn ? "Open My Dashboard" : "Start Using TodoMaster"}
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom subtle ambient footer label */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-400/80 pt-2 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Powered by
              Next.js 16, PostgreSQL & Prisma ORM
            </span>
            <span className="hidden sm:inline">
              Secure authentication via Clerk
            </span>
          </div>
        </div>
      </div>

      {/* CORE FEATURES SECTION (#features) */}
      <section
        id="features"
        className="py-24 px-6 sm:px-10 max-w-7xl mx-auto w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest block mb-2">
              Engineered For Speed
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              Powerful Features for Focused Execution
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            Eliminate cognitive clutter with an interface optimized for
            immediate response, clarity, and zero distractions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const IconComp = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#0b171a]/70 border border-white/10 rounded-3xl p-7 hover:border-amber-400/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed font-light">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS / WORKFLOW SECTION (#workflow) */}
      <section
        id="workflow"
        className="py-24 px-6 sm:px-10 bg-[#061013] border-y border-white/5 w-full"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest block mb-2">
              Simple 3-Step Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight mb-4">
              How TodoMaster Streamlines Your Day
            </h2>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              From thought to execution in seconds without heavy process overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#0b171a]/50 border border-white/10 rounded-3xl p-8 relative hover:border-amber-400/30 transition-all"
              >
                <div className="text-5xl font-extralight text-amber-400/30 mb-6 font-mono">
                  {step.step}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USER TESTIMONIALS SECTION (#testimonials) */}
      <section
        id="testimonials"
        className="py-24 px-6 sm:px-10 bg-[#061013] border-t border-white/5 w-full"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest block mb-2">
              Loved by Professionals
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
              What High-Velocity Teams Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#0b171a]/70 border border-white/10 rounded-3xl p-8 flex flex-col justify-between"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-sm text-slate-300 leading-relaxed font-light mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white block">
                      {t.name}
                    </span>
                    <span className="text-slate-400">{t.role}</span>
                  </div>
                  <span className="text-amber-400/90 font-medium font-mono text-[11px]">
                    {t.company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#04080a] border-t border-white/10 pt-16 pb-12 px-6 sm:px-10 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <span className="text-xl font-medium text-white">TodoMaster</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-light mb-6">
                The modern productivity system designed for seamless task
                execution, smart organization, and continuous personal focus.
              </p>
            </div>

            <div className="md:col-span-7 flex flex-col sm:flex-row justify-between gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3">
                  Product
                </h4>
                <ul className="space-y-2 text-xs text-slate-400 font-light">
                  <li><a href="#features" className="hover:text-white">Features</a></li>
                  <li><a href="#workflow" className="hover:text-white">Workflow</a></li>
                  <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                  <li><Link href="/subscribe" className="hover:text-white">Pro Upgrade</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3">
                  Account
                </h4>
                <ul className="space-y-2 text-xs text-slate-400 font-light">
                  <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                  <li><Link href="/sign-in" className="hover:text-white">Sign In</Link></li>
                  <li><Link href="/sign-up" className="hover:text-white">Register Free</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-slate-300 font-semibold mb-3">
                  Technology
                </h4>
                <p className="text-xs text-slate-400 font-light mb-2">
                  Next.js 16 & React 19
                </p>
                <p className="text-xs text-slate-400 font-light">
                  Prisma ORM & PostgreSQL
                </p>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} TodoMaster Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-400 cursor-pointer">Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
