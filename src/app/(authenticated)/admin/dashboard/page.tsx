"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  CheckCircle2,
  ListTodo,
  Search,
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  Activity,
  Server,
  Zap,
  Filter,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface AdminMetrics {
  totalUsers: number;
  subscribedUsers: number;
  totalTodos: number;
  completedTodos: number;
  completionRate: number;
}

interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  isSubscribed: boolean;
  subscriptionEndsAt: string | null;
  todoCount: number;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<AdminMetrics>({
    totalUsers: 0,
    subscribedUsers: 0,
    totalTodos: 0,
    completedTodos: 0,
    completionRate: 0,
  });
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState<"all" | "pro" | "free">("all");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.metrics || {});
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleToggleSubscription = async (userId: string) => {
    setActionLoadingId(userId);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetUserId: userId,
          action: "toggleSubscription",
        }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => {
            if (u.id === userId) {
              const newSub = !u.isSubscribed;
              return {
                ...u,
                isSubscribed: newSub,
                subscriptionEndsAt: newSub
                  ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                  : null,
              };
            }
            return u;
          })
        );
        // Refresh metrics
        setMetrics((prev) => {
          const userWasSubscribed = users.find((u) => u.id === userId)?.isSubscribed;
          return {
            ...prev,
            subscribedUsers: userWasSubscribed
              ? Math.max(0, prev.subscribedUsers - 1)
              : prev.subscribedUsers + 1,
          };
        });
      }
    } catch (err) {
      console.error("Failed to toggle subscription:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        (u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (filterPlan === "pro") return u.isSubscribed;
      if (filterPlan === "free") return !u.isSubscribed;
      return true;
    });
  }, [users, searchTerm, filterPlan]);

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-sky-100 selection:text-sky-900 flex flex-col">
      {/* Top Floating Capsule Header */}
      <div className="pt-4 sm:pt-6 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <header className="flex items-center justify-between px-5 sm:px-7 py-3 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>User Dashboard</span>
            </Link>

            <span className="text-slate-300">|</span>

            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
              </div>
              <span>TodoMaster</span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-200 text-amber-900 text-[10px] font-bold tracking-wide uppercase">
              Admin Console
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchAdminData}
              title="Refresh Data"
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-slate-800" : ""}`} />
            </button>
            <UserButton />
          </div>
        </header>
      </div>

      {/* Main Admin Section with Light Sky Top Background */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Header Title Block */}
        <div className="mb-10 text-left">
          <div className="text-[11px] font-semibold text-sky-800 uppercase tracking-wider mb-1">
            Analytics & System Operations
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            System Overview &{" "}
            <span className="font-serif-italic font-normal text-slate-700">
              User Management
            </span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time PostgreSQL telemetry, Clerk identity roster, and subscription management.
          </p>
        </div>

        {/* 4 Pastel Metric KPI Cards (StackNote Reference Aesthetic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* 1. Total Registered Users (Peach) */}
          <div className="rounded-3xl p-6 bg-[#fed7aa]/50 border border-[#fed7aa] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Total Users
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-200/80 flex items-center justify-center text-amber-950">
                <Users className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {metrics.totalUsers}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-amber-900/80 mt-1 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Synchronized via Clerk webhook</span>
              </div>
            </div>
          </div>

          {/* 2. Active Pro Memberships (Lavender) */}
          <div className="rounded-3xl p-6 bg-[#e9d5ff]/50 border border-[#e9d5ff] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-purple-950 uppercase tracking-wider">
                Pro Subscribers
              </span>
              <div className="w-9 h-9 rounded-xl bg-purple-200/80 flex items-center justify-center text-purple-950">
                <CreditCard className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {metrics.subscribedUsers}
              </div>
              <div className="text-xs text-purple-900/80 mt-1 font-medium">
                Estimated MRR: ${(metrics.subscribedUsers * 9.99).toFixed(2)}
              </div>
            </div>
          </div>

          {/* 3. Total Tasks Created (Baby Cyan) */}
          <div className="rounded-3xl p-6 bg-[#bae6fd]/50 border border-[#bae6fd] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-sky-950 uppercase tracking-wider">
                Total Tasks
              </span>
              <div className="w-9 h-9 rounded-xl bg-sky-200/80 flex items-center justify-center text-sky-950">
                <ListTodo className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {metrics.totalTodos}
              </div>
              <div className="text-xs text-sky-900/80 mt-1 font-medium">
                High-throughput database records
              </div>
            </div>
          </div>

          {/* 4. Completion Rate (Light Yellow) */}
          <div className="rounded-3xl p-6 bg-[#fef08a]/50 border border-[#fef08a] shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Completion Rate
              </span>
              <div className="w-9 h-9 rounded-xl bg-yellow-200/80 flex items-center justify-center text-amber-950">
                <CheckCircle2 className="w-5 h-5 stroke-[2]" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {metrics.completionRate}%
              </div>
              <div className="text-xs text-amber-900/80 mt-1 font-medium">
                {metrics.completedTodos} completed of {metrics.totalTodos} total
              </div>
            </div>
          </div>
        </div>

        {/* System Health Strip */}
        <div className="rounded-2xl p-4 bg-slate-50 border border-slate-200/70 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-800">Database Engine:</span>
              <span className="text-slate-500 font-mono">PostgreSQL (Prisma 7.10)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-800">Auth Identity:</span>
              <span className="text-slate-500">Clerk v7</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-800">Webhooks:</span>
              <span className="text-slate-500">Svix Signature Verification Active</span>
            </div>
          </div>

          <span className="text-[11px] font-mono text-slate-400">
            Node Env: production-ready · Turbopack
          </span>
        </div>

        {/* User Roster & Filter Controls */}
        <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Registered Users Roster</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Showing {filteredUsers.length} of {users.length} registered accounts
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search user name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-400 focus:bg-white transition-all"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setFilterPlan("all")}
                  className={`px-3 py-1 rounded-full transition-all text-[11px] ${
                    filterPlan === "all"
                      ? "bg-white text-slate-900 shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPlan("pro")}
                  className={`px-3 py-1 rounded-full transition-all text-[11px] ${
                    filterPlan === "pro"
                      ? "bg-white text-slate-900 shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Pro
                </button>
                <button
                  type="button"
                  onClick={() => setFilterPlan("free")}
                  className={`px-3 py-1 rounded-full transition-all text-[11px] ${
                    filterPlan === "free"
                      ? "bg-white text-slate-900 shadow-xs font-semibold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Free
                </button>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">User</th>
                  <th className="px-6 py-3.5">Membership</th>
                  <th className="px-6 py-3.5">Total Tasks</th>
                  <th className="px-6 py-3.5">Registered</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                      No matching users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      {/* User Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs">
                            {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">
                              {user.name || "Anonymous User"}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Membership Status Column */}
                      <td className="px-6 py-4">
                        {user.isSubscribed ? (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Pro Member</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                            <span>Free Tier</span>
                          </div>
                        )}
                      </td>

                      {/* Total Tasks Column */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-semibold font-mono">
                          {user.todoCount} tasks
                        </span>
                      </td>

                      {/* Registered Date Column */}
                      <td className="px-6 py-4 text-slate-500 text-[11px]">
                        {new Date(user.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleSubscription(user.id)}
                          disabled={actionLoadingId === user.id}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                            user.isSubscribed
                              ? "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                              : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                          } disabled:opacity-50`}
                        >
                          {actionLoadingId === user.id
                            ? "Updating..."
                            : user.isSubscribed
                            ? "Revoke Pro"
                            : "Grant Pro"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
