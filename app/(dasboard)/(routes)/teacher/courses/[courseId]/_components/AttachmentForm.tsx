"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod" 

import { Button } from "@/components/ui/button"
 
 import { useState } from "react"
 import { ImageIcon, Pen, PlusCircle,File } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FileUpload } from "@/components/file-upload"
import { Attachment } from "@/types/attachment"
const formSchema = z.object({
  Url: z.string().min(1, {
     
  }),
})




interface AttachmentFormprops{
  Attachments?:Attachment[]|null;
  courseId:number
}


const AttachmentForm:React.FC<AttachmentFormprops> = (
  {
    Attachments,
    courseId
  }
) => {

const [isEditing,setIsEditing]=useState(false);
const router=useRouter();
     


const onSubmit=async(values:z.infer<typeof formSchema>)=>{
  axios.patch(`/api/courses/${courseId}`,{Title:null,
    Description:null,imageUrl:values.Url
    }).
    then((response)=>{
      toast.success("Image was updated succesfully");
      router.refresh();
    }).catch((err)=>{
      toast.error("something went wrong");
      console.log(err);
    }).finally(()=>{
      setIsEditing(false);
    })
}

    return (   
<div
className="
mt-3
bg-slate-50
p-6
rounded-md
">

{isEditing ? (
        <div
        className=" ">
         <div
         className="
         w-full  justify-end flex"> 
         <Button
         onClick={()=>setIsEditing(false)}
          variant="ghost"
            >Cancel</Button>
 </div>         <FileUpload
          endpoint="courseAttachment"
          onChange={(url)=>{
if(url){
  onSubmit({Url:url});
}
          }}
          />

          <div
          className="
          text-xs text-muted-foreground
          mt-4">
 Attach anything the students may need to complete this course. 
          </div>
        </div>      
):(
  <div
  className="
  flex
  flex-col
  w-full">
<div
className="
w-full
flex
flex-row
justify-between
items-center">
  <span
  className="text-xl text-slate-800">Course Attachment</span>
  
  
    <Button
    className=""
    onClick={()=>{setIsEditing(true)}}
    variant={"ghost"}
    > 
   <div
   className="
    
   flex
   flex-row
   items-center
   gap-x-1
   justify-end">
 
   <p>{ (<div
   className="
   flex
   flex-row
   items-center
   gap-x-1
   text-slate-700
   justify-end">
    <PlusCircle className="w-5 h-5"/>
    <p
    className="">Add attachment</p></div>
    )}</p>
 
 
   </div>
    
    </Button>
  
</div>
 <div
 className="
 flex
 flex-col
 w-full
 ">
 
 </div>
</div>
) }
 
 </div>
    );
}
 
export default AttachmentForm;