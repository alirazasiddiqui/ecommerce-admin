import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req,{params}){
    try{const { userId } = auth();
    
    if(!params.categoryId){
        return new NextResponse("Category Id is required", { status: 400 });

    }
    const category=await prismaDb.category.findUnique({
        where:{
            id:params.categoryId,
            
        },
        include:{
            billboard:true
        }
        
    })
    return NextResponse.json(category,{ status: 200})


}catch (err) {
    console.log('Get_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}

export async function PATCH(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    const body = await req.json();
    const { name,billboardId} = body;
    if (!name) return new NextResponse("Name is required!", { status: 400 });
 
    if (!billboardId) return new NextResponse("BillboardId is required!", { status: 400 });

    if(!params.categoryId){
        return new NextResponse("Category Id is required", { status: 400 });

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


    const category=await prismaDb.category.updateMany({
        where:{
            id:params.categoryId,
            
        },
        data:{
            name,
            billboardId
        }
    })
    return NextResponse.json(category,{ status: 200})


}catch (err) {
    console.log('Patch_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}


export async function DELETE(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    
    if(!params.categoryId){
        return new NextResponse("Category Id is required", { status: 400 });

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
    const category=await prismaDb.category.deleteMany({
        where:{
            id:params.categoryId,
            
        }
        
    })
    return NextResponse.json(category,{ status: 200})


}catch (err) {
    console.log('delete_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}