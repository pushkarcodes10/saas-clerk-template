"use client";

import React from "react";
import Link from "next/link";
import {
  CalendarDays,
  CheckSquare,
  BookOpen,
  Clock,
  Plus,
  ArrowRight,
} from "lucide-react";

export function EffortlessPlanning() {
  return (
    <section id="planning" className="scroll-mt-24 py-20 md:py-28 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide mb-4">
            Planning
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
            Planning that feels easy <br className="hidden sm:inline" />
            and effortless
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Keep ideas and tasks together. Embed tasks in your documents to stay connected to
            what matters.
          </p>
        </div>

        {/* 4 Pastel Floating Vertical Cards (Matching ref1.webp) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* 1. Calendar Card (Peach) */}
          <div className="rounded-3xl p-6 bg-white border border-slate-200/70 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)] flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fed7aa] flex items-center justify-center text-amber-950 mb-5 shadow-xs">
                <CalendarDays className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Calendar</h3>
              <p className="text-xs text-slate-500 mb-6">
                Timeline orchestration with synchronized milestones
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fed7aa]/50 border border-[#fed7aa] text-amber-950">
              <div className="text-xl font-extrabold tracking-tight">18 June</div>
              <div className="text-xs font-semibold text-amber-900/80 mt-0.5">Today</div>
              <div className="text-[11px] text-amber-900/60 mt-1">Monday · 4 scheduled events</div>
            </div>
          </div>

          {/* 2. Tasks Card (Lavender) */}
          <div className="rounded-3xl p-6 bg-white border border-slate-200/70 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)] flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#e9d5ff] flex items-center justify-center text-purple-950 mb-5 shadow-xs">
                <CheckSquare className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Tasks</h3>
              <p className="text-xs text-slate-500 mb-6">
                Dynamic checklists with instant completion states
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#e9d5ff]/50 border border-[#e9d5ff] text-purple-950 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="w-3.5 h-3.5 rounded-sm bg-purple-300 flex items-center justify-center text-[9px] text-purple-950 font-bold">✓</span>
                <span className="line-through text-purple-800/70">Write report</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="w-3.5 h-3.5 rounded-sm bg-white border border-purple-400" />
                <span>Plan schedule</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="w-3.5 h-3.5 rounded-sm bg-white border border-purple-400" />
                <span>Update tracker</span>
              </div>
              <div className="pt-1 text-[11px] font-semibold text-purple-800 flex items-center gap-1 cursor-pointer">
                <Plus className="w-3 h-3" />
                <span>Add Task</span>
              </div>
            </div>
          </div>

          {/* 3. Journal Card (Baby Cyan) */}
          <div className="rounded-3xl p-6 bg-white border border-slate-200/70 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)] flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#bae6fd] flex items-center justify-center text-sky-950 mb-5 shadow-xs">
                <BookOpen className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Journal</h3>
              <p className="text-xs text-slate-500 mb-6">
                Reflective documentation connected to daily deliverables
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#bae6fd]/50 border border-[#bae6fd] text-sky-950">
              <div className="text-xs font-bold text-sky-900 mb-1">Today</div>
              <p className="text-[11px] text-sky-900/80 leading-relaxed">
                A journal captures today&apos;s moments, thoughts, and reflections, helping you
                stay connected to what truly matters.
              </p>
            </div>
          </div>

          {/* 4. Reminders Card (Soft Rose) */}
          <div className="rounded-3xl p-6 bg-white border border-slate-200/70 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.06)] flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-200 flex items-center justify-center text-rose-950 mb-5 shadow-xs">
                <Clock className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Reminders</h3>
              <p className="text-xs text-slate-500 mb-6">
                Time-sensitive notifications that keep momentum high
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-100/70 border border-rose-200 text-rose-950 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-bold text-rose-800">2:00</span>
                <span className="text-rose-900/80 font-medium truncate ml-2">Stay hydrated throughout the day</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-bold text-rose-800">3:10</span>
                <span className="text-rose-900/80 font-medium truncate ml-2">Take regular short work breaks</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-mono font-bold text-rose-800">4:10</span>
                <span className="text-rose-900/80 font-medium truncate ml-2">Review pull requests</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Pill Button */}
        <div className="text-center mb-16">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
