import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req,{params}){
    try{const { userId } = auth();
    
    if(!params.colorId){
        return new NextResponse("Color Id is required", { status: 400 });

    }
    const color=await prismaDb.color.findUnique({
        where:{
            id:params.colorId,
            
        }
        
    })
    return NextResponse.json(color,{ status: 200})


}catch (err) {
    console.log('Get_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}

export async function PATCH(req,{params}){
   
    try{
        debugger;
        
        const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    const body = await req.json();
    const { name,value } = body;
    if (!name) return new NextResponse("Name is required!", { status: 400 });
 
    if (!value) return new NextResponse("Value is required!", { status: 400 });

    if(!params.colorId){
        return new NextResponse("color Id is required", { status: 400 });

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


    const color=await prismaDb.color.updateMany({
        where:{
            id:params.colorId,
            
        },
        data:{
            name,value
        }
    })
    return NextResponse.json(color,{ status: 200})


}catch (err) {
    console.log('Patch_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}


export async function DELETE(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    
    if(!params.colorId){
        return new NextResponse("Color Id is required", { status: 400 });

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
    const color=await prismaDb.color.deleteMany({
        where:{
            id:params.colorId,
            
        }
        
    })
    return NextResponse.json(color,{ status: 200})


}catch (err) {
    console.log('delete_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}