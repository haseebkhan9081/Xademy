import category from "@/types/category";
import Categories from "./_components/categories";
import { db } from "@/lib/db";

const SearchPgae =async () => {
const data:category[]=await db.$queryRaw`
select * from Category`;
    return ( <div>
       <Categories
       Categories={data}/>
    </div> );
}
 
export default SearchPgae;