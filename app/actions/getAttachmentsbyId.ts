import { db } from "@/lib/db"
 import { Attachment } from "@/types/attachment";
const getAttachmentById = async (courseId: number): Promise<Attachment[] | null> => {
  const attachment = await db.$queryRaw<Attachment[]>`
    SELECT * FROM Attachment WHERE courseId = ${courseId}
  `;

  
  return attachment || null; // Return null if no course is found
};

export default getAttachmentById;
