import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req,{params}){
    try{const { userId } = auth();
    
    if(!params.productId){
        return new NextResponse("Product Id is required", { status: 400 });

    }
    const product=await prismaDb.product.findUnique({
        where:{
            id:params.productId,
            
        },
        include:{
            images:true,
            category:true,
            color:true,
            size:true,
            
          },
        
    })
    return NextResponse.json(product,{ status: 200})


}catch (err) {
    console.log('Get_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}

export async function PATCH(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    const body = await req.json();
    const { name,price,categoryId,colorId,sizeId,images,isFeatured,isArchived } = body;
    if (!name) return new NextResponse("Name is required!", { status: 400 });
    if (!price) return new NextResponse("Price is required!", { status: 400 });
    if (!categoryId) return new NextResponse("CategoryId is required!", { status: 400 });
    if (!colorId) return new NextResponse("ColorId is required!", { status: 400 });
    if (!sizeId) return new NextResponse("SizeId is required!", { status: 400 });
    if (!images) return new NextResponse("Images is required!", { status: 400 });

    if(!params.productId){
        return new NextResponse("Product Id is required", { status: 400 });

    }

    const storeByUserId = await prismaDb.store.findFirst({
        where: {
          id: params.storeId,
          userId,
        },
      });
  
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 403 });
      }


    await prismaDb.product.update({
        where:{
            id:params.productId,
            
        },
        data:{
           name,
           price,
           categoryId,
           colorId,
           sizeId,
           images:{
            deleteMany:{}
           },
           isFeatured,
           isArchived
        }

    })
    const product=await prismaDb.product.update({
        where:{
            id:params.productId,
            
        },
        data:{
           
           images:{
            createMany:{
                data:[
                    ...images.map((image)=>image)
                ]
            }
           }
          
        }
    })
    return NextResponse.json(product,{ status: 200})


}catch (err) {
    console.log('Patch_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}


export async function DELETE(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    
    if(!params.productId){
        return new NextResponse("Product Id is required", { status: 400 });

    }

    const storeByUserId = await prismaDb.store.findFirst({
        where: {
          id: params.storeId,
          userId,
        },
      });
  
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", { status: 403 });
      }
    const product=await prismaDb.product.deleteMany({
        where:{
            id:params.productId,
            
        }
        
    })
    return NextResponse.json(product,{ status: 200})


}catch (err) {
    console.log('delete_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}