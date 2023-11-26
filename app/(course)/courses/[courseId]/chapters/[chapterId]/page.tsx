import { GetChapter } from "@/app/actions/get-chapter";
import Banner from "@/components/banner";
import {auth} from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "./_components/course-enrollbutton";
 

const ChapterIdPage = async({params}:{params:
    {courseId:number,chapterId:number}}) => {
    const {courseId,chapterId}=params;
    const {userId}=auth();
    if(!userId){
        return redirect("/");
    }
    const {
course,
chapter,
muxData,
attachments,
nextChapter,
purchase,
userProgress

    }=await GetChapter({userId,chapterId,courseId});
    console.log("[Chapter Id]: ",chapter);
     const isLocked=!chapter?.isFree && !(purchase?.id && purchase);
     const completeOnEnd=!!(purchase && purchase?.id) && !userProgress?.isCompleted;
    
    return ( <div>
       
 {userProgress?.isCompleted&&(
    <Banner
    variant="success"
    label="you already completed this chapter"
    
    />
 )}
 {isLocked && (
    <Banner
    variant={"warning"}
    label="you need to purchase this course to watch this chapter"
    />
 )
}
         
 <div
 className="
 flex flex-col max-w-4xl
 mx-auto pb-20">
   <div className="p-4">
    <VideoPlayer
    chapterId={params.chapterId}
    title={chapter?.title!}
    courseId={params.courseId}
    nextChapterId={nextChapter?.id!}
    playBackId={muxData?.playbackId!}
    isLocked={isLocked}
    completeOnEnd={completeOnEnd}
    />
    </div> 
    <div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
<h2 className="text-2xl font-semibold mb-2">
    {chapter?.title}
     
</h2>{purchase?(
        <div>
            // course progress button
        </div>

     ):(
<CourseEnrollButton
courseId={params.courseId}
//@ts-ignore
price={course?.price!}
/>
     )}
        </div>
    </div>
    </div>       
        </div> );
}
 
export default ChapterIdPage;