import getCourseById from "@/app/actions/getCourseById";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import {Course} from "@/types/course";
import { redirect, useRouter } from "next/navigation";
import Chapter from "@/types/chapters";
import getChaptersbyCourseId from "@/app/actions/getChaptersbyCourseId";
import { IconBadge } from "@/components/icon-badge";
import { CircleDollarSign, Layout, ListChecks,File } from "lucide-react";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import category from "@/types/category";
import getCategories from "@/app/actions/getCategories";
import PriceForm from "./_components/PriceForm";
import AttachmentForm from "./_components/AttachmentForm";
import { Attachment } from "@/types/attachment";
import getAttachmentById from "@/app/actions/getAttachmentsbyId";
import ChaptersForm from "./_components/ChaptersForm";
import Banner from "@/components/banner";
import Actions from "./_components/Actions";
import { boolean } from "zod";
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
let category:category[]|null=await getCategories();
let Attachments:Attachment[]|null=await getAttachmentById(params.courseId);
const requiredFields = [
  course?.title,
  course?.description,
  course?.imageUrl,
  course?.price,
  course?.categoryId,
  chapters?.some((chapter)=>{return chapter.isPublished===1})
   ];
const totalFileds=requiredFields.length;
console.log( chapters?.some((chapter)=>{return chapter.isPublished===1}) );

const completedFields=requiredFields.filter(Boolean).length;


const completetionText=`(${completedFields}/${totalFileds})`;
if(!course || course?.userId!=userId){
  return redirect("/");
}
console.log("the categories",category);
const isComplete=requiredFields.every(Boolean);
return <>
{!course.isPublished?(
  <Banner
  label="this course is not published,it will not be visible to students"
  variant={"warning"}
  />
):(
 <Banner
 label="this course is published.it will be visible to students"
 variant={"success"}
 /> 
)}
<div
className="p-6
 ">

<div
className="flex
justify-between items-center">
   <div
   className="
   flex
   flex-col
   items-start
   gap-y-1">
    <div className="flex flex-row w-full justify-between items-center">
<div><h1
    className="text-3xl font-semibold
    text-slate-700">
      Set Up Course
    </h1>
    <span
    className="
    text-slate-400">
      Complete all fields {completetionText}
    </span>
   </div>
<div>
  <Actions
  disabled={!isComplete}
  courseId={params.courseId}
  isPublished={course.isPublished}
  />
</div>
    </div>
    
   
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

  <TitleForm
  data={course.title}
  courseId={course.id}
  />
  <DescriptionForm
  Description={course.description}
  courseId={course.id}

  />
  <ImageForm
  imageUrl={course?.imageUrl}
  courseId={course?.id}
  />
  <CategoryForm
  value={course.categoryId}
  courseId={course.id}
  options={category?.map((cat)=>({
    value:cat.id,
    label:cat.name
  }))}

  />

  </div>
<div
className="flex flex-col
gap-y-6">
<div>
<div
className="flex flex-row
items-center
gap-x-2
">
 <IconBadge icon={ListChecks} /><h1
className="text-xl
text-slate-700
"> Course Chapters</h1>
</div>
<ChaptersForm
Chapters={chapters||[]}
courseId={course?.id}
/>
</div>

<div>
<div
className="flex flex-row
items-center
gap-x-2
">
 <IconBadge icon={CircleDollarSign} /><h1
className="text-xl
text-slate-700
"> Sell Your Course</h1>
</div>
 <PriceForm
 Price={course.price}
 courseId={course.id}/>
</div>

<div>
<div
className="flex flex-row
items-center
gap-x-2
">
 <IconBadge icon={File} /><h1
className="text-xl
text-slate-700
"> Attachments & Resources</h1>
</div>
<AttachmentForm
Attachments={Attachments}
courseId={params.courseId}
/>
</div>
  </div>  
  </div>
  </div>
  </div>
  </div>
  </>
}

export default CourseIdPage;