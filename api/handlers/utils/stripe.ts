import * as Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

const StripeClient = (): Stripe => {
  return new Stripe(secretKey);
};

export default StripeClient;
