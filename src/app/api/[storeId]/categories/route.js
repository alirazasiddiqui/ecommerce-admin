import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated!", { status: 401 });

    const body = await req.json();
    const { name,billboardId } = body;
    if (!name) return new NextResponse("Name is required!", { status: 400 });
    if (!billboardId)
      return new NextResponse("BillboardId is required!", { status: 400 });
    if (!params.storeId)
      return new NextResponse("storeId is required!", { status: 400 });
    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const category = await prismaDb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category);
  } catch (err) {
    console.error("Category_post", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    if (!params.storeId)
      return new NextResponse("storeId is required!", { status: 400 });

    const categories = await prismaDb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (err) {
    console.error("Categories_GET", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
