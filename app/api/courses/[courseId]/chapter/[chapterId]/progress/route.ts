import { db } from "@/lib/db";
import { UserProgress } from "@/types/userProgress";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PUT(
req:Request,
{params}:{params:{courseId:number,chapterId:number}}

){

try{
    const {userId}=auth();
    const {isCompleted}=await req.json();    
if(!userId){
    return new NextResponse("UNAuthorized",{status:401});
}

let progress:UserProgress[]=await db.$queryRaw`
select * from UserProgress where userId=${userId}
and chapterId=${params.chapterId}`;
console.log("[PROGRESS]",progress[0]);
if(!progress[0] || !progress[0].id){
    await db.$queryRaw`
    insert into UserProgress(userId,chapterId) values(${userId},${params.chapterId})`
}

progress=await db.$queryRaw`
select * from UserProgress where userId=${userId}
and chapterId=${params.chapterId}`;
console.log("[PROGRESS] after",progress[0]);
  
let update;
if(isCompleted){
    update=1;
}else if(!isCompleted){
    update:0;
}
await db.$queryRaw`
update UserProgress set
isCompleted=${update}
where chapterId=${params.chapterId}
and userId=${userId}`;

return new NextResponse("seccess",{status:200});
}
catch(err){
console.log("[CHAPTER_ID_PROGRESS],",err);
return new NextResponse("INTERNAL SERVER ERROR",{status:500});
}
}