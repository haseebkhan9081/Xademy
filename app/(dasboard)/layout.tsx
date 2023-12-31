import React from 'react'
import SideBar from './_components/SideBar'
import NavBar from './_components/NavBar'

export default function layout({children}:{children
:React.ReactNode}) {
  return (
     <div
     className='
     h-full
     
     '>
       <div
        className='
         h-[80px] 
        md:pl-56 
        inset-y-0 
        w-full
         z-50
         bg-white
        fixed
        '>
            <NavBar/>
        </div>
<div
className='

hidden 
md:flex
  w-56
   flex-col
    fixed
     inset-y-0 
     z-50

'>
    <SideBar/>

</div>
<main
className='

overflow-hidden
flex
flex-col
h-full
md:ml-56
mt-[80px]
'>
  {children}
</main>
     </div>
  )
}
