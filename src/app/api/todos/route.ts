import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma"

const ITEMS_PER_PAGE = 10;

export async function GET(req: NextRequest) {
    const { userId } = await auth()

    if(!userId) {
        return NextResponse.json({error:  "Unauthorised"}, {status: 401})
    }

    const {searchParams} = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const search = searchParams.get("search") || ""

    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId,
                title: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            orderBy: {createdAt: "desc"},
            take: ITEMS_PER_PAGE,
            skip: (page - 1) * ITEMS_PER_PAGE
        })

        const totalItems = await prisma.todo.count({
            where: {
                userId,
                title: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        })

        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

        return NextResponse.json({
            todos,
            currentPage: page,
            totalPages
        })
    } catch (err) {
        console.error("Error updating subscription:", err);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 },
        );
    }
}

export async function POST(req: NextRequest) {
    const {  userId } = await auth();
    if(!userId) {
        return NextResponse.json({error: "Unauthorised User"}, {status: 401})
    }

    let user = await prisma.user.findUnique({
        where: {id: userId},
        include: {todos: true}
    })

    if(!user) {
        try {
            const { clerkClient } = await import("@clerk/nextjs/server");
            const client = await clerkClient();
            const clerkUser = await client.users.getUser(userId);
            const email = clerkUser.emailAddresses[0]?.emailAddress || `${userId}@example.com`;
            const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || null;

            user = await prisma.user.upsert({
                where: { id: userId },
                update: { email, name },
                create: {
                    id: userId,
                    email,
                    name,
                    isSubscribed: false,
                },
                include: { todos: true },
            });
        } catch (e) {
            console.error("Failed to sync user in todos POST:", e);
        }
    }

    if(!user) {
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    if(!user.isSubscribed && user.todos.length >= 3 ) {
        return NextResponse.json({
            error: "Free users can only create up to 3 todos. Please subscribe to create more.",
            
        }, {status: 403})
    }

    const {title} = await req.json()
    const todo = await prisma.todo.create({
        data: {title, userId}
    })

    return NextResponse.json(
        todo,
        {status: 201}
    )
}