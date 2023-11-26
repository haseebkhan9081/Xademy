import { db } from "@/lib/db";
import { map } from "zod";
type chapterID={
    id:number
}
type Count={
c:number
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

console.log("[GET_PROGRESS_pUBLISHED_CHAPTERS_IDS]",publishedChaptersIds ); 
let counter=0;
for( let value of publishedChaptersIds ){
    const  Chapter:Count[]=await db.$queryRaw`
    select * from UserProgress where userId=${userId}
    and chapterId=${value} and isCompleted=${1}`;
    
    if(Chapter[0]){
        counter=counter+1;
    }
}
console.log("[GET_PROGRESS_VALIDCOMPLETEDCHAPTERS]",counter); 
  
const progressPercentage=(Number(counter)/Number(publishedChaptersIds.length))*100;
return progressPercentage; 
}catch(err){
console.log("[getProgress Error:]",err);
return 0;
}
}