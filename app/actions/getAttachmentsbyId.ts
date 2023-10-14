import { db } from "@/lib/db"
 import { Attachment } from "@/types/attachment";
const getAttachmentById = async (courseId: number): Promise<Attachment | null> => {
  const course = await db.$queryRaw<Attachment[]>`
    SELECT * FROM Attachment WHERE courseId = ${courseId}
  `;

  
  return course[0] || null; // Return null if no course is found
};

export default getAttachmentById;
