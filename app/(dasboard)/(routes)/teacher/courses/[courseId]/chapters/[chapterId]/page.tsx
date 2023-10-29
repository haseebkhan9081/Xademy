import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import Chapter from "@/types/chapters";
import { auth } from "@clerk/nextjs";
import { ChevronLeft, Layout } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_components/ChapterTitleForm";

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
return (
<div className="w-full">
<Link
className="flex text-slate-600 
flex-row items-center mt-2 gap-x-1"
href={`/teacher/courses/${params.courseId}`}>
<ChevronLeft className="h-6 w-6 " />
 <p className=" ">Back to main menu</p>    
</Link>    
<div
className="p-6 w-full ">
   
 <div
 className="flex items-center justify-between">
<div
className="flex flex-col gap-y-2">
    <h1
    className="text-2xl text-slate-700 font-bold">
        Chapter Creation
    </h1>
    <span
    className="text-slate-400 ">
        complete all fields {completionText}
    </span>
</div>
 </div>
<div
className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 w-full">
 <div className="flex flex-row w-full justify-between ">
 <div
 className="space-y-6 flex flex-col ">
<div
className="flex items-center gap-x-2 flex-row">
<IconBadge icon={Layout}/>
<h2 className="text-slate-600 
text-xl font-medium">Customize Your Chapter</h2>
</div>
<ChapterTitleForm
data={chapter[0]?.title}
courseId={params?.courseId}
ChapterId={params?.chapterId}
/>


 </div>
 </div>
</div>


</div>
</div>
);


}



export default ChapterId;