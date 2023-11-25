import { db } from "@/lib/db";
import Chapter from "@/types/chapters";
import { Course } from "@/types/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
    {params}:{params:{courseId:number}}
){
try{
    const {userId}=auth();
if(!userId){
    return new NextResponse("unAuthorized",{status:401});
}

const ownCourse:Course[]=await db.$queryRaw<Course[]>`
select * from Course where id=${params.courseId}
and userId=${userId}`;

if(!ownCourse[0]){
    return new NextResponse("Unauthorized",{status:401});
}

  
await db.$queryRaw`
update Course
set isPublished=${0}
where id=${params.courseId}`;

const Course:Course[]=await db.$queryRaw<Course[]>`
select * from Course where id=${params.courseId}
and userId=${userId}`;
return NextResponse.json(Course);

}catch(err){
    console.log("[COURSE PUBLISH]",err);
    return new NextResponse("Internal Server Error",{status:500});
}

}