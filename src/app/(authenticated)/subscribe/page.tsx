"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Check,
  Zap,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  RefreshCw,
  Layers,
  ArrowRight,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function SubscribePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEndsAt, setSubscriptionEndsAt] = useState<string | null>(null);
  const [annualBilling, setAnnualBilling] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch("/api/subscription");
        if (res.ok) {
          const data = await res.json();
          setIsSubscribed(data.isSubscribed);
          setSubscriptionEndsAt(data.subscriptionEndsAt);
        }
      } catch (err) {
        console.error("Failed to fetch subscription status:", err);
      }
    }
    checkStatus();
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/subscription", {
        method: "POST",
      });
      if (res.ok) {
        setIsSubscribed(true);
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Failed to upgrade subscription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-sky-100 selection:text-sky-900">
      {/* Top Floating Capsule Bar */}
      <div className="pt-4 sm:pt-6 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <nav className="flex items-center justify-between px-5 sm:px-7 py-3 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>

          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
            </div>
            <span>
              Todo<span className="text-slate-500 font-normal">Master</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <UserButton />
          </div>
        </nav>
      </div>

      {/* Main Content Area with Sky Gradient Header */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full flex flex-col items-center">
        {/* Section Pill Badge & Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Membership & Billing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
            Upgrade Your Productivity With{" "}
            <span className="font-serif-italic font-normal text-slate-800">
              TodoMaster Pro
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-normal">
            Unlock unlimited tasks, real-time cloud synchronization, priority sorting, and team
            collaboration.
          </p>

          {/* Billing Switch Pill */}
          {!isSubscribed && (
            <div className="inline-flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 mt-6 text-xs font-medium">
              <button
                type="button"
                onClick={() => setAnnualBilling(false)}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  !annualBilling
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setAnnualBilling(true)}
                className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  annualBilling
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Save 20%
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Card Area */}
        {isSubscribed ? (
          /* Active Subscription State Card */
          <div className="w-full max-w-xl rounded-3xl p-8 sm:p-10 bg-emerald-50/60 border border-emerald-200 text-center shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-[#bae6fd] flex items-center justify-center text-sky-950 mx-auto mb-5 shadow-xs">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              You are currently on the Pro Plan!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-6">
              Your account has full unlimited access to high-velocity task management, auto-prioritization,
              and cross-device synchronization.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-emerald-200 text-xs font-medium text-emerald-900 mb-8 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {subscriptionEndsAt
                  ? `Active until: ${new Date(subscriptionEndsAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`
                  : "Active Pro Subscription"}
              </span>
            </div>

            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 text-white font-medium text-xs hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Plan Comparison Grid */
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Free Tier Card */}
            <div className="rounded-3xl p-8 bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Starter Free</h3>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    Current Tier
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                  <span className="text-4xl font-extrabold text-slate-900 tracking-tight">$0</span>
                  <span className="text-xs text-slate-500">/ forever</span>
                </div>

                <div className="space-y-3.5 text-xs text-slate-600 mb-8">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Up to 3 active tasks simultaneously</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Basic server-side search</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Standard completion tracking</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <span className="w-4 h-4 flex items-center justify-center text-xs">—</span>
                    <span>No subtask breakdowns</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-400">
                    <span className="w-4 h-4 flex items-center justify-center text-xs">—</span>
                    <span>No export to PDF / DOCX</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="w-full py-3 rounded-full text-xs font-semibold bg-slate-100 text-slate-400 cursor-not-allowed"
              >
                Current Active Plan
              </button>
            </div>

            {/* Pro Unlimited Card (Highlighted with StackNote Aesthetic) */}
            <div className="rounded-3xl p-8 bg-white border-2 border-slate-950 shadow-xl relative flex flex-col justify-between scale-[1.02] md:-translate-y-1">
              {/* Popular Badge */}
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-bold text-[10px] uppercase tracking-wider shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Recommended</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Pro Unlimited</h3>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
                    Everything Included
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                  <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    {annualBilling ? "$7.99" : "$9.99"}
                  </span>
                  <span className="text-xs text-slate-500">
                    {annualBilling ? "/ month, billed annually" : "/ month"}
                  </span>
                </div>

                <div className="space-y-3.5 text-xs text-slate-700 mb-8 font-medium">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited tasks & workspaces (no 3-task limit)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant full-text sub-millisecond search</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Priority sorting & deadline reminders</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Export roadmaps to PDF & CSV</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>24/7 Priority developer support & SLA</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full py-3.5 rounded-full text-xs font-semibold bg-slate-950 hover:bg-slate-800 text-white shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>
                  {loading
                    ? "Activating Pro Membership..."
                    : `Activate Pro Membership (${annualBilling ? "$7.99/mo" : "$9.99/mo"})`}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>256-bit Bank Grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Cancel Anytime in 1-Click</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Instant Workspace Sync</span>
          </div>
        </div>
      </main>
    </div>
  );
}
