import { getProgress } from "@/app/actions/getProgress";
import { db } from "@/lib/db";
import category from "@/types/category";
import Chapter from "@/types/chapters";
import { Course } from "@/types/course";
import { UserProgress } from "@/types/userProgress";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CourseSidebar } from "./_components/course-sidebar";
type CourseWithDetails=Course & {
   chapters: (Chapter &{
    userProgress:UserProgress[]|null
   })[];
   
 }
 

const CourseLayout=async({children,
params}:{
   children:React.ReactNode;
   params:{courseId:number} 
})=>{
const {userId}=auth();
if(!userId){
    return redirect("/");
}
    const course:CourseWithDetails[]  = await db.$queryRaw<CourseWithDetails[]>`
    SELECT 
    c.id , 
    c.userId, 
    c.title,
    c.description,
    c.imageUrl,
    c.price,
    c.isPublished,
    c.categoryId,
    c.createdAt,
    c.updatedAt,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', ch.id,
            'title', ch.title,
            'description', ch.description,
            'videoUrl', ch.videoUrl,
            'position', ch.position,
            'isPublished', ch.isPublished,
            'isFree', ch.isFree,
            'courseId', ch.courseId,
            'createdAt', ch.createdAt,
            'updatedAt', ch.updatedAt,
            'userProgress', (
                SELECT JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', upNested.id,
                        'chapterId', upNested.chapterId,
                        'userId', upNested.userId,
                        'isCompleted', upNested.isCompleted,
                        'createdAt', upNested.createdAt,
                        'updatedAt', upNested.updatedAt
                    )
                )
                FROM UserProgress upNested
                WHERE upNested.chapterId = ch.id AND upNested.userId = ${userId}
            )
        )
    ) AS chapters
FROM 
    Course c
LEFT JOIN 
    Chapter ch ON c.id = ch.courseId AND ch.isPublished = ${1} 
LEFT JOIN 
    UserProgress up ON up.chapterId = ch.id AND up.userId = ${userId}
WHERE 
    c.id = ${params.courseId}  
GROUP BY
    c.id;
`;
    console.log(course[0]); 
    if(!course[0]){
return redirect("/");
    }
    
const progressCount=await getProgress(userId,course[0].id);
 return (
    <div className="h-full">
    <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
<CourseNavbar
course={course}
progressCount={progressCount}
/>
    </div>
        <div className="hidden md:flex h-full w-80 
        flex-col fixed inset-y-0 z-50">
<CourseSidebar
course={course[0]}
progressCount={progressCount}
/>
        </div>
        <main className="md:pl-80 h-full pt-[80px]">
        {children}
        </main>
        
    </div>
 )   
}

export default CourseLayout;