import { Payment, columns } from "./_components/columns"
import { DataTable } from "../courses/_components/data-table"

import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { Course } from "@/types/course";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

 
const TeacherCourses =async () => {
    const {userId}=auth();
 if(!userId){
    redirect("/");
 }
      const data:Course[] = await db.$queryRaw`select * from Course where userId=${userId}`  
    return <div
    className="flex
    w-full
    p-4"> 
        <DataTable columns={columns} data={data} />
    </div>
}
 
export default TeacherCourses;