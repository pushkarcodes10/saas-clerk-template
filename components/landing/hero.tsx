"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/navbar";
import {
  Search,
  Bell,
  CheckCircle2,
  ListTodo,
  Calendar,
  Star,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Check,
  Sparkles,
  Layers,
  FolderPlus,
} from "lucide-react";

export function LandingHero() {
  // Interactive preview state
  const [activeTab, setActiveTab] = useState<"all" | "sprint" | "review">("all");
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finalize Clerk auth & webhook sync", done: true, tag: "Tech", priority: "High" },
    { id: 2, title: "Refactor PostgreSQL Prisma schema", done: true, tag: "Database", priority: "Medium" },
    { id: 3, title: "Deploy TodoMaster v2 landing release", done: false, tag: "Launch", priority: "Urgent" },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <section
      className="relative pt-3 sm:pt-4 pb-20 md:pb-28 overflow-hidden bg-cover bg-top bg-no-repeat"
      style={{ backgroundImage: "url('/sky-clouds.jpg')" }}
    >
      {/* Light soft ambient overlays so clouds blend smoothly into white canvas at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/30 via-transparent to-white pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />

      {/* Floating Capsule Navbar integrated directly on top of the sky clouds */}
      <LandingNavbar />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center mt-3 sm:mt-5">
        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.08] max-w-4xl mx-auto mt-16 mb-4">
          Organize Your Tasks, <br className="hidden sm:inline" />
          Projects, and Ideas
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-7 font-normal leading-relaxed">
          Organize all your notes, tasks, and ideas in one clean workspace to stay focused,
          productive, and in control every day.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 sm:mb-16">
          <Link
            href="/sign-up"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-950 text-white font-medium text-sm hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_25px_-5px_rgba(15,23,42,0.3)] flex items-center justify-center gap-2"
          >
            <span>Try For Free</span>
          </Link>
        </div>

        {/* Dashboard Preview Mockup (Matching ref1.webp and ref2.webp) */}
        <div className="relative mx-auto max-w-5xl rounded-[28px] sm:rounded-[36px] bg-white/90 p-2 sm:p-3 border border-white/80 preview-mockup-shadow transition-all duration-300">
          <div className="rounded-[22px] sm:rounded-[30px] bg-white border border-slate-100 overflow-hidden text-left shadow-xs">
            {/* Window Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white/80">
              {/* Window Controls */}
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                </div>
                <div className="hidden sm:flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <div className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center text-white">
                    <CheckCircle2 className="w-3 h-3 text-sky-300" />
                  </div>
                  <span>TodoMaster</span>
                </div>
              </div>

              {/* Title & Centered Search Bar */}
              <div className="flex-1 max-w-md mx-4">
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    readOnly
                    placeholder="Search tasks, sprints, notes..."
                    value="Search"
                    suppressHydrationWarning
                    className="w-full pl-9 pr-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-xs text-slate-500 focus:outline-hidden cursor-default"
                  />
                </div>
              </div>

              {/* Notification & User Avatar */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Notifications"
                  className="relative p-1.5 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
                </button>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=face"
                  alt="User avatar"
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                />
              </div>
            </div>

            {/* Inner Dashboard Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px]">
              {/* Left Sidebar */}
              <aside className="hidden md:flex md:col-span-3 flex-col border-r border-slate-100 p-4 bg-slate-50/40">
                <div className="space-y-1 mb-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab("all")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === "all"
                        ? "bg-white text-slate-900 shadow-xs border border-slate-200/60 font-semibold"
                        : "text-slate-600 hover:bg-slate-100/70"
                    }`}
                  >
                    <ListTodo className="w-4 h-4 text-slate-500" />
                    <span>All Tasks</span>
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                      14
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("sprint")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeTab === "sprint"
                        ? "bg-white text-slate-900 shadow-xs border border-slate-200/60 font-semibold"
                        : "text-slate-600 hover:bg-slate-100/70"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Sprint Active</span>
                    <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                      3
                    </span>
                  </button>

                  <button
                    type="button"
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100/70 transition-all"
                  >
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>Calendar</span>
                  </button>
                </div>

                <div className="pt-2">
                  <div className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                    Starred Workspaces
                  </div>
                  <div className="space-y-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100/70"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Sprint Planning</span>
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100/70"
                    >
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      <span>Product Roadmap</span>
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100/70"
                    >
                      <span className="w-2 h-2 rounded-full bg-sky-400" />
                      <span>Design System v2</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Quick Metric */}
                <div className="mt-auto p-3 rounded-2xl bg-white border border-slate-100 shadow-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                    <span>Weekly Target</span>
                    <span className="font-semibold text-emerald-600">82%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[82%]" />
                  </div>
                </div>
              </aside>

              {/* Main Preview Work Area */}
              <main className="col-span-1 md:col-span-9 p-5 sm:p-7 flex flex-col justify-between">
                <div>
                  {/* Title & Filter Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        My Tasks & Projects
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Real-time collaborative task cards and execution logs
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <button
                        type="button"
                        aria-label="Filter"
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Sort"
                        className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                      >
                        <ArrowUpDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Pastel Feature Cards Row (StackNote Aesthetic from ref1.webp and ref2.webp) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
                    {/* Pastel Peach Card */}
                    <div className="rounded-2xl p-4 bg-[#fed7aa]/60 border border-[#fed7aa] hover:shadow-md transition-all flex flex-col justify-between min-h-[140px] group cursor-pointer">
                      <div>
                        <div className="text-[10px] font-semibold text-amber-900/70 uppercase tracking-wider mb-1">
                          Sprint Retro
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-950 transition-colors">
                          Sprint Planning
                        </h3>
                        <p className="text-[11px] text-slate-600 mt-0.5">12 Apr 2026</p>
                      </div>
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex -space-x-1.5">
                          <span className="w-5 h-5 rounded-full bg-amber-200 border border-white text-[9px] font-bold text-amber-900 flex items-center justify-center">
                            4+
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">•••</span>
                      </div>
                    </div>

                    {/* Pastel Lavender Card */}
                    <div className="rounded-2xl p-4 bg-[#e9d5ff]/60 border border-[#e9d5ff] hover:shadow-md transition-all flex flex-col justify-between min-h-[140px] group cursor-pointer">
                      <div>
                        <div className="text-[10px] font-semibold text-purple-900/70 uppercase tracking-wider mb-1">
                          Architecture
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-purple-950 transition-colors">
                          Clerk & Schema
                        </h3>
                        <p className="text-[11px] text-slate-600 mt-0.5">25 May 2026</p>
                      </div>
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex -space-x-1.5">
                          <span className="w-5 h-5 rounded-full bg-purple-200 border border-white text-[9px] font-bold text-purple-900 flex items-center justify-center">
                            5+
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">•••</span>
                      </div>
                    </div>

                    {/* Pastel Baby Cyan Card */}
                    <div className="rounded-2xl p-4 bg-[#bae6fd]/60 border border-[#bae6fd] hover:shadow-md transition-all flex flex-col justify-between min-h-[140px] group cursor-pointer">
                      <div>
                        <div className="text-[10px] font-semibold text-sky-900/70 uppercase tracking-wider mb-1">
                          Production
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-950 transition-colors">
                          Launch Checklist
                        </h3>
                        <p className="text-[11px] text-slate-600 mt-0.5">28 Nov 2026</p>
                      </div>
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex -space-x-1.5">
                          <span className="w-5 h-5 rounded-full bg-sky-200 border border-white text-[9px] font-bold text-sky-900 flex items-center justify-center">
                            8+
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">•••</span>
                      </div>
                    </div>

                    {/* Dashed Add Card */}
                    <button
                      type="button"
                      className="rounded-2xl p-4 border-2 border-dashed border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col items-center justify-center min-h-[140px] text-slate-500 hover:text-slate-800"
                    >
                      <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-2 shadow-xs">
                        <FolderPlus className="w-4 h-4 text-slate-600" />
                      </div>
                      <span className="text-xs font-semibold">Add Folder</span>
                      <span className="text-[10px] text-slate-400">or workspace</span>
                    </button>
                  </div>

                  {/* Interactive Quick Checklist (Live clickable demo) */}
                  <div className="rounded-2xl bg-slate-50/70 border border-slate-100 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-800">
                          Active Sprint Tasks
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-medium">
                          Click to toggle
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {tasks.filter((t) => t.done).length} / {tasks.length} Completed
                      </span>
                    </div>

                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`flex items-center justify-between p-2.5 rounded-xl transition-all cursor-pointer border ${
                            task.done
                              ? "bg-white/80 border-slate-200/60 text-slate-400"
                              : "bg-white border-slate-200 shadow-xs text-slate-800 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                task.done
                                  ? "bg-emerald-500 border-emerald-500 text-white"
                                  : "border-slate-300 bg-white"
                              }`}
                            >
                              {task.done && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span
                              className={`text-xs font-medium ${
                                task.done ? "line-through text-slate-400" : "text-slate-800"
                              }`}
                            >
                              {task.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                              {task.tag}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                                task.priority === "Urgent"
                                  ? "bg-rose-50 text-rose-700"
                                  : task.priority === "High"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* 4-Column Credibility / Metrics Strip (Directly matching ref1.webp) */}
        <div className="mt-20 pt-10 border-t border-slate-200/60 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              2024
            </span>
            <span className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              App Excellence Award
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              2025
            </span>
            <span className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Innovation in Design
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              2026
            </span>
            <span className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Global Recognition
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              1M+
            </span>
            <span className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Active Downloads
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
