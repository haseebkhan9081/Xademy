import { db } from "@/lib/db"
import Chapter from "@/types/chapters"
const getChaptersbyCourseId=
async(courseId:number):Promise<Chapter[]|null>=>{

return await db.$queryRaw<Chapter[]|null>`
SELECT * from Chapter where courseId=${courseId}
order by position
`;

}


export default getChaptersbyCourseId;