import getCourseById from "@/app/actions/getCourseById";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {Course} from "@/types/course";
import { redirect, useRouter } from "next/navigation";
import Chapter from "@/types/chapters";
import getChaptersbyCourseId from "@/app/actions/getChaptersbyCourseId";
import { IconBadge } from "@/components/icon-badge";
import { Layout } from "lucide-react";
import TitleForm from "./_components/TitleForm";
const CourseIdPage=async(
    {
        params
      }: {
        params: { courseId: number }
      } 
)=>{
   
const {userId}=auth();
let course:Course|null=await getCourseById(params.courseId);
let chapters:Chapter[]|null=await getChaptersbyCourseId(params.courseId);

 console.log(chapters);
const requiredFields = [
  course?.title,
  course?.description,
  course?.imageUrl,
  course?.price,
  course?.categoryId,
  chapters?.some((chapter)=>{chapter.isPublished})
   ];
const totalFileds=requiredFields.length;


const completedFields=requiredFields.filter(Boolean).length;


const completetionText=`(${completedFields}/${totalFileds})`;
if(!course || course?.userId!=userId){
  return redirect("/");
}
return <>
<div
className="p-6">

<div
className="flex
justify-between items-center">
   <div
   className="
   flex
   flex-col
   items-start
   gap-y-1">
    <h1
    className="text-3xl font-semibold
    text-slate-700">
      Set Up Course
    </h1>
    <span
    className="
    text-slate-400">
      Complete all fields {completetionText}
    </span>
   
   
<div

className="
grid grid-cols-1 md:grid-cols-2
 gap-6 mt-16">

<div>
<div
className="
gap-x-2
flex flex-row items-center">
  <IconBadge icon={Layout} /><h1
className="text-xl
text-slate-700
">Customize Your Course</h1>
  </div>

  <TitleForm/>
  </div>

  </div>  
  </div>
  </div>
  </div>
  </>
}

export default CourseIdPage;