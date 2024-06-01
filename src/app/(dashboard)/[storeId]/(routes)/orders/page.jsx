import { prismaDb } from '@/lib/prismaDb'
import OrderClient from './components/client'
import {format} from 'date-fns'
import { formatter } from '@/lib/utils'

const OrderPage =async ({params}) => {
  const orders=await prismaDb.order.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      orderItems:{
        include:{
          product:true
        }
      }
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formatedOrders=orders.map(
    (item)=>(
      {
        id:item.id,
        phone:item.phone,
        isPaid:item.isPaid,
        address:item.address,
        products:item.orderItems.map((orderItem)=>orderItem.product.name).join(' , '),
        totalPrice:formatter.format(item.orderItems.reduce((sum, item)=>{
          return sum+item.product.price.toNumber()
        },0)),

        
        createdAt:format(item.createdAt,'MMMM do,yyyy'),
       
      }
    )
  )

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <OrderClient data={formatedOrders}/>
      </div>


    </div>
  )
}

export default OrderPage