import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({error: "Unauthorised"}, {status: 401})
    }

    // capture payment

    try {
        const user = await prisma.user.findUnique({where: {id: userId}})
        if (!user) {
            return NextResponse.json(
              { error: "User not found" },
              { status: 404 });
        }

        const subscriptionEnds = new Date()
        subscriptionEnds.setMonth(subscriptionEnds.getMonth() + 1)

        const updatedUser = await prisma.user.update({
            where: {id: userId},
            data: {
                isSubscribed: true,
                subscriptionEndsAt: subscriptionEnds
            }
        })

        return NextResponse.json({
            message: "Subscription Successfully",
            subscriptionEnds: updatedUser.subscriptionEndsAt
            
        })
    } catch (error) {
        console.error("Error updating subscription:", error);
        return NextResponse.json(
            {error: "Internal Server Error"}, 
            {status: 500}
        )
    }
}

export async function GET() {
    const { userId } = await auth();
    if(!userId) {
        return NextResponse.json({error: "Unauthorised"}, {status: 401})
    }

     try {
       const user = await prisma.user.findUnique(
        { where: { id: userId }, 
        select: {isSubscribed: true, subscriptionEndsAt: true}
    });
       if (!user) {
         return NextResponse.json({ error: "User not found" }, { status: 404 });
       }

      const now = new Date()

      if(user.subscriptionEndsAt && user.subscriptionEndsAt < now) {
        await prisma.user.update({
            where: {id: userId},
            data: {
                isSubscribed: false,
                subscriptionEndsAt: null
            }
        })
        return NextResponse.json({
            isSubscribed: false,
            subscriptionEndsAt: null
        })
    }
    
        return NextResponse.json({
            isSubscribed: user.isSubscribed,
            subscriptionEndsAt: user.subscriptionEndsAt,
        });

     } catch (err) {
       console.error("Error updating subscription:", err);
       return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
       );
     }
}