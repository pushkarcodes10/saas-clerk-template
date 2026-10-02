"use client";

import React, { useState } from "react";
import { useSignIn } from "@clerk/nextjs/legacy";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

function SignIn() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Sign-in incomplete status:", JSON.stringify(result, null, 2));
        setError("Sign in could not be completed. Please check your credentials.");
      }
    } catch (err: unknown) {
      if (isClerkAPIResponseError(err)) {
        const firstError = err.errors?.[0];
        if (firstError?.code === "form_identifier_not_found") {
          setError(
            "Couldn't find an account with that email. Please check your spelling or sign up first.",
          );
        } else {
          setError(
            firstError?.longMessage ||
              firstError?.message ||
              "An error occurred during sign in",
          );
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred during sign in");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFE7DF] p-4 sm:p-6 lg:p-8 dark:bg-[#141211] transition-colors duration-300">
      <Card className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-[#FADCD1] bg-white p-0 shadow-xl flex flex-col md:flex-row dark:border-stone-800 dark:bg-[#1C1917] dark:shadow-2xl dark:shadow-black/70 transition-colors duration-300">
        <div className="absolute top-4 right-4 z-20">
          <AnimatedThemeToggler
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200/80 bg-white/80 text-stone-700 shadow-sm backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-white hover:text-stone-900 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]/50 dark:border-stone-700/80 dark:bg-stone-800/80 dark:text-stone-200 dark:hover:bg-stone-700 dark:hover:text-white cursor-pointer [&_svg]:h-4 [&_svg]:w-4"
            duration={500}
            variant="circle"
          />
        </div>

        <div className="relative flex flex-col items-center justify-center bg-[#FFF5F1] p-6 sm:p-8 md:w-1/2 md:p-10 border-b md:border-b-0 md:border-r border-[#FADCD1] dark:bg-[#181514] dark:border-stone-800 transition-colors duration-300">
          <div className="flex w-full max-w-xs flex-col items-center text-center">
            <div className="overflow-hidden rounded-2xl border border-[#F6D0C3] bg-white p-2 shadow-sm dark:border-stone-800 dark:bg-stone-900/60 transition-colors duration-300">
              <img
                src="/login.jpg"
                alt="Todo Master"
                className="h-auto max-h-[340px] w-full rounded-xl object-cover"
              />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-stone-800 dark:text-stone-100 transition-colors duration-300">
              Welcome Back
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-stone-500 dark:text-stone-400 transition-colors duration-300">
              Sign in to access your tasks, projects, and personal dashboard.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 md:w-1/2 md:p-10">
          <CardHeader className="space-y-1 p-0 pb-6 pr-8">
            <CardTitle className="text-2xl font-bold tracking-tight text-stone-900 dark:text-white sm:text-3xl transition-colors duration-300">
              Sign In to Todo Master
            </CardTitle>
            <CardDescription className="text-sm text-stone-500 dark:text-stone-400 transition-colors duration-300">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-stone-700 dark:text-stone-200 transition-colors duration-300"
                >
                  Email address
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="h-10 border-stone-200 bg-stone-50/50 text-stone-900 placeholder:text-stone-400 transition-colors focus:bg-white dark:border-stone-700 dark:bg-stone-900/60 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-stone-900 dark:focus:border-[#FF6B4A]"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-stone-700 dark:text-stone-200 transition-colors duration-300"
                  >
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs font-medium text-[#FF6B4A] hover:text-[#E25536] dark:text-[#FF7D5F] dark:hover:text-[#FFA088] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10 pr-10 border-stone-200 bg-stone-50/50 text-stone-900 placeholder:text-stone-400 transition-colors focus:bg-white dark:border-stone-700 dark:bg-stone-900/60 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:bg-stone-900 dark:focus:border-[#FF6B4A]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:text-stone-500 dark:hover:text-stone-300 focus:outline-none cursor-pointer"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="py-2.5">
                  <AlertDescription className="text-xs">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div id="clerk-captcha" />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 font-semibold bg-[#FF6B4A] hover:bg-[#F25A38] text-white shadow-sm transition-colors cursor-pointer dark:bg-[#FF6B4A] dark:hover:bg-[#FF5A33] disabled:opacity-70"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>

          <div className="pt-6 text-center">
            <p className="text-sm text-stone-500 dark:text-stone-400 transition-colors duration-300">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-[#FF6B4A] hover:text-[#E25536] dark:text-[#FF7D5F] dark:hover:text-[#FFA088] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SignIn;