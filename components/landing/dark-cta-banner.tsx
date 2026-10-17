"use client";

import React from "react";
import Link from "next/link";

export function DarkCtaBanner() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden">
      {/* Subtle radial ambient glow matching ref3.webp */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-white/[0.04] blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[300px] bg-slate-800/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Text Block */}
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-medium text-white tracking-tight leading-[1.15] mb-6">
              We Help Transform Big Ideas Into <br />
              <span className="font-serif-italic font-normal text-slate-100">
                Meaningful Solutions.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-lg">
              Let&apos;s Start a Conversation to Create Something Impactful Together.
            </p>
          </div>

          {/* Right White Speech-Bubble Callout Button (Directly from ref3.webp) */}
          <div className="relative shrink-0">
            <Link
              href="/sign-up"
              className="group relative flex flex-col items-center justify-center w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white text-slate-950 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 text-center p-6"
            >
              <span className="text-xs sm:text-sm font-medium tracking-tight text-slate-800">
                Your Move
              </span>
              <span className="font-serif-italic text-lg sm:text-xl font-normal text-slate-950 mt-0.5 group-hover:text-sky-900 transition-colors">
                Get in Touch
              </span>
            </Link>

            {/* Speech bubble tail dots (Matching ref3.webp) */}
            <div className="absolute -bottom-2 left-6 flex flex-col items-center">
              <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/80 block -mt-1 -ml-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
