import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET to your .env file");
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixSignature || !svixTimestamp) {
    return new Response("Error occurred - missing Svix headers", {
      status: 400,
    });
  }

  const body = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
    evt = JSON.parse(body) as WebhookEvent;
  } catch (err) {
    console.error("Error occurred - invalid webhook signature:", err);
    return new Response("Error occurred - invalid webhook signature", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    try {
      const { email_addresses, primary_email_address_id } = evt.data;
      console.log("User created event received:", email_addresses, primary_email_address_id);

      const primaryEmail =
        email_addresses?.find((email) => email.id === primary_email_address_id) ??
        email_addresses?.[0];

      const email =
        primaryEmail?.email_address ??
        (evt.data.id ? `${evt.data.id}@test.com` : null);

      if (!email) {
        return new Response("No email found", { status: 400 });
      }

      await prisma.user.upsert({
        where: { id: evt.data.id },
        update: {
          email: email,
        },
        create: {
          id: evt.data.id,
          email: email,
          isSubscribed: false,
        },
      });

      return new Response("User created successfully", { status: 201 });
    } catch (error: any) {
      console.error("Error creating user from webhook:", error);
      return new Response(error?.message || "Internal server error", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
