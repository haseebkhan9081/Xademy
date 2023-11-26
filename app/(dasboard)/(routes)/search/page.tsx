import category from "@/types/category";
import Categories from "./_components/categories";
import { db } from "@/lib/db";
import { SearchInput } from "@/components/Search-input";
import { getCourses } from "@/app/actions/get-course";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CourseList } from "@/components/courses-list";
interface SearchpageProps{
   searchParams:{
    title:string;
    categoryId:number;
   } 
}
const SearchPgae =async ({
    searchParams
}:SearchpageProps) => {
    const {userId}=auth();
    if(!userId){
        return redirect("/");
    }
const data:category[]=await db.$queryRaw`
select * from Category`;
    
    const courses=await getCourses({userId,...searchParams});
    // console.log("serach page courses",courses);
    return ( <>
    <div className="px-6 pt-6 md:hidden md:mb-0 block">
<SearchInput/>
    </div>
    <div className="p-6 space-y-4">
       <Categories
       Categories={data}/>
       <CourseList items={courses} />
    </div> </>);
}
 
export default SearchPgae;