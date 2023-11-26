import { db } from "@/lib/db";
import  Purchase  from "@/types/Purchase";
import category from "@/types/category"
import Chapter from "@/types/chapters";
import { Course } from "@/types/course";
import { getProgress } from "./getProgress";

type CourseWithProgressWithCategory =Course &{
    Category :category|null;
    Chapters:Chapter[];
    progress:number|null
 }

 
  type CourseWithDetails=Course & {
       Category:category|null;
      Chapters: Chapter[];
      purchases: {id: number;}[];
    }
    
    
  
  
  
   
type GetCourses={
    userId:string;
    title?:string|'';
    categoryId:number
};

export const getCourses=async({
    userId,
    title,
    categoryId
}:GetCourses):Promise<CourseWithProgressWithCategory[]>=>{
try{
   
  if(!title){
    title='';
  }
   
   
const courses:CourseWithDetails[]  = await db.$queryRaw<CourseWithDetails[]>`
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
    JSON_OBJECT(
      'id', cat.id,
      'name', cat.name
  ) AS category,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', ch.id,
            'title', ch.title,
            'description',ch.description,
            'videoUrl',ch.videoUrl,
            'position',ch.position,
            'isPublished',ch.isPublished,
            'isFree',ch.isFree,
            'courseId',ch.courseId 
        )
    ) AS chapters,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', p.id,
            'userId',p.userId,
            'courseId',p.courseId
        )
    ) AS purchases
FROM 
    Course c
LEFT JOIN 
        Purchase p ON c.id = p.courseId and p.userId=${userId} and p.id is not null
LEFT JOIN   
    Category cat ON c.categoryId = cat.id
LEFT JOIN 
    Chapter ch ON c.id = ch.courseId AND ch.isPublished = ${1}
WHERE  
    c.isPublished = ${1}  
    AND c.title LIKE ${'%'+title+'%'}
    AND c.categoryId =${categoryId}
GROUP BY
    c.id;
 `;
console.log("getCourses ",courses[2].purchases );
const coursesWithProgress:CourseWithProgressWithCategory[]=await 
Promise.all(
    courses.map(async(course,index)=>{
       if(course.purchases.length>=1 && course.purchases.every(purchase => purchase.id === null)){
        console.log("this course was not purchased")
        return {
            ...course,
            progress:null,
        }
       }
       console.log("this course was purchased",course.purchases);
       const progressPercentage=await getProgress(userId,course.id); 
       return {
        ...course,
        progress:progressPercentage,

       }
    })


)
 
return coursesWithProgress;
}catch(err){
console.log("[GET COURSES]",err);
return [];
}
}