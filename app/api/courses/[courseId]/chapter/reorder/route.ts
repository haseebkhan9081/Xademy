import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export async function PUT(req:Request,
    {params}:{params:{courseId:number}}) {
    
try{
const {userId}=auth();
const {courseId}=params;
const {updateData}=await req.json();

if(!userId){
    return new NextResponse("Unauthorized",{status:401});
}
const result=await db.$queryRaw`
select * from Course where id=${courseId} AND userId=${userId}`;
if(!result){
    return new NextResponse("Unauthorized",{status:401});
}
 

updateData.forEach(async(update:{id:number;position:number}) => {
  await db.$queryRaw`
  update Chapter set position=${update.position} where id=${update.id}
  `;  
}); 
 return new NextResponse("Succesfully reordered",{status:200});

}catch(err){
    console.log("REorder",err);
return new NextResponse("internal server error",{status:500});
}



}