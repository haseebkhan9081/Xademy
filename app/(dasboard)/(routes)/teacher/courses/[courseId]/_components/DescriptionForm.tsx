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
const formSchema = z.object({
  Description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})




interface DescriptionFormprops{
  Description:string|null;
  courseId:number
}


const DescriptionForm:React.FC<DescriptionFormprops> = (
  {
    Description,
    courseId
  }
) => {

const [isEditing,setIsEditing]=useState(false);
const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            Description:"",
        }
    })
    const {isSubmitting,isValidating}=form.formState;



const onSubmit=async(values:z.infer<typeof formSchema>)=>{
  axios.patch(`/api/courses/${courseId}`,{Title:null,
    Description:values.Description
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
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                disabled={isSubmitting}
                placeholder="e.g in this course.." {...field} />
              </FormControl>
              <FormDescription>
                write a breif introduction for your course such as what is the requirments...
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
  className="text-xl text-slate-800">Description</span>
  
  
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
 
  <Pen className="w-5 h-5"/> <p>Edit Description</p>
 
 
   </div>
    
    </Button>
  
</div>
<div>
  {Description?(
    <p
    className=" 
    text-slate-400
    line-clamp-1
    italic">{Description}</p>
  ):(
    <p
    className="
    text-slate-400
    italic
    ">
      no description
    </p>
  )}
</div>
</div>
) }
 
 </div>
    );
}
 
export default DescriptionForm;