"use client";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 
import { useConfettiStore } from "@/hooks/use-confetti-store";
interface ActionsProps{
    courseId:number;
    
    disabled?:boolean;
    isPublished:boolean
}

const Actions=({
disabled,
courseId,
 
isPublished
}:ActionsProps)=>{
    const confetti = useConfettiStore();
const [isLoading,setIsLoading]=useState(false);
    const router=useRouter();
    const onClick=()=>{
        try{
setIsLoading(true);
if(isPublished){
axios.patch(`/api/courses/${courseId}/unpublish`);
toast.success("unpublished");

}else{
    axios.patch(`/api/courses/${courseId}/publish`);
    toast.success("published");
    confetti.onOpen();
    
}
router.refresh();

        }catch(err){
            console.log("Course Actions",err);
toast.error("something went wrong");
        }finally{
setIsLoading(false);
router.refresh();
 
        }
    }
    const onDelete=async()=>{
        setIsLoading(true);
        await axios.delete(`/api/courses/${courseId}`).
        then(()=>{
             toast.success("deleted successfully");
             router.refresh();
             router.push(`/teacher/courses/create`);
        }).catch(()=>{
            toast.error("something went wrong");
        }).finally(()=>{
            setIsLoading(false);
            
        })
    
    }
   
    return (
    <div className="flex flex-row gap-x-3">
<Button
onClick={onClick}
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

export default Actions;