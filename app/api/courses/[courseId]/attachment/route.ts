import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req:Request,
    {
  params}:{params:{courseId:number}}
  
  
  ){
try{
const {Url}=await req.json();

const {userId}=auth();
const {courseId}=params;
if(!userId  || !courseId ){
    return new NextResponse("Unauthorized",{status:401});
}
let name=Url.split("/").pop();
await db.$queryRaw`
insert into Attachment(courseId,name,url) values(${courseId},${name},${Url})
`;
return new NextResponse("succesfully uploaded attachment",{status:200});

}catch(err:any){
console.log("[attachment post api] error",err);
return new NextResponse("Internal server Error",{status:500});
}
}