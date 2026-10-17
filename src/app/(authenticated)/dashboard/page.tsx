"use client";

import { Todo } from "@/src/generated/prisma/client";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import {
  CheckCircle2,
  Plus,
  Trash2,
  Pencil,
  X,
  Search,
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";

function Dashboard() {
  const { user } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingTodo, setAddingTodo] = useState(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [filterState, setFilterState] = useState<"all" | "active" | "completed">("all");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const [debounceSearchTerm] = useDebounceValue(searchTerm, 300);

  const fetchTodos = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/todos?page=${page}&search=${encodeURIComponent(debounceSearchTerm)}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Todos");
        }
        const data = await response.json();
        setTodos(data.todos || []);
        setTotalPages(data.totalPages || 1);
        setCurrentPage(data.currentPage || 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [debounceSearchTerm]
  );

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch("/api/subscription");
      if (response.ok) {
        const data = await response.json();
        setIsSubscribed(data.isSubscribed || false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos(1);
    fetchSubscriptionStatus();
  }, [fetchTodos]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim() || addingTodo) return;

    setAddingTodo(true);
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodoTitle.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Failed to add task. Free plan limit may be reached.");
        return;
      }

      setNewTodoTitle("");
      await fetchTodos(currentPage);
    } catch (error) {
      console.error(error);
    } finally {
      setAddingTodo(false);
    }
  };

  const handleToggleTodo = async (id: number, currentCompleted: boolean) => {
    try {
      // Optimistic update
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isCompleted: !currentCompleted } : t))
      );

      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentCompleted }),
      });

      if (!response.ok) {
        await fetchTodos(currentPage);
      }
    } catch (error) {
      console.error(error);
      await fetchTodos(currentPage);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      setTodos((prev) => prev.filter((t) => t.id !== id));

      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        await fetchTodos(currentPage);
      }
    } catch (error) {
      console.error(error);
      await fetchTodos(currentPage);
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleSaveEdit = async (id: number) => {
    const trimmed = editingTitle.trim();
    if (!trimmed || savingEdit) return;

    setSavingEdit(true);
    // Optimistic update
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: trimmed } : t))
    );

    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed }),
      });

      if (!response.ok) {
        await fetchTodos(currentPage);
      } else {
        setEditingId(null);
        setEditingTitle("");
      }
    } catch (error) {
      console.error(error);
      await fetchTodos(currentPage);
    } finally {
      setSavingEdit(false);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterState === "active") return !todo.isCompleted;
    if (filterState === "completed") return todo.isCompleted;
    return true;
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 antialiased selection:bg-sky-100 selection:text-sky-900 flex flex-col">
      {/* Top Floating Capsule Header */}
      <div className="pt-4 sm:pt-6 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <header className="flex items-center justify-between px-5 sm:px-7 py-3 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-slate-900 text-lg group">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4 h-4 text-sky-300" />
            </div>
            <span>
              Todo<span className="text-slate-500 font-normal">Master</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {isSubscribed ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Pro Unlimited</span>
              </span>
            ) : (
              <Link
                href="/subscribe"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upgrade to Pro</span>
              </Link>
            )}

            <UserButton />
          </div>
        </header>
      </div>

      {/* Main Content Area with Sky Background Banner */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Welcome Block */}
        <div className="mb-8 text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back,{" "}
            <span className="font-serif-italic font-normal text-slate-800">
              {user?.firstName || "Friend"}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Focus on what matters most today. Organize, track, and complete tasks effortlessly.
          </p>
        </div>

        {/* Free Plan Notification Banner if not subscribed */}
        {!isSubscribed && (
          <div className="rounded-2xl p-4 bg-amber-50/70 border border-amber-200/80 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-200/70 text-amber-900 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-950">
                  Starter Plan Active (Max 3 Tasks)
                </div>
                <div className="text-[11px] text-amber-900/70">
                  Upgrade to Pro for unlimited workspaces, subtasks, and export features.
                </div>
              </div>
            </div>
            <Link
              href="/subscribe"
              className="text-xs font-semibold px-4 py-1.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 transition-all shrink-0"
            >
              Upgrade ($9.99/mo)
            </Link>
          </div>
        )}

        {/* Add Task Input Form (StackNote Floating Capsule) */}
        <form
          onSubmit={handleAddTodo}
          className="flex items-center p-2 rounded-2xl bg-white border border-slate-200/80 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06)] focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100 mb-8 transition-all"
        >
          <div className="pl-3 pr-2 text-slate-400">
            <Plus className="w-5 h-5" />
          </div>
          <input
            type="text"
            required
            placeholder="Add a new task... (e.g. Deploy production schema with Prisma)"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            className="flex-1 px-2 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={addingTodo || !newTodoTitle.trim()}
            className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs disabled:opacity-40 transition-all shrink-0"
          >
            {addingTodo ? "Adding..." : "Add Task"}
          </button>
        </form>

        {/* Task List Container */}
        <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Controls Bar: Search & Status Filters */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search your tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-400 focus:bg-white transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center p-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setFilterState("all")}
                className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                  filterState === "all"
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Tasks
              </button>
              <button
                type="button"
                onClick={() => setFilterState("active")}
                className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                  filterState === "active"
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setFilterState("completed")}
                className={`px-3 py-1 rounded-full text-[11px] transition-all ${
                  filterState === "completed"
                    ? "bg-white text-slate-900 shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          {/* Task Items List */}
          <div className="divide-y divide-slate-100">
            {loading ? (
              <div className="py-12 text-center text-xs text-slate-400">Loading tasks...</div>
            ) : filteredTodos.length === 0 ? (
              <div className="py-14 text-center">
                <div className="w-12 h-12 rounded-2xl bg-sky-100/70 text-sky-800 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-800">No tasks found</div>
                <div className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                  {searchTerm
                    ? "No tasks match your search filter."
                    : "Add your first task above to start organizing your day!"}
                </div>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center justify-between p-4 sm:px-6 hover:bg-slate-50/70 transition-colors group ${
                    todo.isCompleted ? "bg-slate-50/40" : ""
                  }`}
                >
                  {editingId === todo.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveEdit(todo.id);
                      }}
                      className="flex items-center gap-2 flex-1 min-w-0 pr-2"
                    >
                      <input
                        type="text"
                        autoFocus
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") cancelEditing();
                        }}
                        className="flex-1 px-3 py-1.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:border-slate-500 bg-white text-slate-800 shadow-2xs"
                      />
                      <button
                        type="submit"
                        disabled={savingEdit || !editingTitle.trim()}
                        title="Save changes"
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors disabled:opacity-40"
                      >
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        title="Cancel"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </form>
                  ) : (
                    <>
                      <div className="flex items-center gap-3.5 flex-1 min-w-0 pr-4">
                        <button
                          type="button"
                          onClick={() => handleToggleTodo(todo.id, todo.isCompleted)}
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                            todo.isCompleted
                              ? "bg-emerald-500 border-emerald-500 text-white shadow-xs"
                              : "border-slate-300 hover:border-slate-400 bg-white"
                          }`}
                        >
                          {todo.isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                        <span
                          onClick={() => handleToggleTodo(todo.id, todo.isCompleted)}
                          className={`text-xs sm:text-sm font-medium cursor-pointer truncate ${
                            todo.isCompleted ? "line-through text-slate-400 font-normal" : "text-slate-800"
                          }`}
                        >
                          {todo.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline mr-1">
                          {new Date(todo.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <button
                          type="button"
                          onClick={() => startEditing(todo)}
                          title="Edit task"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTodo(todo.id)}
                          title="Delete task"
                          className="p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fetchTodos(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => fetchTodos(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;