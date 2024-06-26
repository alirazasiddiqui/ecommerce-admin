import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


  
export const POST = async (req) => {


    try {
      const { userId } = auth();
      if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
  
      const body = await req.json();
      const { name } = body;
      if (!name) return new NextResponse("Name is required!", { status: 400 });
  
      const store = await prismaDb.store.create({
        data: {
          name,
          userId,
        },
      });
  
      return NextResponse.json(store);
    } catch (err) {
      console.error("Store_post", err);
      return new NextResponse("Internal error", { status: 500 });
    }
};
