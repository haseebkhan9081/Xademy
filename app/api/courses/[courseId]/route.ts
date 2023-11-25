import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { Course } from "@/types/course";
import Chapter from "@/types/chapters";
import { MuxData } from "@/types/MuxData";
import Mux from "@mux/mux-node";
const {Video}=new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!
)
type CourseChapterMuxData = {
  courseId:number,
    chapId: number,
    muxId: number,
    assetId:string
};
export async function DELETE(
  req:Request,
    {
  params}:{params:{courseId:number}}
   
){
try{

const {userId}=auth();
if(!userId){
  return new NextResponse("Unauthorized",{status:400});
}
const course:Course[]=await db.$queryRaw`
select * from Course where id=${params.courseId}
and userId=${userId}`;

if(!course[0]){
  return new NextResponse("not found",{status:404});
}

const data:CourseChapterMuxData[]=await db.$queryRaw`
select  c.id as courseId,ch.id as chapId,m.id as muxId,m.assetId from Course c join Chapter ch on ch.courseId=c.id
join MuxData m on m.chapterId=ch.id
where c.id=${params.courseId}`;
 
for(const chapter of data){
if(chapter.assetId){
  await Video.Assets.del(chapter.assetId);
}
}

await db.$queryRaw`
delete from Course where id=${params.courseId}`;
return new NextResponse("deleted",{status:200});
}catch(err){
console.log("[COURSE_DELETE]",err);
return new NextResponse("internal server error",{status:500});
}
}
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