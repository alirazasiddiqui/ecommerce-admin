import { prismaDb } from '@/lib/prismaDb'
import BillboardClient from './components/client'
import {format} from 'date-fns'

const BillboardsPage =async ({params}) => {
  const billboards=await prismaDb.billboard.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formatedBillboard=billboards.map(
    (item)=>(
      {
        id:item.id,
        label:item.label,
        
        createdAt:format(item.createdAt,'MMMM do,yyyy'),
       
      }
    )
  )

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formatedBillboard}/>
      </div>


    </div>
  )
}

export default BillboardsPage