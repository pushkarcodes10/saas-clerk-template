import {
  clerkClient,
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/forgot-password(.*)",
  "/api/webhook(.*)",
]);

const isAuthRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/forgot-password(.*)",
]);

const handler = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const pathname = req.nextUrl.pathname;

  if (!userId) {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
    return;
  }

  if (pathname.startsWith("/api/webhook")) {
    return;
  }

  const needsRole =
    pathname === "/" ||
    isAuthRoute(req) ||
    pathname === "/dashboard" ||
    pathname.startsWith("/admin");

  if (!needsRole) {
    return;
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const role = user.publicMetadata.role as string | undefined;

  if (role === "admin" && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname === "/" || isAuthRoute(req)) {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/admin/dashboard" : "/dashboard", req.url),
    );
  }
});

export function proxy(req: NextRequest, event: NextFetchEvent) {
  return handler(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
};
