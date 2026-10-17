"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  MessageSquareText,
  CloudUpload,
  Command,
  Moon,
  Zap,
  ArrowRight,
} from "lucide-react";

export function BentoFeatures() {
  const bentoItems = [
    {
      title: "Confidential & Protected",
      desc: "Top-tier encryption ensuring your private data and workspaces remain completely safe and secure.",
      icon: ShieldCheck,
      bgColor: "bg-[#fed7aa]",
      textColor: "text-amber-900",
      borderColor: "border-[#fed7aa]",
    },
    {
      title: "Quick Assistance",
      desc: "Get instant expert guidance, contextual onboarding tips, and technical support whenever you need it.",
      icon: MessageSquareText,
      bgColor: "bg-[#fef08a]",
      textColor: "text-amber-900",
      borderColor: "border-[#fef08a]",
    },
    {
      title: "Instant Cloud Sync",
      desc: "Seamlessly sync and backup your tasks, states, and team roadmaps across every device in real-time.",
      icon: CloudUpload,
      bgColor: "bg-[#bae6fd]",
      textColor: "text-sky-950",
      borderColor: "border-[#bae6fd]",
    },
    {
      title: "Key Shortcuts",
      desc: "Boost velocity using intuitive keyboard shortcuts for an effortless, keyboard-first workflow.",
      icon: Command,
      bgColor: "bg-[#fef08a]",
      textColor: "text-amber-900",
      borderColor: "border-[#fef08a]",
    },
    {
      title: "Adaptive Theme Engine",
      desc: "Relieve eye strain with an eye-friendly night theme and a luminous daylight canvas crafted for focus.",
      icon: Moon,
      bgColor: "bg-[#e9d5ff]",
      textColor: "text-purple-950",
      borderColor: "border-[#e9d5ff]",
    },
    {
      title: "Super-fast Velocity",
      desc: "Experience lightning-fast sub-millisecond response times with zero lag and instant local caching.",
      icon: Zap,
      bgColor: "bg-[#fed7aa]",
      textColor: "text-amber-900",
      borderColor: "border-[#fed7aa]",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide mb-4">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
            Everything You Need <br className="hidden sm:inline" />
            In One App
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Organize, create, and collaborate effortlessly with powerful task-tracking and
            productivity tools.
          </p>
        </div>

        {/* 6 Bento Grid Cards (Matching ref1.webp) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {bentoItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl p-7 bg-white border border-slate-200/70 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.05)] hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bgColor} flex items-center justify-center ${item.textColor} mb-6 shadow-xs`}
                  >
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center mb-16">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
          >
            <span>See All Features</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
