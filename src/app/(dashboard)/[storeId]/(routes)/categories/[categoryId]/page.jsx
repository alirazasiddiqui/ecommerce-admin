import { prismaDb } from '@/lib/prismaDb'
import React from 'react'

import CategoryForm from './components/category-form'

const CategoryPage = async ({params}) => {
    const category=await prismaDb.category.findUnique({
        where:{
            id:params.categoryId
        }
    })

    const billboards=await prismaDb.billboard.findMany({
      where:{
          storeId:params.storeId
      }
  })
  
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
           <CategoryForm billboards={billboards} initialData={category}/>

        </div>
    </div>
  )
}

export default CategoryPage