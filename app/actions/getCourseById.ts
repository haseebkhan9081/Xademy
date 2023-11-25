import { db } from "@/lib/db"
 import { Course } from "@/types/course";
const getCourseById = async (courseId: number): Promise<Course | null> => {
  const course:Course[] = await db.$queryRaw<Course[]>`
    SELECT * FROM Course WHERE id = ${courseId}
  `;

  
  return course[0] || null; // Return null if no course is found
};

export default getCourseById;
