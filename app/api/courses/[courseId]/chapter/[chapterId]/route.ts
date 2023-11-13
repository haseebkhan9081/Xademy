import { db } from "@/lib/db";
import { Course } from "@/types/course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { MuxData } from "@/types/MuxData";
import Chapter from "@/types/chapters";

const {Video}=new Mux(
    process.env.MUX_TOKEN_ID!,
    process.env.MUX_TOKEN_SECRET!,
)
export async function DELETE(
    req:Request,
    {params}:{params:{courseId:number,chapterId:number}}   
    
){
try{
const {userId}=auth();
if(!userId){
    return new NextResponse("Unauthorized",{status:401});
}
const course:Course[]=await db.$queryRaw<Course[]>`
select * from Course where id=${params.courseId}`;

if(course[0].userId!=userId){
    return new NextResponse("Unauthorized",{status:402});
}

const chapter:Chapter[]=await db.$queryRaw<Chapter[]>`
select * from Chapter where id=${params.chapterId}
and courseId=${params.courseId}`;

if(!chapter[0]){
    return new NextResponse("Invalid Request",{status:404});
}

if(chapter[0].videoUrl){
    const ExistingMuxData:MuxData[]=await db.$queryRaw<MuxData[]>`
    select * from MuxData
    where chapterId=${params.chapterId}
    `;

   if(ExistingMuxData[0]){
    await Video.Assets.del(ExistingMuxData[0].assetId);
    await db.$queryRaw`
    delete from MuxData where 
    id=${ExistingMuxData[0].id}`;
   } 
}

await db.$queryRaw`
delete from Chapter where id=${params.chapterId}
`;

return new NextResponse("Deleted Successfully ",{status:200});

}catch(err:any){
console.log("[CHAPTER DELETE ERROR]",err);
return new NextResponse("Internal Server Error",{status:500});
}


}
export async function PATCH(
 req:Request,
 {params}:{params:{courseId:number,
chapterId:number}}    ) {
    
try{
const {userId}=auth();
const {Title,Description,IsFree
,videoUrl}=await req.json();
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





if(videoUrl){
    await db.$queryRaw`
    update Chapter
    set videoUrl=${videoUrl}
    where id=${chapterId}
    and courseId=${courseId}
    `;  
const ExistingMuxData:MuxData[]=await db.$queryRaw<MuxData[]>`
select * from MuxData
where chapterId=${params.chapterId}
`;
console.log(ExistingMuxData[0]);
if(ExistingMuxData[0]){
    console.log(ExistingMuxData[0]);
    await Video.Assets.del(ExistingMuxData?.[0]?.assetId)
  await db.$queryRaw`delete from MuxData
  where id=${ExistingMuxData[0].id}`;
}

const asset=await Video.Assets.create({
    input:videoUrl,
    playback_policy:"public",
    test:false,
});
console.log(asset);
await db.$queryRaw`
insert into MuxData(chapterId,assetId,playbackId) values(${params.chapterId},${asset.id},${asset.playback_ids?.[0]?.id})
`;
    
}




return new NextResponse("succesfully patched chapter",{status:200});

}catch(err:any){

    console.log("[chapters Patch error]: ",err);
    return new NextResponse("internal server error",{status:500});

}

}