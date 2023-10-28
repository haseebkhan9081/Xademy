import { db } from "@/lib/db";
import Chapter from "@/types/chapters";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ChapterId=async(
    {params}:{params:{chapterId:number,courseId:number}}
)=>{

 const {userId}=auth();
 if(!userId){
     return redirect("/");
 } 

 const chapter:Chapter=await db.$queryRaw<Chapter>`
 SELECT * from Chapter where courseId=${params.courseId} AND id=${params.courseId}
 `;

 if(!chapter){
 return redirect("/");
}

const requiredFields = [
     chapter.title,
     chapter.description,
     chapter.videoUrl
  ];

  const totalFields=requiredFields.length;
  const completedFields=requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;
return (

<div
className="p-6">
 <div
 className="flex items-center justify-between">
<div
className="flex flex-col gap-y-2">
    <h1
    className="text-2xl text-slate-700 font-md">
        Chapter Creation
    </h1>
    <span
    className="text-slate-400 ">
        complete all fields {completionText}
    </span>
</div>
 </div>
<div
className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
 <div>
    </div>   
<div>
<div>

</div>


</div>


</div>


</div>

);


}



export default ChapterId;