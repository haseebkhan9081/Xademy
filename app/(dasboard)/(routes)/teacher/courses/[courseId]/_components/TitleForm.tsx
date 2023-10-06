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
const formSchema = z.object({
  Title: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
})
 
const TitleForm = () => {
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            Title:"",
        }
    })
    const {isSubmitting,isValidating}=form.formState;
const onSubmit=(values:z.infer<typeof formSchema>)=>{
console.log(values.Title)
}

    return (   

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
                disabled={isSubmitting||isValidating}
                placeholder="e.g Intro To Programming.." {...field} />
              </FormControl>
              <FormDescription>
                what will you teach in this course?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
<Button
disabled={isSubmitting||isValidating}
type="submit"
>Submit</Button>

</form>
 </Form>       
    );
}
 
export default TitleForm;