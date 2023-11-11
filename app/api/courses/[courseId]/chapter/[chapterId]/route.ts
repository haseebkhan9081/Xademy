import { db } from "@/lib/db";
import { Course } from "@/types/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
 req:Request,
 {params}:{params:{courseId:number,
chapterId:number}}    ) {
    
try{
const {userId}=auth();
const {Title,Description,IsFree}=await req.json();
if(!userId){
    return new NextResponse("Unauthorized",{status:401});

}
const {courseId,chapterId}=params;

if(!courseId || !chapterId){
    return new NextResponse("Invalid request",{status:402});

}

const result:Course[]=await db.$queryRaw`
select * from Course where id=${courseId}`;

if(result[0].userId!=userId){
    return new NextResponse("Unauthorized",{status:401});
}

if(Title){

await db.$queryRaw`
update Chapter
set title=${Title}
where id=${chapterId}
and courseId=${courseId}
`;}
if(Description){
    await db.$queryRaw`
    update Chapter
    set description=${Description}
    where id=${chapterId}
    and courseId=${courseId}
    `;  
}

if(IsFree!=undefined && (IsFree==true || IsFree==false)){
    await db.$queryRaw`
    update Chapter
    set isFree=${IsFree}
    where id=${chapterId}
    and courseId=${courseId}
    `; 
}

return new NextResponse("succesfully patched chapter",{status:200});

}catch(err:any){

    console.log("[chapters Patch error]: ",err);
    return new NextResponse("internal server error",{status:500});

}

}