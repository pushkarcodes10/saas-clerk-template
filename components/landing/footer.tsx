"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function LandingFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative pt-20 pb-12 overflow-hidden bg-sky-gradient border-t border-sky-100">
      {/* Soft ambient background clouds */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-sky-200/40 via-sky-100/30 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Playful Yellow Sticky Note (Matching ref1.webp bottom) */}
        <div className="inline-block mb-10 transition-transform duration-300 hover:rotate-0 -rotate-3 cursor-default">
          <div className="relative p-5 sm:p-6 w-48 sm:w-56 rounded-2xl bg-[#fef08a] text-slate-900 shadow-md border border-amber-200 text-center">
            {/* Note tape top clip */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/70 backdrop-blur-xs rounded-sm border border-slate-200/60" />
            <span className="text-xs sm:text-sm font-semibold tracking-tight leading-snug block">
              Your space for tasks and ideas.
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-600 mb-6">
          <a href="#" className="hover:text-slate-900 transition-colors">
            Home
          </a>
          <a href="#features" className="hover:text-slate-900 transition-colors">
            Features
          </a>
          <a href="#planning" className="hover:text-slate-900 transition-colors">
            Planning
          </a>
          <a href="#pricing" className="hover:text-slate-900 transition-colors">
            Pricing
          </a>
          <Link href="/sign-up" className="hover:text-slate-900 transition-colors">
            Download
          </Link>
        </div>

        {/* Headings */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Simple Tasks. Powerful Productivity.
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mb-8 font-normal">
          Organize notes, sprints, and roadmaps seamlessly, fast, and distraction-free.
        </p>

        {/* Newsletter / Quick Email Input (Matching ref1.webp) */}
        <div className="max-w-md mx-auto mb-14">
          {subscribed ? (
            <div className="p-3.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Thank you! You&apos;re on the priority early-access list.</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center p-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100 transition-all"
            >
              <input
                type="email"
                required
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning
                className="flex-1 px-4 py-2 text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
              />
              <button
                type="submit"
                suppressHydrationWarning
                className="px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-semibold hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0"
              >
                Try For Free
              </button>
            </form>
          )}
        </div>

        {/* Social Links Row (Matching ref1.webp icons) */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-11 h-11 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white hover:scale-105 transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white hover:scale-105 transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* Dribbble / Web */}
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dribbble"
            className="w-11 h-11 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white hover:scale-105 transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.189 11.462c-.178-.027-2.738-.415-5.502.265-.123-.284-.254-.567-.393-.847 3.324-1.42 4.654-3.125 4.773-3.284 1.258 1.139 2.052 2.684 2.122 3.866zm-3.134-5.379c-.156.197-1.439 1.759-4.57 3.064-1.442-2.613-3.056-4.945-3.272-5.257 1.144-.397 2.373-.618 3.655-.618 1.638 0 3.167.481 4.453 1.309zm-9.366-4.148c.205.297 1.83 2.646 3.273 5.228-2.668.799-5.467.822-6.096.822-.058 0-.106-.002-.143-.004 1.127-2.518 3.163-4.555 5.679-5.352-.969-.475-2.072-.746-3.241-.746zm-7.744 7.217c.074.003.541.018 1.254.018 1.054 0 3.682-.047 6.32-.862.138.273.268.549.388.826-3.834 1.218-7.391 3.811-7.79 4.108-.344-1.246-.531-2.564-.531-3.924 0-.056.002-.11.004-.166h-.001zm1.268 5.753c.477-.348 3.791-2.735 7.42-3.882 1.036 2.695 1.579 5.374 1.696 6.002-3.794.757-7.25-1.076-9.116-2.12zm10.741 4.708c-.144-.69-.699-3.328-1.725-5.969 2.607-.688 4.965-.333 5.161-.301-.328 2.615-2.083 4.821-4.436 5.867z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white hover:scale-105 transition-all"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="pt-8 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>© 2026 TodoMaster. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
