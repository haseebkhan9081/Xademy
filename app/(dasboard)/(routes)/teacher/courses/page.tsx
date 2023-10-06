"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TeacherCourses = () => {
    const router=useRouter()
    const onClick=()=>{
        router.push("/teacher/create");
    }
    return <div
    className="flex
    w-full
    p-4"> 
        <Button
        onClick={onClick}
        type="button">
            Create
        </Button>
    </div>
}
 
export default TeacherCourses;