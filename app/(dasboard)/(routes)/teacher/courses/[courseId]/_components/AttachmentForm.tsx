"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod" 

import { Button } from "@/components/ui/button"
 
 import { useState } from "react"
 import { ImageIcon, Pen, PlusCircle,File, Loader2,X } from "lucide-react"
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
const [deleteId,setDeleteId]=useState<number|null>(null);
const router=useRouter();
     
const onDelete=(id:number)=>{
setDeleteId(id);
axios.delete(`/api/courses/${courseId}/attachment/${id}`)
.then((response)=>{
  toast.success("successfully deleted attachment")
})
.catch((err)=>{
  toast.error("something went wrong")
  console.log("error while deleting attachment",err)
})
.finally(()=>{
  setDeleteId(null);
  router.refresh();
})
 
  
}

const onSubmit=async(values:z.infer<typeof formSchema>)=>{

  console.log("this is uploaded url:",values.Url);
  axios.post(`/api/courses/${courseId}/attachment`,{ 
    Url:values.Url
    }).
    then((response)=>{
      toast.success("attachment was uploaded succesfully");
      router.refresh();
    }).catch((err)=>{
      toast.error("something went wrong");
      console.log(err);
    }).finally(()=>{
      router.refresh();
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
 mt-2
 flex-col
 w-full
 ">
{(Attachments?.length===0||!Attachments)  &&(
  <p
  
  className="text-sm mt-2
  text-slate-500 italic">
not attachments
  </p>
) }


{Attachments&&(
<div
className="
space-y-2">
{Attachments?.map((attachemnt,index)=>(
  <div
  key={index}
  className="
  bg-sky-100
  border-sky-200
  text-sky-700
  border
  rounded-md
  p-3
  flex
  items-center
  w-full">
    <File  className="w-4 h-4 mr-2 flex-shrink-0"/>
<p className="text-xs line-clamp-1">{attachemnt.name}</p>
{deleteId===attachemnt.id?(
  <div
  className="ml-auto">
<Loader2 className="h-4 w-4 animate-spin" />
  </div>
):(
   
       <button
       onClick={()=>onDelete(attachemnt.id) }
       className="ml-auto hover:opacity-75 transition ">
        <X className="h-4 w-4 "/>

       </button>
    
  
)}
  </div>

))}
</div>
)}
 </div>
</div>
) }
 
 </div>
    );
}
 
export default AttachmentForm;