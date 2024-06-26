import { prismaDb } from '@/lib/prismaDb'
import React from 'react'
import BillboardForm from './components/billboard-form'

const BillboardPage = async ({params}) => {
    const billboard=await prismaDb.billboard.findUnique({
        where:{
            id:params.billboardId
        }
    })
    console.log(billboard)
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
           <BillboardForm initialData={billboard}/>

        </div>
    </div>
  )
}

export default BillboardPage