import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req:Request,
    {
  params}:{params:{courseId:number}}
  
  
  ){
try{
const {url}=await req.json();

const {userId}=auth();
const {courseId}=params;
if(!userId  || courseId ){
    return new NextResponse("Unauthorized",{status:401});
}
let name=url.split("/").pop();
await db.$queryRaw`
insert into Attachment(courseId,name,url) values(${courseId},${name},${url});
`;


}catch(err:any){

}
}