import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

async function getOrCreateUser(userId: string) {
  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    try {
      const client = await clerkClient();
      const clerkUser = await client.users.getUser(userId);
      const email =
        clerkUser.emailAddresses[0]?.emailAddress || `${userId}@example.com`;
      const name =
        `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
        null;

      user = await prisma.user.upsert({
        where: { id: userId },
        update: { email, name },
        create: {
          id: userId,
          email,
          name,
          isSubscribed: false,
        },
      });
    } catch (e) {
      console.error("Failed to sync user from Clerk:", e);
    }
  }

  return user;
}

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    const user = await getOrCreateUser(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const subscriptionEnds = new Date();
    subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        isSubscribed: true,
        subscriptionEndsAt: subscriptionEnds,
      },
    });

    return NextResponse.json({
      message: "Subscription Successfully",
      subscriptionEnds: updatedUser.subscriptionEndsAt,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  try {
    const user = await getOrCreateUser(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const now = new Date();

    if (user.subscriptionEndsAt && user.subscriptionEndsAt < now) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          isSubscribed: false,
          subscriptionEndsAt: null,
        },
      });
      return NextResponse.json({
        isSubscribed: false,
        subscriptionEndsAt: null,
      });
    }

    return NextResponse.json({
      isSubscribed: user.isSubscribed,
      subscriptionEndsAt: user.subscriptionEndsAt,
    });
  } catch (err) {
    console.error("Error fetching subscription:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}