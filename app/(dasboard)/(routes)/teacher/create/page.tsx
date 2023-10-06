"use client";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { Button } from "@/components/ui/button"
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const formSchema = z.object({
    Title: z.string().min(10, {
      message: "Course name must be at least 10 characters.",
    }),
  })

const CreateCoursePage = () => {
    const router=useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
      resolver:zodResolver(formSchema),
      defaultValues:{
        Title:"",
      }  
    })
    const onSubmit=(values:z.infer<typeof formSchema>)=>{
       
     axios.post("/api/courses/create",{Title:values.Title}).
     then((response)=>{
       console.log(response)

router.push(`/teacher/courses/${response.data.id}`);
toast.success("Course Created Successfully!");
     }).catch((err)=>{
      toast.error("something wen wrong!");
      console.log(err);
     })
    }
    const onClick=()=>{
        router.push("/");
    }
    return ( <div
    className="
    flex
    p-4
    flex-col 
    max-w-5xl
    mx-auto"
    >
       <div
       className="flex
       flex-col
       "
       >
        <h1
        className="
        text-2xl
        font-semibold
        te">
            What is the Title of your Course? 
        </h1>
         <p
         className="
         
         text-slate-300"
         >don&apos;t worry
          you can change this later 
       </p>
       
         </div> 
         <div
         className="mt-2">
         <Form 
         
         {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel><p className="
              text-xl">Title</p></FormLabel>
              <FormControl>
                <Input placeholder="e.g Intro to Programming" {...field} />
              </FormControl>
              <FormDescription>
                What are you going to teach in this course?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
        className="flex flex-row 
        space-x-2">
            <Button
            onClick={onClick}
            type="button"
            variant={"ghost"}>Cancel</Button> 
            <Button type="submit">Submit</Button></div>
       
      </form>
    </Form>
    </div>
        
        </div>
      );
}
 
export default CreateCoursePage;