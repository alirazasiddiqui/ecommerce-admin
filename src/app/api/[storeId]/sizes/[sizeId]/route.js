import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req,{params}){
    try{const { userId } = auth();
    
    if(!params.sizeId){
        return new NextResponse("Size Id is required", { status: 400 });

    }
    const size=await prismaDb.size.findUnique({
        where:{
            id:params.sizeId,
            
        }
        
    })
    return NextResponse.json(size,{ status: 200})


}catch (err) {
    console.log('Get_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}

export async function PATCH(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    const body = await req.json();
    const { name,value } = body;
    if (!name) return new NextResponse("Name is required!", { status: 400 });
 
    if (!value) return new NextResponse("Value is required!", { status: 400 });

    if(!params.sizeId){
        return new NextResponse("Size Id is required", { status: 400 });

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


    const size=await prismaDb.size.updateMany({
        where:{
            id:params.sizeId,
            
        },
        data:{
            name,value
        }
    })
    return NextResponse.json(size,{ status: 200})


}catch (err) {
    console.log('Patch_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}


export async function DELETE(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    
    if(!params.sizeId){
        return new NextResponse("Size Id is required", { status: 400 });

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
    const size=await prismaDb.size.deleteMany({
        where:{
            id:params.sizeId,
            
        }
        
    })
    return NextResponse.json(size,{ status: 200})


}catch (err) {
    console.log('delete_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}