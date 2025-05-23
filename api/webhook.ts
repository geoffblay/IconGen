import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

// Use raw body for webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const chunks: Uint8Array[] = [];

  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  const rawBody = Buffer.concat(chunks);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.client_reference_id;
    const productId = session.metadata?.product_id;
    const amount = productId === process.env.VITE_PRODUCT_ID_50 ? 50 : 110;
    const status = session.payment_status;

    // Insert into Supabase via REST API or PostgREST
    try {
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/stripe_orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        },
        body: JSON.stringify({
          user_id: userId,
          amount: amount,
          product_id: productId,
          status: status,
        }),
      });

      return res.status(200).json({ received: true });
    } catch (err) {
      console.error("Failed to fulfill order:", err);
      return res.status(500).send("Failed to insert into stripe_orders");
    }
  }

  return res.status(200).json({ received: true });
}
