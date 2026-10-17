import { NextResponse, NextRequest } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function isAdmin(userId: string) {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    return (
      user.publicMetadata.role === "admin" ||
      user.privateMetadata.role === "admin"
    );
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const authorized = await isAdmin(userId);
    if (!authorized) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    // Query stats and users concurrently
    const [totalUsers, subscribedUsers, totalTodos, completedTodos, users] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isSubscribed: true } }),
      prisma.todo.count(),
      prisma.todo.count({ where: { isCompleted: true } }),
      prisma.user.findMany({
        take: 50,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { todos: true },
          },
        },
      }),
    ]);

    const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

    return NextResponse.json({
      metrics: {
        totalUsers,
        subscribedUsers,
        totalTodos,
        completedTodos,
        completionRate,
      },
      users: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        isSubscribed: u.isSubscribed,
        subscriptionEndsAt: u.subscriptionEndsAt,
        todoCount: u._count.todos,
        createdAt: u.createdAt,
      })),
    });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const authorized = await isAdmin(userId);
    if (!authorized) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { targetUserId, action } = body;

    if (!targetUserId) {
      return NextResponse.json({ error: "Target user ID required" }, { status: 400 });
    }

    if (action === "toggleSubscription") {
      const target = await prisma.user.findUnique({ where: { id: targetUserId } });
      if (!target) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      const newSubscribed = !target.isSubscribed;
      const endsAt = newSubscribed ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null;

      const updated = await prisma.user.update({
        where: { id: targetUserId },
        data: {
          isSubscribed: newSubscribed,
          subscriptionEndsAt: endsAt,
        },
      });

      return NextResponse.json({ success: true, user: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Admin POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}