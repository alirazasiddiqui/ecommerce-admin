import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { raw } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated!", { status: 401 });

    const body = await req.json();
    const { name,price,categoryId,colorId,sizeId,images,isFeatured,isArchived } = body;
    
    if (!name) return new NextResponse("Name is required!", { status: 400 });
    if (!price) return new NextResponse("Price is required!", { status: 400 });
    if (!categoryId) return new NextResponse("CategoryId is required!", { status: 400 });
    if (!colorId) return new NextResponse("ColorId is required!", { status: 400 });
    if (!sizeId) return new NextResponse("SizeId is required!", { status: 400 });
    if (!images) return new NextResponse("Images is required!", { status: 400 });
    
    
    
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
    const product = await prismaDb.product.create({
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        
        images:{
          createMany:{
            data:[
              ...images.map((image)=>image)
            ]
          }
        },
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error("Products_post", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const GET = async (req, { params }) => {
  try {

    const {searchParams}=new URL(req.url);
    const categoryId=searchParams.get('categoryId') || undefined;
    const isFeatured=searchParams.get('isFeatured') || undefined;
    const colorId=searchParams.get('colorId') || undefined;
    const sizeId=searchParams.get('sizeId') || undefined;

    if (!params.storeId)
      return new NextResponse("storeId is required!", { status: 400 });

    const products = await prismaDb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured:isFeatured?true:undefined,
        isArchived:false
      },
      include:{
        images:true,
        category:true,
        color:true,
        size:true,
        
      },
      orderBy:{
        createdAt:'desc'
      }
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("Product_Post", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
