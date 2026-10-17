"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserButton, useAuth } from "@clerk/nextjs";
import { CheckCircle2, Menu, X, ArrowRight } from "lucide-react";

export function LandingNavbar() {
  const { isSignedIn, isLoaded } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-3 sm:top-4 z-50 px-4 sm:px-6 max-w-6xl mx-auto w-full transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className="flex items-center justify-between px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-slate-900 text-lg tracking-tight group"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
            <CheckCircle2 className="w-4 h-4 text-sky-300" />
          </div>
          <span className="font-semibold text-slate-900 tracking-tight">
            Todo<span className="text-slate-500 font-normal">Master</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-[14px] font-medium text-slate-600">
          <a
            href="#features"
            className="hover:text-slate-900 transition-colors py-1"
          >
            Features
          </a>
          <a
            href="#planning"
            className="hover:text-slate-900 transition-colors py-1"
          >
            Planning
          </a>
          <a
            href="#workflow"
            className="hover:text-slate-900 transition-colors py-1"
          >
            Workflow
          </a>
          <a
            href="#pricing"
            className="hover:text-slate-900 transition-colors py-1"
          >
            Pricing
          </a>
        </div>

        {/* Auth CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {isLoaded && isSignedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-xs font-semibold px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all flex items-center gap-1.5"
              >
                Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 ring-2 ring-slate-100",
                  },
                }}
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/sign-in"
                className="text-xs font-medium px-4 py-2 text-slate-600 hover:text-slate-900 transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="text-xs font-medium px-5 py-2 rounded-full bg-slate-950 text-white hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          {isLoaded && isSignedIn && (
            <UserButton />
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-md border border-slate-200/70 shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Features
          </a>
          <a
            href="#planning"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Planning
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Workflow
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            Pricing
          </a>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {isLoaded && isSignedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center text-sm font-medium py-2.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 transition-colors"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-sm font-medium py-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-sm font-medium py-2.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
