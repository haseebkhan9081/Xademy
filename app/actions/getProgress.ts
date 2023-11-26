import { db } from "@/lib/db";
import { map } from "zod";
type chapterID={
    id:number
}
type Count={
count:number
}

export const getProgress=async(
 userId:string,
 courseId:number   
):Promise<number>=>{
try{
const PublishedChapters:chapterID[]=await db.$queryRaw`
select id from Chapter where courseId=${courseId}
and isPublished=${1}`;
const publishedChaptersIds=PublishedChapters.map((chapter)=>chapter.id);
const validCompletedChapters:Count[]=await db.$queryRaw`
select count(*) as count from UserProgress where userId=${userId}
and chapterId IN (${publishedChaptersIds.join(', ')}) and isCompleted=${1} `;

const progressPercentage=(Number(validCompletedChapters[0].count)/Number(publishedChaptersIds.length))*100;
return progressPercentage; 
}catch(err){
console.log("[getProgress Error:]",err);
return 0;
}
}