"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
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
import { Course } from "@/types/course"
import axios from "axios"
import { useRouter } from "next/navigation"
const formSchema = z.object({
  Title: z.string().min(10 )
})


interface ChapterTitleFormProps{
  data:string;
  courseId:number;
  ChapterId:number
}



const ChapterTitleForm:React.FC<ChapterTitleFormProps> = (
  {
    data,
    courseId,
    ChapterId
  }
) => {

const [isEditing,setIsEditing]=useState(false);
const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            Title:"",
        }
    })
    const {isSubmitting,isValidating}=form.formState;



const onSubmit=(values:z.infer<typeof formSchema>)=>{
  setIsEditing(false);
  console.log(values.Title)
  console.log("CourseId :",courseId);
  axios.patch(`/api/courses
  /${courseId}/chapter/${ChapterId}`,{Title:values.Title,
  Description:null
  }).
  then((response)=>{
    toast.success("chapter updated succesfully");
    router.refresh();
  }).catch((err)=>{
    toast.error("something went wrong");
    console.log(err);
  })

}

    return (   
<div
className="
mt-3
bg-slate-50
p-6
rounded-md
w-full
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
          name="Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input 
                disabled={isSubmitting}
                placeholder="e.g Introduction.." {...field} />
              </FormControl>
              <FormDescription>
                what will you teach in this chapter?
              </FormDescription>
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
>Submit</Button>
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
w-full
flex
flex-col
justify-between
items-center">
  <div
  className="
  w-full
  flex
  flex-row
  justify-between
  items-center">
  <span
  className="text-xl text-slate-800">Title</span>
  
  
   
  <Button
    className=" "
    onClick={()=>{setIsEditing(true)}}
    variant={"ghost"}
    > 
   <div
   className="
    
   flex
   flex-row
   justify-end
   gap-x-1">
 
  <Pen
  className="w-5 h-5"/> <p>Edit Title</p>
 
 
   </div>
    
    </Button>
  </div>
  <div
  className="
  flex
  justify-start
  w-full
  pl-0
  text-slate-700">
  <p
   >{data}</p>
   </div>
  </div>

) }
 
 </div>
    );
}
 
export default ChapterTitleForm;