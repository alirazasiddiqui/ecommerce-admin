import { prismaDb } from "@/lib/prismaDb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Navbar from '@/components/Navbar.jsx'


export default async function dashboardLayout({children,params}){

    const {userId} =auth();
    if(!userId){
        redirect('/sign-in')
    } 
    const store=await prismaDb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })
    if(!store){
        redirect('/')
    }

    return(
        <div>
            <Navbar/>
            {children}
        </div>
    )


} 