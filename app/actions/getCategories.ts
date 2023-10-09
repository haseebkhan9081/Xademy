import { db } from "@/lib/db"
import category from "@/types/category"
const getCategories=
async():Promise<category[]|null>=>{

const result= await db.$queryRaw<category[]>`
SELECT * FROM Category
 `;
return result;
}
export default getCategories;