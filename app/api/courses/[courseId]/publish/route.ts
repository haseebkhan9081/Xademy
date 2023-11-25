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

const chapters:Chapter[]=await db.$queryRaw<Chapter[]>`
select * from Chapter where courseId=${params.courseId}`;

const atleastOnepublish=chapters?.some((chapter)=> {return chapter.isPublished===1});

if(!atleastOnepublish ||!ownCourse[0].title || !ownCourse[0].description ||!ownCourse[0].categoryId||!ownCourse[0].imageUrl){
    return new NextResponse("Missing Fields",{status:404});
}
await db.$queryRaw`
update Course
set isPublished=${1}
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