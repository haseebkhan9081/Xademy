import { db } from "@/lib/db";
import category from "@/types/category";
import Chapter from "@/types/chapters";
import { Course } from "@/types/course";
import { redirect } from "next/navigation";
type CourseWithDetails=Course & {
    category:category|null;
   chapters: Chapter[];
    
 }
 const CourseIdPage=async({
    params
 }:{params:{courseId:number}})=>{

    const course:CourseWithDetails[]=await db.$queryRaw`
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
    ) AS chapters 
FROM 
    Course c 
LEFT JOIN   
    Category cat ON c.categoryId = cat.id
LEFT JOIN 
    Chapter ch ON c.id = ch.courseId AND ch.isPublished = ${1}
where c.id=${params.courseId}
    GROUP BY
    c.id;  
 
    `;  
 if(!course[0]){
    return redirect("/");
 }
    return redirect(`/courses/${course[0].id}/chapters/${course[0]?.chapters?.[0].id}`);
}

export default CourseIdPage;