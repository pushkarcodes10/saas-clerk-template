"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function LandingPricing() {
  const plans = [
    {
      name: "Basic",
      frequency: "Free",
      price: "$0",
      cta: "Get Started Free",
      popular: false,
      href: "/sign-up",
      note: "No credit card required",
      features: [
        "Create up to 50 active tasks",
        "Basic document editor & notes",
        "Folder organization",
        "Access on 1 device",
        "Standard security",
      ],
    },
    {
      name: "Standard",
      frequency: "Monthly",
      price: "$19",
      cta: "Get Standard Plan",
      popular: true,
      href: "/sign-up",
      note: "Includes 7-day free trial",
      features: [
        "Everything in Basic",
        "Unlimited tasks & documents",
        "Sync across all devices",
        "Export to PDF & DOCX",
        "30-day version history",
      ],
    },
    {
      name: "Premium",
      frequency: "Yearly",
      price: "$300",
      cta: "Get Premium Plan",
      popular: false,
      href: "/sign-up",
      note: "Includes priority support",
      features: [
        "Everything in Standard",
        "Real-time collaboration",
        "Team usage analytics",
        "Unlimited version history",
        "24/7 Priority support",
      ],
    },
  ];

  return (
    <section id="pricing" className="scroll-mt-24 py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold tracking-wide mb-4">
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-4">
            Smart Pricing For <br className="hidden sm:inline" />
            Modern Teams.
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Transparent plans designed to scale with individuals, teams, and fast-growing businesses.
          </p>
        </div>

        {/* 3 Pricing Cards (Matching ref1.webp) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-14">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? "bg-slate-50/80 border-2 border-slate-900 shadow-xl scale-[1.02] md:-translate-y-2"
                  : "bg-white border border-slate-200/80 shadow-xs hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-amber-400 text-amber-950 font-bold text-[10px] uppercase tracking-wider shadow-xs">
                  Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">{plan.name}</h3>

                <div className="flex items-baseline justify-between pb-6 mb-6 border-b border-slate-100">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {plan.frequency}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      {plan.price}
                    </span>
                    {plan.price !== "$0" && (
                      <span className="text-xs text-slate-500 font-normal">
                        {plan.frequency === "Monthly" ? "/mo" : "/yr"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Primary Button */}
                <Link
                  href={plan.href}
                  className={`w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center transition-all mb-8 ${
                    plan.popular
                      ? "bg-slate-950 text-white hover:bg-slate-800 shadow-sm"
                      : "bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {plan.cta}
                </Link>

                {/* Features Checklist */}
                <div className="space-y-3.5 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-600">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          plan.popular ? "text-slate-900" : "text-slate-400"
                        }`}
                      />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400 font-medium">
                {plan.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
