"use client";

import React from "react";
import Link from "next/link";
import {
  PenLine,
  Heart,
  MessageSquare,
  Users,
  Sparkles,
  ArrowRight,
  Code2,
  CheckCircle,
} from "lucide-react";

export function FeatureWalkthrough() {
  return (
    <section id="features" className="scroll-mt-24 py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide mb-4">
            The Future of Task Management
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
            Master Your Execution with <br className="hidden sm:inline" />
            Digital Workcards
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            The future of productivity designed to keep your projects connected and your
            workflow clutter-free.
          </p>
        </div>

        {/* Feature Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left Text */}
          <div className="lg:col-span-5 text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Revolutionary Task <br className="hidden sm:inline" />
              Format
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              No more bloated, unresponsive boards. Create powerful digital workcards with rich
              markdown, embedded metrics, subtasks, and instant keyboard shortcuts.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
            >
              <span>Start Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Right Floating Card Mockup (Matching Electrical Engineering card from ref1.webp) */}
          <div className="lg:col-span-7">
            <div className="max-w-md mx-auto lg:ml-auto p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.08)] hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  System Architecture
                </span>
                <button
                  type="button"
                  aria-label="Edit card"
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                >
                  <PenLine className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Distributed Event Bus & Webhook Sync
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                High-throughput message pipeline decoupling background tasks from the API layer.
                Guarantees at-least-once delivery with exponential backoff retry policies and
                real-time database consistency.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-slate-400 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer">
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                    <span className="text-[11px] font-medium text-slate-600">24</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-sky-500 transition-colors cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium text-slate-600">8</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium text-slate-600">3 assignees</span>
                  </div>
                </div>
                <span className="text-slate-400">•••</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Row 2 (Alternating Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Floating Card Mockup (Matching Heisenberg's Uncertainty / Tech card from ref1.webp) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="max-w-md mx-auto lg:mr-auto p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-[0_15px_35px_-10px_rgba(15,23,42,0.08)] hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <span className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider">
                  Automated Velocity
                </span>
                <button
                  type="button"
                  aria-label="Edit card"
                  className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                >
                  <PenLine className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Predictive Cycle-Time Scoring
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4 font-normal">
                Statistical modeling estimates sprint completion intervals based on past PR cycle
                times and developer capacity:
              </p>

              {/* Code / formula preview box */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 font-mono text-[11px] text-slate-700 mb-6">
                <code>{`T_estimate = (O + 4M + P) / 6 ± σ_sprint`}</code>
                <div className="text-[10px] text-emerald-600 mt-1 font-sans font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Variance bounded within 4.2% historical margin</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-slate-400 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 hover:text-rose-500 transition-colors cursor-pointer">
                    <Heart className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium text-slate-600">42</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-sky-500 transition-colors cursor-pointer">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium text-slate-600">12</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium text-slate-600">5 engineers</span>
                  </div>
                </div>
                <span className="text-slate-400">•••</span>
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="lg:col-span-5 text-left order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Powerful, Flexible <br className="hidden sm:inline" />
              Digital Notes & Tasks
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              Create a modern workflow with cards that keep your information connected and fast to
              access. Seamlessly organize dependencies without breaking mental focus.
            </p>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
            >
              <span>Start Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
