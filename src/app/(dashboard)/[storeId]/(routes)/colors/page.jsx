import { prismaDb } from '@/lib/prismaDb'
import {format} from 'date-fns'
import ColorClient from './components/client'

const ColorsPage =async ({params}) => {
  const colors=await prismaDb.color.findMany({
    where:{
      storeId:params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  const formatedColors=colors.map(
    (item)=>(
      {
        id:item.id,
        name:item.name,
        value:item.value,
        
        createdAt:format(item.createdAt,'MMMM do,yyyy'),
       
      }
    )
  )

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ColorClient data={formatedColors}/>
      </div>


    </div>
  )
}

export default ColorsPage