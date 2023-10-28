"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Textarea } from "@/components/ui/textarea"
import ChaptersList from "./ChaptersList"
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
import { Loader2, Pen, PlusCircle } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import Chapter from "@/types/chapters"
const formSchema = z.object({
  Title:z.string().min(1),
})




interface ChaptersFormprops{
  Chapters:Chapter[]|[];
  courseId:number
}


const ChaptersForm:React.FC<ChaptersFormprops> = (
  {
    Chapters,
    courseId
  }
) => {

const [isCreating,setIsCreating]=useState(false);
const [isUpdating,setIsUpdating]=useState(false);
const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            Title:"",
        }
    })
    const {isSubmitting,isValidating}=form.formState;


const onEdit=(id:number)=>{
router.push(`/teacher/courses/${courseId}/chapters/${id}`);
}
const onSubmit=async(values:z.infer<typeof formSchema>)=>{
  axios.post(`/api/courses/${courseId}/chapter`,{Title:values.Title}).
    then((response)=>{
      toast.success(" chapter created succesfully");
      router.refresh();
    }).catch((err)=>{
      toast.error("something went wrong");
      console.log(err);
    }).finally(()=>{
      setIsCreating(false);
    })
}

const onReorder=async(updateData:{id:number;position:number}[])=>{
  setIsUpdating(true);
axios.put(`/api/courses/${courseId}/chapter/reorder`,{updateData:updateData
})
.then((response)=>{
   toast.success("updated order")
}).
catch((err)=>{
  console.log("re-order",err);
  toast.error("something went wrong");
}).
finally(()=>{
  setIsUpdating(false);
})
}

    return (   
<div
className="
w-full
mt-3
bg-slate-50
p-6
rounded-md
 relative
">
{isUpdating&&(
  <div
  className="w-full  p-6 rounded-md h-full  
  absolute justify-center items-center flex 
  bg-slate-50/50 text-sky-700 top-0 left-0 ">
<Loader2 className="w-6 h-6 animate-spin"/>
  </div>
)}
{isCreating ? (
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
              <FormLabel>Chapter</FormLabel>
              <FormControl>
                <Input 
                disabled={isSubmitting}
                placeholder="e.g 'Introduction to the course '" {...field} />
              </FormControl>
              <FormDescription>
                 write the name of the chapter
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
>Create</Button>
<Button
type="button"
variant={"ghost"}
onClick={()=>{setIsCreating(false)}}
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
  className="text-xl text-slate-800">Chapters</span>
  
  
    <Button
    className=""
    onClick={()=>{setIsCreating(true)}}
    variant={"ghost"}
    > 
   <div
   className="
    
   flex
   flex-row
   gap-x-1
   justify-end">
 
  <PlusCircle className="w-5 h-5"/> <p>Add Chapter</p>
 
 
   </div>
    
    </Button>
  
</div>
<div
className="italic text-slate-400 ">
{!Chapters.length && "no chapters"}

</div>

<ChaptersList
items={Chapters||[]}
onReorder={onReorder}
onEdit={onEdit}
/>

<div
className="
text-slate-400  italic">
{(Chapters.length>0 && !isCreating) && `drag 
and drop to re-order`}
</div>
</div>
) }
 
 </div>
    );
}
 
export default ChaptersForm;