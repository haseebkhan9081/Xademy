"use client";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface ChapterActionsProps{
    courseId:number;
    chapterid:number;
    disabled?:boolean;
    isPublished:boolean
}

const ChapterActions=({
disabled,
courseId,
chapterid,
isPublished
}:ChapterActionsProps)=>{
const [isLoading,setIsLoading]=useState(false);
    const router=useRouter();
    const onDelete=async()=>{
        setIsLoading(true);
        await axios.delete(`/api/courses/${courseId}/chapter/${chapterid}`).
        then(()=>{
             toast.success("deleted successfully");
             router.refresh();
             router.push(`/teacher/courses/${courseId}`);
        }).catch(()=>{
            toast.error("something went wrong");
        }).finally(()=>{
            setIsLoading(false);
        })
    
    }
   
    return (
    <div className="flex flex-row gap-x-3">
<Button
onClick={()=>{}}
variant={"outline"}
disabled={disabled||isLoading}
size={"sm"}>

{isPublished?"Unpublish":"Publish"}
</Button>
<ConfirmationModal onConfirm={onDelete}><Button 
onClick={()=>{}}
disabled={isLoading}
size={"sm"}>
    <Trash className="h-4 w-4 "/>
   </Button> 
   </ConfirmationModal>
    </div>
   ); 
}

export default ChapterActions;