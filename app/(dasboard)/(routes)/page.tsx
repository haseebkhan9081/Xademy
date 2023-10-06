"use client";
import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import { useEffect } from 'react';
 
import axios from "axios";
export default function Home() {


  useEffect(()=>{
    axios.get('/api/init').then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.log("error while initializing schema",error);
    })
  },[])
  
  return (
    <div>
      Home
      </div>
  )
}
