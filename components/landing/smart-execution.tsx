"use client";

import React from "react";
import { Sparkles, CornerDownRight, ArrowDown } from "lucide-react";

export function SmartExecution() {
  return (
    <section id="workflow" className="scroll-mt-24 py-20 md:py-28 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide mb-4">
            Smart Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
            Where Thinking Flows <br className="hidden sm:inline" />
            Straight Into Execution
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Ideas don&apos;t arrive in straight lines. TodoMaster gives you the freedom to plan,
            structure, and execute naturally.
          </p>
        </div>

        {/* Visual Prompt-to-Execution Card Mockup (Matching ref1.webp) */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          {/* Top Input Prompt Card */}
          <div className="rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-7 shadow-sm mb-4">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 text-slate-400 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              </div>
              <span className="font-semibold text-slate-700">Sprint Roadmap & Architecture</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-900 mb-1.5">
                What do you want to build or plan?
              </label>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                Ship Next.js 16 production rollout with Clerk auth, PostgreSQL pooling, and team workspaces.
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-900 mb-1.5">Content Scope</div>
              <div className="space-y-1.5">
                <div className="h-2 rounded-full bg-slate-100 w-full" />
                <div className="h-2 rounded-full bg-slate-100 w-5/6" />
                <div className="h-2 rounded-full bg-slate-100 w-2/3" />
              </div>
            </div>
          </div>

          {/* Connection Vector */}
          <div className="flex items-center justify-center my-3 text-slate-400">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-600 shadow-xs">
              <ArrowDown className="w-3.5 h-3.5 text-sky-500" />
              <span>Instant AI structuring</span>
            </div>
          </div>

          {/* Bottom Generated Execution Output Card */}
          <div className="rounded-3xl bg-white border border-sky-200/80 p-6 sm:p-7 shadow-[0_15px_35px_-10px_rgba(56,189,248,0.12)]">
            <div className="text-[11px] font-bold text-sky-800 uppercase tracking-wider mb-2">
              Auto-Structured Action Card
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              Execute database migrations via Prisma ORM with connection pooling. Integrate Clerk
              session checks into middleware proxy, configure real-time task webhooks with Svix
              verification, and launch the floating sky landing page with 100% type safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
