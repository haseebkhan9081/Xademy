import React from 'react'
import Image from 'next/image'
 
export default function layout({
    children}:{
        children:React.ReactNode
    }) {
 
return (
    <div
    className='
    mt-10
    flex
    h-full
     flex-col gap-2 
     items-center
      justify-center'>
        <div
        className='
        gap-2
        flex flex-row
        items-center
        justify-center'>
            <Image
            src="logo.svg"
            width={50}
            height={50}
            alt='logo'
            
            />
            <h1
            className='text-xl font-bold
            md:text-3xl'>Welcome to Xademy!</h1>
        </div>
        <div>{children}</div>
        
    </div>
)

    }
