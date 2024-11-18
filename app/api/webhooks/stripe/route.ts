import { NextResponse } from "next/server";
import Stripe from "stripe";
import { clerkClient } from "@clerk/nextjs/server";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    NextResponse.error();
  }

  const signature = request.headers.get("stripe-signature") as string;

  if (!signature) {
    NextResponse.error();
  }

  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-10-28.acacia",
  });

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  switch (event.type) {
    case "invoice.paid": {
      console.log("invoice.paid");
      // atualizar o status do plano do usuário
      const { customer, subscription, subscription_details } =
        event.data.object;

      const clerkUserId = subscription_details?.metadata?.clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripe_customer_id: customer,
          stripe_subscription_id: subscription,
        },
        publicMetadata: {
          subscription_plan: "premium",
        },
      });
      break;
    }
    case "customer.subscription.deleted": {
      // remover plano do usuário
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      const clerkUserId = subscription.metadata.clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
      }

      await clerkClient().users.updateUser(clerkUserId, {
        privateMetadata: {
          stripe_customer_id: null,
          stripe_subscription_id: null,
        },
        publicMetadata: {
          subscription_plan: null,
        },
      });

      break;
    }
  }
  return NextResponse.json({ received: true });
};
