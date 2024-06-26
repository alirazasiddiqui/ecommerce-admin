import { prismaDb } from '@/lib/prismaDb'
import {format} from 'date-fns'
import CategoriesClient from './components/client'

const CategoriesPage =async ({params}) => {
  const categories=await prismaDb.category.findMany({
    where:{
      storeId:params.storeId
    },
    include:{
      billboard:true
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formatedCategories=categories.map(
    (item)=>(
      {
        id:item.id,
        name:item.name,
        billboardLabel:item.billboard.label,
        
        createdAt:format(item.createdAt,'MMMM do,yyyy'),
       
      }
    )
  )

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoriesClient data={formatedCategories}/>
      </div>


    </div>
  )
}

export default CategoriesPage