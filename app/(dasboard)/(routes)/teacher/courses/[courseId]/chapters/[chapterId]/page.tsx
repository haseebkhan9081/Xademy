import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import Chapter from "@/types/chapters";
import { auth } from "@clerk/nextjs";
import { ChevronLeft, Eye, Layout, Video } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterAccessForm from "./_components/ChapterAccessForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import { MuxData } from "@/types/MuxData";
import Banner from "@/components/banner";
import ChapterActions from "./_components/ChapterActions";
import { boolean } from "zod";
const ChapterId=async(
    {params}:{params:{chapterId:number,courseId:number}}
)=>{

 const {userId}=auth();
 if(!userId){
     return redirect("/");
 } console.log("chapter id: ",params?.chapterId);
 console.log("courseId: ",params?.courseId);

 const chapter:Chapter[]=await db.$queryRaw<Chapter[]>`
 SELECT * from Chapter where courseId=${params.courseId} AND id=${params.chapterId}
 `;
const MuxData:MuxData[]=await db.$queryRaw<MuxData[]>`
select * from MuxData
where chapterId=${params.chapterId}
` ;
console.log(chapter[0]);
 if(!chapter){
 return redirect("/");
}
console.log(chapter[0].title);
const requiredFields = [
     chapter[0].title,
     chapter[0].description,
     chapter[0].videoUrl
  ];

  const totalFields=requiredFields.length;
  const completedFields=requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
const isComplete=requiredFields.every(Boolean);
return (
<>
{(!chapter[0].isPublished)?(
    <Banner
    variant={"warning"}
    label="the chapter is Unpublished,it will not be visible in the course"
    />
):(
    <Banner
    variant={"success"}
    label="the chapter is published,it will be visible in the course"
    />
)} 
<div className="p-6">
<Link
className="flex text-slate-600 
flex-row items-center mt-2 gap-x-1"
href={`/teacher/courses/${params.courseId}`}>
<ChevronLeft className="h-6 w-6 " />
 <p className=" ">Back to main menu</p>    
</Link>    
<div
className="flex
justify-between items-center ">
   
 <div
 className=" flex
 flex-col
 items-start
 gap-y-1 w-full">
    <div className="flex flex-row w-full items-center justify-between">
 <div>
    <h1
    className="text-2xl text-slate-700 font-bold">
        Chapter Creation
    </h1>
    <span
    className="text-slate-400 ">
        complete all fields {completionText}
    </span>
    </div>
    <ChapterActions 
    courseId={params?.courseId}
    chapterid={params?.chapterId}
    isPublished={!!chapter[0]?.isPublished}
     disabled={!isComplete}
    />
    </div>
<div
className="grid grid-cols-1 md:grid-cols-2
gap-6 mt-16 ">
 
<div>  
<div
className="flex items-center gap-x-2 flex-row">
<IconBadge icon={Layout}/>
<h2 className="text-slate-600 
text-xl font-medium ">Customize Your Chapter</h2>
</div>
<ChapterTitleForm
data={chapter[0]?.title}
courseId={params?.courseId}
ChapterId={params?.chapterId}
/>
<ChapterDescriptionForm
ChapterDescription={chapter[0]?.description}
chapterId={params?.chapterId}
courseId={params?.courseId}
/>
  
<div>
<div className="mt-2 flex flex-row items-center space-x-2">
<IconBadge icon={Eye}/>
<h2 className="text-slate-600 
text-xl font-medium ">
 Access settings   
</h2>

</div>
<ChapterAccessForm
IsFree={chapter[0].isFree}
courseId={params?.courseId}
chapterId={params?.chapterId}
/>
</div>

{/* First column end here */}
 </div>
 <div>


 <div>
  <div
  className=" flex flex-row items-center space-x-2">
   <IconBadge icon={Video}/>
   <h2 className="text-slate-600 
text-xl font-medium  ">
    Video
</h2>
    </div>  
    <ChapterVideoForm
    MuxData={MuxData[0]}
    videoUrl={chapter[0]?.videoUrl}
    courseId={params?.courseId}
    chapterId={params?.chapterId}
    />
    </div>   
 
 {/*the second column ends here  */}
 </div>



</div>


</div>
</div>
</div>
</>);


 }



export default ChapterId;