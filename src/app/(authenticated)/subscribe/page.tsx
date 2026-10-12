"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check, Zap, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

export default function SubscribePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEndsAt, setSubscriptionEndsAt] = useState<string | null>(null);

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
    <div className="min-h-screen bg-[#070e11] text-slate-100 flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-xl bg-[#0d181c] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Upgrade to TodoMaster Pro
          </h1>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Unlock unlimited tasks, smart AI prioritization, and collaborative workspaces.
          </p>
        </div>

        {isSubscribed ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center mb-6">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-lg font-semibold text-white mb-1">
              You are currently on the Pro Plan!
            </h3>
            <p className="text-xs text-slate-300">
              {subscriptionEndsAt
                ? `Active until: ${new Date(subscriptionEndsAt).toLocaleDateString()}`
                : "Active subscription"}
            </p>
            <Link
              href="/dashboard"
              className="mt-5 inline-block bg-white text-slate-950 font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-slate-100 transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div>
            <div className="bg-[#081215] border border-white/10 rounded-2xl p-6 mb-6">
              <div className="flex justify-between items-baseline mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Pro Unlimited</h3>
                  <p className="text-xs text-slate-400">Everything in Free + powerful boosts</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-white">$9.99</span>
                  <span className="text-xs text-slate-400"> / month</span>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" /> Unlimited tasks & projects (no 3-todo limit)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" /> AI-assisted task breakdown & subtasks
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" /> Priority sorting & smart deadline reminders
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-amber-400" /> Full pagination & instant search
                </li>
              </ul>
            </div>

            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-semibold py-3.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              {loading ? "Activating Pro..." : "Activate Pro Membership ($9.99/mo)"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
