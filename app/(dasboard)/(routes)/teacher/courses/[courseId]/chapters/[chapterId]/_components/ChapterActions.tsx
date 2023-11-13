import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

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
   
   
    return (
    <div className="flex flex-row gap-x-3">
<Button
onClick={()=>{}}
variant={"outline"}
disabled={disabled}
size={"sm"}>

{isPublished?"Unpublish":"Publish"}
</Button>
<Button 
onClick={()=>{}}
size={"sm"}>
    <Trash className="h-4 w-4 "/>
   </Button> 
    </div>
   ); 
}

export default ChapterActions;