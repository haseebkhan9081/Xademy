"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useState } from "react"
import { IconBadge } from "@/components/icon-badge"
import { Pen } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Editor } from "@/components/editor"
import { Preview } from "@/components/preview"
import { Checkbox } from "@/components/ui/checkbox"
const formSchema = z.object({
  IsFree: z.boolean(),
})




interface ChapterAccessFormprops{
  IsFree:boolean;
  courseId:number;
  chapterId:number
}


const ChapterAccessForm:React.FC<ChapterAccessFormprops> = (
  {
    IsFree,
    courseId,
    chapterId
  }
) => {

const [isEditing,setIsEditing]=useState(false);
const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            IsFree:IsFree,
        }
    })
    const {isSubmitting,isValidating}=form.formState;



const onSubmit=async(values:z.infer<typeof formSchema>)=>{
  axios.patch(`/api/courses/${courseId}/chapter/${chapterId}`,{Title:null,
    Description:null,
    IsFree:values.IsFree
    }).
    then((response)=>{
      toast.success(" updated succesfully");
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
  <Form
 {...form}>
<form 
onSubmit={form.handleSubmit(onSubmit)} 
className="space-y-8
"
>
<FormField
          control={form.control}
          name="IsFree"
          render={({ field }) => (
            <FormItem className="flex flex-row 
            space-x-3 items-center items-start space-y-0 
            rounded-md border p-4">
             
              <FormControl>
                 <Checkbox
                 checked={field.value}
                 onCheckedChange={field.onChange}    
                 />
                 </FormControl>
                 <div
                 className="space-y-1 
                 leading-none">
              <FormDescription>
                check this box if you want this chapter to be free for preview
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      <div
      className="
      flex
      flex-row
      justify-between">  
<Button
disabled={isSubmitting||isValidating}
type="submit"
>Save</Button>
<Button
type="button"
variant={"ghost"}
onClick={()=>{setIsEditing(false)}}
disabled={isSubmitting}>
  
  Cancel
</Button>
</div>

</form>
 </Form>       
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
  className="text-xl text-slate-800">Access settings</span>
  
  
    <Button
    className=""
    onClick={()=>{setIsEditing(true)}}
    variant={"ghost"}
    > 
   <div
   className="
    
   flex
   flex-row
   gap-x-1
   justify-end">
 
  <Pen className="w-5 h-5"/> <p>Edit Access</p>
 
 
   </div>
    
    </Button>
  
</div>
<div>
  {IsFree?(
    <div
    className=" 
    text-slate-600
    line-clamp-1
    italic">

       this chapter is free for preview
    </div>
  ):(
    <p
    className="
    text-slate-400
    italic
    ">
     this chapter is not free for preview
    </p>
  )}
</div>
</div>
) }
 
 </div>
    );
}
 
export default ChapterAccessForm;