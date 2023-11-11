"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod" 
import { MuxData } from "@/types/MuxData"
import { Button } from "@/components/ui/button"
 import  MuxPlayer from "@mux/mux-player-react";
 import { useState } from "react"
 import { ImageIcon, Pen, PlusCircle, Video } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FileUpload } from "@/components/file-upload"
const formSchema = z.object({
  videoUrl: z.string().min(10, {
    message: "Image is required",
  }),
})




interface VideoFormprops{
  MuxData:MuxData|null;
  videoUrl:string|null;
  courseId:number;
  chapterId:number
}


const ChapterVideoForm:React.FC<VideoFormprops> = (
  {
    videoUrl,
    courseId,
    chapterId,
    MuxData
  }
) => {

const [isEditing,setIsEditing]=useState(false);
const router=useRouter();
     


const onSubmit=async(values:z.infer<typeof formSchema>)=>{
  axios.patch(`/api/courses/${courseId}/chapter/${chapterId}`,{Title:null,
    Description:null,
    videoUrl:values.videoUrl
    }).
    then((response)=>{
      toast.success("updated succesfully");
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
          endpoint="chapterVideo"
          onChange={(url)=>{
if(url){
  onSubmit({videoUrl:url});
}
          }}
          />

          <div
          className="
          text-xs text-muted-foreground
          mt-4">
video may take a couple of minutes to load,refresh if the video doesnt load
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
  className="text-xl text-slate-800">Chapter Video</span>
  
  
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
 
   <p>{!videoUrl?(<div
   className="
   flex
   flex-row
   items-center
   gap-x-1
   text-slate-700
   justify-end">
    <PlusCircle className="w-5 h-5"/>
    <p
    className="">Add video</p></div>):(
   <div
   className="
   flex
   text-slate-700
   flex-row
   items-center
   gap-x-1
   justify-end">
   <Pen
   className="w-5 h-5 "/><p className="">Edit Video</p></div>)}</p>
 
 
   </div>
    
    </Button>
  
</div>
<div>
  {videoUrl?(
    <div
    className="
    relative aspect-video
    mt-2

    "> 
<MuxPlayer
playbackId={MuxData?.playbackId||""}
/>
    </div>
  ):(
    <div
    className="
    flex items-center
    justify-center
    h-60
    bg-slate-200
    rounded-md">
<Video
className="h-10 w-10 text-slate-500"
/>

    </div>
  )}
</div>
</div>
) }
 {(!isEditing && videoUrl) &&(
  <p
  className="text-xs text-muted-foreground
  mt-4">
if the video doesn't load ,refresh .the video may take a couple of  minutes to process
  </p>
 )}
 </div>
    );
}
 
export default ChapterVideoForm;