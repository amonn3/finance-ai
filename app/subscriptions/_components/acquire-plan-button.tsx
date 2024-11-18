"use client";
import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {
  const { user } = useUser();

  const handleAcquirePlan = async () => {
    const { sessionId } = await createStripeCheckout();
    if (!sessionId) {
      throw new Error("Session ID not found");
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
    );
    if (!stripe) {
      throw new Error("Stripe not found");
    }

    await stripe.redirectToCheckout({ sessionId });
  };

  const hasPremiumPlan = user?.publicMetadata.subscription_plan === "premium";

  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  } else {
    return (
      <Button
        className="w-full rounded-full font-bold"
        onClick={handleAcquirePlan}
      >
        Adquirir Plano
      </Button>
    );
  }
};

export default AcquirePlanButton;
