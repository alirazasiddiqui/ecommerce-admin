import { prismaDb } from '@/lib/prismaDb'
import ProductClient from './components/client'
import {format} from 'date-fns'
import { formatter } from '@/lib/utils'

const ProductsPage =async ({params}) => {
  const products=await prismaDb.product.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      category:true,
      size:true,
      color:true,


    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formatedProducts=products.map(
    (item)=>(
      {
        id:item.id,
        name:item.name,
        isFeatured:item.isFeatured,
        isArchived:item.isArchived,
        price:formatter.format(item.price.toNumber()),
        category:item.category.name,
        color:item.color.value,
        size:item.size.value,

        
        createdAt:format(item.createdAt,'MMMM do,yyyy'),
       
      }
    )
  )

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductClient data={formatedProducts}/>
      </div>


    </div>
  )
}

export default ProductsPage