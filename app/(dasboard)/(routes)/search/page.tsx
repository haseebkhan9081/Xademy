import category from "@/types/category";
import Categories from "./_components/categories";
import { db } from "@/lib/db";
import { SearchInput } from "@/components/Search-input";

const SearchPgae =async () => {
const data:category[]=await db.$queryRaw`
select * from Category`;
    return ( <>
    <div className="px-6 pt-6 md:hidden md:mb-0 block">
<SearchInput/>
    </div>
    <div className="p-6">
       <Categories
       Categories={data}/>
    </div> </>);
}
 
export default SearchPgae;