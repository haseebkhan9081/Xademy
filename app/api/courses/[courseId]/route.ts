import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
 export async function PATCH(
    req:Request,
    {
  params}:{params:{courseId:number}}
    
 ){
try{
   const {Title,Description,imageUrl,categoryId,Price}=await req.json();
   
   console.log("New Title: ",Title); 
const {userId}=auth();
console.log("userId:",userId);
const {courseId}=params;
if(!userId){
    return new NextResponse("UnAuthorized",{status:401});
}
let result;
if(Title){
  result=  await db.$queryRaw`
    update  Course 
    set title=${Title}
     where id=${courseId}
     AND userId=${userId};
    `
}
if(Description){
    result=  await db.$queryRaw`
      update  Course 
      set description=${Description}
       where id=${courseId}
       AND userId=${userId};
      `
  }
 if(imageUrl){
  result=  await db.$queryRaw`
      update  Course 
      set imageUrl=${imageUrl}
       where id=${courseId}
       AND userId=${userId};
      `
 } 
 if(categoryId){
  result=await db.$queryRaw`
  update 
  Course set categoryId=${categoryId}
  where id=${courseId}
  AND userId=${userId};
  `
 }
 if(Price){
  result=await db.$queryRaw`
  update 
  Course set price=${Price}
  where id=${courseId}
  AND userId=${userId};
  `
 }
console.log(result);

return new NextResponse("changed was made successfully",{status:200});

}catch(error:any){
    console.log("[courseId API]",error);
    return new NextResponse("Internal Server Error",{status:501});
}



 }