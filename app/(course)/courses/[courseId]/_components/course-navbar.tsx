import NavBarRoutes from "@/components/ui/NavBarRoutes";
import Chapter from "@/types/chapters";
import { Course } from "@/types/course";
import { UserProgress } from "@/types/userProgress";
import { CourseMobileSidebar } from "./course-mobilesidebar";

interface CourseNavbarProps{
    course: Course & {
        chapters: (Chapter &{
         userProgress:UserProgress[]|null
        })[];
        
      };
      progressCount:number

}
const CourseNavbar=({
    course,
    progressCount
}:CourseNavbarProps)=>{



return (
<div className="h-full border-b p-4 justify-between  flex items-center bg-white shadow-sm">
<CourseMobileSidebar

course={course}
progressCount={progressCount}/>
<NavBarRoutes/>
</div>

);    
}
export default CourseNavbar;