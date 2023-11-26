import { db } from "@/lib/db";
import { MuxData } from "@/types/MuxData";
import  Purchase  from "@/types/Purchase";
import { Attachment } from "@/types/attachment";
import Chapter from "@/types/chapters";
import { Course } from "@/types/course";
import { UserProgress } from "@/types/userProgress";
import { auth } from "@clerk/nextjs";

interface GetChaptersProps{
courseId:number,
chapterId:number,
userId:string    
}

export const GetChapter=async({
    userId,
    chapterId,courseId
}:GetChaptersProps)=>{

try{
if(!userId){
    throw new Error("MUST HAVE  A USER ID");
}

const course:Course[]=await db.$queryRaw`
select * from Course where id=${courseId}`;

const chapter:Chapter[]=await db.$queryRaw`
select * from Chapter where id=${chapterId}
and courseId=${courseId}`;

if(!course[0]|| !chapter[0]){
    throw new Error("Course or Chapter not found");
}

const purchase:Purchase[]=await db.$queryRaw`
select * from Purchase where
userId=${userId}
and courseId=${courseId}`;

let muxData:MuxData[]|null=null;
let attachments:Attachment[]=[];
let nextChapter:Chapter[]|null=null;

if(purchase[0] && purchase[0].id){
attachments=await db.$queryRaw`
select * from Attachment where courseId=${courseId}`;
}

if(chapter[0].isFree || (purchase[0] && purchase[0].id)){
 muxData=await db.$queryRaw`
 select * from MuxData where chapterId=${chapterId}`;   
}

nextChapter=await db.$queryRaw`
SELECT *
FROM Chapter
WHERE position = (
    SELECT MIN(position)
    FROM Chapter
    WHERE position > (
        SELECT position
        FROM Chapter
        WHERE id =${chapterId} -- Replace with the ID of the current chapter
    )
)
`;
console.log("the next chapter un here ",nextChapter);
let userProgress:UserProgress[]=await db.$queryRaw`
select * from UserProgress where userId=${userId} and 
chapterId=${chapter[0].id}`
return {
course:course[0],
chapter:chapter[0],
muxData:muxData?.[0],
attachments:attachments,
nextChapter:nextChapter?.[0],
purchase:purchase[0],
userProgress:userProgress[0]
}

}catch(err){
console.log("[GET CHAPTER ERROR]",err);
return {
    course:null,
    chapter:null,
    muxData:null,
    attachments:[],
    nextChapter:null,
    purchase:null,
    userProgress:null
}
}
 
}