import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import MainNav from '@/components/MainNav'
import NavSwitcher from './NavSwitcher'
import { redirect } from 'next/navigation'
import { prismaDb } from '@/lib/prismaDb'
import { ThemeToggle } from './ui/theme-toggle'

const Navbar =async () => {
    const {userId}=auth();
    if(!userId){
        redirect('/sign-in')
    }
    const store=await prismaDb.store.findMany({
        where:{
           
            userId
        }
    })
    //console.log(store)
  return (
    <div className='border-b'>
        <div className='flex h-16 items-center px-4'>
            <NavSwitcher items={store}/>
            <div>
                <MainNav className={'mx-6'}/>
            </div>
            <div className='ml-auto flex items-center space-x-4'>
                <ThemeToggle/>
                <UserButton afterSignOutUrl='/'/>
            </div>

        </div>



    </div>
  )
}

export default Navbar