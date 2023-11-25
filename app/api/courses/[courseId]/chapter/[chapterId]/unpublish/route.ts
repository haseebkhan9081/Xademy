import { db } from "@/lib/db";
import { MuxData } from "@/types/MuxData";
import Chapter from "@/types/chapters";
import { Course } from "@/types/course";
import { auth } from "@clerk/nextjs";
import { syncBuiltinESMExports } from "module";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}:{params:{courseId:number,chapterId:number}}
){
try{
const {userId}=auth();
if(!userId){
    return new NextResponse("Unauthorized",{status:401});
}

const course:Course[]=await db.$queryRaw<Course[]>`
select * from Course where id=${params.courseId}
and userId=${userId}`;

if(!course[0]){
    return new NextResponse("unAuthorized",{status:401});
}

const chapter:Chapter[]=await db.$queryRaw<Chapter[]>`
select * from Chapter
where id=${params.chapterId} and courseId=${params.courseId}`;


if(!chapter[0]){
    return new NextResponse("Unauthorized",{status:401});
}
 
 

await db.$queryRaw`
update Chapter
set isPublished=${0}
where id=${params.chapterId}`;

const chapters:Chapter[]=await db.$queryRaw`
select * from Chapter where isPublished=${1}
and courseId=${params.chapterId}`
if(!chapters.length){
 await db.$queryRaw`
 update Course set isPublished=${0}
 where id=${params.courseId}`;   
}

return new NextResponse("successfully published",{status:200});
}catch(err){
return new NextResponse("Internal Server Error",{status:500});
}


}