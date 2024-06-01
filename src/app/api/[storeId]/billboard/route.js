import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated!", { status: 401 });

    const body = await req.json();
    const { label, imgUrl } = body;
    if (!label) return new NextResponse("Label is required!", { status: 400 });
    if (!imgUrl)
      return new NextResponse("ImgUrl is required!", { status: 400 });
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
    const billboard = await prismaDb.billboard.create({
      data: {
        label,
        imgUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (err) {
    console.error("billboard_post", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {
    if (!params.storeId)
      return new NextResponse("storeId is required!", { status: 400 });

    const billboards = await prismaDb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard);
  } catch (err) {
    console.error("billboard_post", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
