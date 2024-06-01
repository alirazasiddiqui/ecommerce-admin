import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";



export async function PATCH(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    const body = await req.json();
    const { name } = body;
    if (!name) return new NextResponse("Name is required!", { status: 400 });
    if(!params.storeId){
        return new NextResponse("Store Id is required", { status: 400 });

    }
    const store=await prismaDb.store.updateMany({
        where:{
            id:params.storeId,
            userId
        },
        data:{
            name
        }
    })
    return NextResponse.json(store,{ status: 200})


}catch (err) {
    console.log('Patch_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}


export async function DELETE(req,{params}){
    try{const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized!", { status: 401 });
    
    if(!params.storeId){
        return new NextResponse("Store Id is required", { status: 400 });

    }
    const store=await prismaDb.store.deleteMany({
        where:{
            id:params.storeId,
            userId
        }
        
    })
    return NextResponse.json(store,{ status: 200})


}catch (err) {
    console.log('delete_err',err);
    return new NextResponse("Internal error!", { status: 500 });
}
}