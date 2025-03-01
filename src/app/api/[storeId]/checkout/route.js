import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { prismaDb } from "@/lib/prismaDb";
import { NextResponse } from "next/server";

const corrsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST , GET , Put , Delete , OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type , Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corrsHeaders });
}

export async function POST(req, { params }) {
  const { productIds } = await req.json();
  if (!productIds || productIds.length === 0) {
    return new NextResponse("productIds are required", { status: 400 });
  }
  const products = await prismaDb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });
  const line_items = [];
  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price.toNumber() * 100,
      },
    });
  });
  const order = await prismaDb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId) => ({
          product: {
            connect: { id: productId },
          },
        })),
      },
    },
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    billing_address_collection: "required",
    phone_number_collection: {
      enabled: true,
    },
    success_url: `${process.env.FRONTEND_STORE_URL}cart?success=1`,
    cancel_url: `${process.env.FRONTEND_STORE_URL}cart?canceled=1`,
    metadata: {
      orderId: order.id,
    },
  });
  return NextResponse.json({ url: session.url }, { headers: corrsHeaders });
}
