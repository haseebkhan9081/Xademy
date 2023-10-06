import { db } from "@/lib/db"
import Chapter from "@/types/chapters"
const getChaptersbyCourseId=
async(courseId:number):Promise<Chapter[]|null>=>{

return await db.$queryRaw`
SELECT * from Chapter where courseId=${courseId}
`;

}


export default getChaptersbyCourseId;