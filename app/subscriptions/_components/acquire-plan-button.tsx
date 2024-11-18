"use client";
import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";

const AcquirePlanButton = () => {
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

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlan}
    >
      Adquirir Plano
    </Button>
  );
};

export default AcquirePlanButton;
