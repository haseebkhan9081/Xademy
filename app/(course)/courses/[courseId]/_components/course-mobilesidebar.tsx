import Chapter from "@/types/chapters"
import { Course } from "@/types/course"
import { UserProgress } from "@/types/userProgress";
import { Sheet,SheetContent,SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { CourseSidebar } from "./course-sidebar";
interface CourseMobileSidebarProps{
    course: Course & {
        chapters: (Chapter &{
         userProgress:UserProgress[]|null
        })[];
        
      };
      progressCount:number
}
export const CourseMobileSidebar=({
    course,
    progressCount
}:
    CourseMobileSidebarProps)=>{



    return(
       <> <Sheet>
       <SheetTrigger>
        <Menu/>
       </SheetTrigger>
<SheetContent side={"left"} className="p-0 bg-white w-72">
    <CourseSidebar
    course={course}
    progressCount={progressCount}/>
</SheetContent>
        </Sheet>
        </>)
}