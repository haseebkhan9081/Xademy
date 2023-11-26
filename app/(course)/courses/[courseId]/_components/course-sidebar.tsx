import { db } from "@/lib/db";
import { Purchase } from "@/types/Purchase";
import Chapter from "@/types/chapters";
import { Course } from "@/types/course";
import { UserProgress } from "@/types/userProgress";
import { auth } from "@clerk/nextjs";
import { CourseSidebarItem } from "./course-sidebar-item";

interface CourseSidebarProps  {
    course:Course &{
   chapters:(Chapter&{
    userProgress:UserProgress[]|null
   })[]
};
progressCount:number
 }
export const CourseSidebar=async({course,progressCount}:CourseSidebarProps)=>{
   const {userId}=auth();
    const purchase:Purchase[]=await db.$queryRaw<Purchase[]>`
   select * from Purchase where userId=${userId} and courseId=${course.id}`
   
   console.log("course_sidebar",purchase[0]);

   return (
        <div className="h-full border-r flex flex-col overflow-y-auto
        shadow-sm ">
            <div className="p-8 flex flex-col border-b ">
                <h1
                className="font-semibold">
                    {course.title}
                    </h1>
                    {/* check purchase and add progress */}
            </div>
            <div className="flex flex-col w-full">
{course.chapters.map((chapter)=>(
    <CourseSidebarItem
    key={chapter.id}
    id={chapter.id}
    label={chapter.title}
    isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
    courseId={course.id}
    isLocked={!!chapter.isFree && !purchase[0]}

    />
))}
            </div>
        </div>
    )
}