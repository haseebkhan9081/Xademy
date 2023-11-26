
import Image from 'next/image'
import { UserButton, auth } from "@clerk/nextjs";
 
 
import axios from "axios";
import { getDashboardCourses } from '@/app/actions/get-dashboard-courses';
import { CourseList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { redirect } from 'next/navigation';
import { CheckCircle, Clock } from 'lucide-react';
export default async function DashBoard() {
const {userId}=auth()
if(!userId){
  return redirect("/");
}

 
const{
  completedCourses,
  courseInProgress
}=  await getDashboardCourses(userId!);
  return (
    <div className="p-6 space-y-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     <InfoCard
        icon={Clock}
        label="In Progress"
        numberOfItems={courseInProgress.length}
     />
     <InfoCard
        icon={CheckCircle}
        label="Completed"
        numberOfItems={completedCourses.length}
        variant="success"
     />
    </div>
    <CourseList
      items={[...courseInProgress, ...completedCourses]!}
    />
  </div>
  )
}
