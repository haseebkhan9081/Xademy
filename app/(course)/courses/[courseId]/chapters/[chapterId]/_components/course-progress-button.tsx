"use client";

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps{
    chapterId:number;
    courseId:number;
    nextChapterId?:number;
    isCompleted?:boolean
       
}
export const CourseProgressButton=({
    chapterId,
    courseId,
    nextChapterId,
    isCompleted
}:CourseProgressButtonProps)=>{

    const router=useRouter();
    const confetti=useConfettiStore();
    const [isLoading,setIsLoading]=useState(false);
    
    const onClick=async()=>{
    try{
    setIsLoading(true);
axios.put(`/api/courses/${courseId}/chapter/${chapterId}/progress`,{
        isCompleted: !isCompleted
    }).catch((err)=>{
        console.log("[course progress button]",err);
        toast.error("something went wrong");
    })
    if(!isCompleted && !nextChapterId){
        confetti.onOpen();
    }
    if(!isCompleted && nextChapterId){
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
    }
    toast.success("progress updated");
    router.refresh();
    }catch{
    toast.error("something went wrong");
    }finally{
        setIsLoading(false);
        router.refresh();
    }
    }

const Icon=isCompleted?XCircle:CheckCircle;
 return <Button
 onClick={onClick}
 disabled={isLoading}
 className="w-full md:w-auto"
 type="button"
 variant={isCompleted?"outline":"success"}
 >
    {isCompleted? "Not completed":"Mark as complete"}
    <Icon className="h-4 w-4 ml-2"/>
 </Button>   
}