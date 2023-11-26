import { db } from "@/lib/db";
import category from "@/types/category"
import Chapter from "@/types/chapters";
import { Course } from "@/types/course"
import { getProgress } from "./getProgress";

type CourseWithProgressWithCategory=Course&{
Category:category;
Chapters:Chapter[];
progress:number|null
}
type DashboardCourses={
    completedCourses:CourseWithProgressWithCategory[];
    courseInProgress:CourseWithProgressWithCategory[]

}
type purchasedCourses =Course&{
        Category:category;
        Chapters:Chapter[];
        progress:number|null
    }
  
export const getDashboardCourses=async(userId:string):Promise<DashboardCourses>=>{
      
    try{
const courses:CourseWithProgressWithCategory[]=await db.$queryRaw`
SELECT
    Course.*,
      
    JSON_OBJECT(
        'categoryId', Category.id,
        'categoryName', Category.name
    ) AS Category,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'chapterId', Chapter.id,
            'chapterTitle', Chapter.title,
            'isPublished', Chapter.isPublished
        )
    ) AS Chapters
FROM
Purchase
JOIN Course ON Purchase.courseId = Course.id
JOIN Category ON Course.categoryId = Category.id
LEFT JOIN Chapter ON Course.id = Chapter.courseId
WHERE
Purchase.userId =${userId}
    AND Chapter.isPublished = ${1}
GROUP BY
Course.id
`;
console.log("[GET_DASHBOARD_COURSES_purchasedCourses]",courses[0].Category);
 

for(let course of courses){
const progress=await getProgress(userId,course.id);
course["progress"]=progress;
}

const completedCourses=courses.filter((course)=>course.progress===100);
const courseInProgress=courses.filter((course)=>(course.progress??0)<100);
console.log("[GET_DASHBOARD_COURSES_COMPLETED_COURSES]",completedCourses);
console.log("[GET_DASHBOARD_COURSES_COURSE]",courseInProgress);

return {
    completedCourses,
    courseInProgress
}
return {
    completedCourses:[],
    courseInProgress:[]
} ;
    }catch(err){
        console.log("[GET_DASHBOARD_CHAPTERS]",err);
        return {
            completedCourses:[],
            courseInProgress:[]
        }
    }


}