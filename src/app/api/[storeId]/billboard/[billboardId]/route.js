import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req,{params}){
    try{const { userId } = auth();
    
    if(!params.billboardId){
        return new NextResponse("Billboard Id is required", { status: 400 });

    }
    const billboard=await prismaDb.billboard.findUnique({
        where:{
            id:params.billboardId,
            
        }
        
    })
    return NextResponse.json(billboard,{ status: 200})


}catch (err) {
    console.log('Get_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}

export async function PATCH(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    const body = await req.json();
    const { label,imgUrl } = body;
    if (!label) return new NextResponse("Name is required!", { status: 400 });
 
    if (!imgUrl) return new NextResponse("imgUrl is required!", { status: 400 });

    if(!params.billboardId){
        return new NextResponse("Billboard Id is required", { status: 400 });

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


    const billboard=await prismaDb.billboard.updateMany({
        where:{
            id:params.billboardId,
            
        },
        data:{
            label,
            imgUrl
        }
    })
    return NextResponse.json(billboard,{ status: 200})


}catch (err) {
    console.log('Patch_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}


export async function DELETE(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    
    if(!params.billboardId){
        return new NextResponse("Billboard Id is required", { status: 400 });

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
    const billboard=await prismaDb.billboard.deleteMany({
        where:{
            id:params.billboardId,
            
        }
        
    })
    return NextResponse.json(billboard,{ status: 200})


}catch (err) {
    console.log('delete_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}