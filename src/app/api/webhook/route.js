import Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prismaDb } from "@/lib/prismaDb";
import { NextResponse } from "next/server";

export async function POST(req) {
  // Await the text body parsing
  const body = await req.text();
  const signature = headers().get("Stripe-Signature");
  let event;

  try {
    // Ensure the event variable is declared
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    // Return an error response if webhook verification fails
    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 });
  }

  const session = event.data.object;
  const address = session?.customer_details?.address;
  const addressComponents = [
    
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];
  debugger;
  const addressString = addressComponents.filter((c) => c !== null).join(', ');
  console.log(event.type)

  if (event.type === 'checkout.session.completed') {
    // Ensure asynchronous operations are awaited
    try {
      const order = await prismaDb.order.update({
        where: {
          id: session?.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || '',
        },
        include: {
          orderItems: true,
        },
      });

      const productIds = order.orderItems.map((orderItem) => orderItem.productId);
      await prismaDb.product.updateMany({
        where: {
          id: {
            in: [...productIds],
          },
        },
        data: { // Properly nest the data object
          isArchived: true,
        },
      });

      return new NextResponse(null, { status: 200 });
    } catch (error) {
      // Handle errors gracefully
      console.error('Error updating order:', error);
      return new NextResponse('Internal server error', { status: 500 });
    }
  }

  // Default response if event type is not handled
  return new NextResponse(null, { status: 200 });
}
