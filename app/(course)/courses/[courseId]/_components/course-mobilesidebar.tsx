import Chapter from "@/types/chapters"
import { Course } from "@/types/course"
import { UserProgress } from "@/types/userProgress";
import { Sheet,SheetContent,SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { CourseSidebar } from "./course-sidebar";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { useState } from "react";
import axios from "axios";
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
       <> <div
       ><Sheet >
       <SheetTrigger className="md:hidden block">
        <Menu/>
       </SheetTrigger>
<SheetContent side={"left"} className="p-0 bg-white w-72">
    <CourseSidebar
    course={course}
    progressCount={progressCount}/>
</SheetContent>
        </Sheet>
        </div>
        </>)
}