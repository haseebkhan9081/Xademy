"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import Link from "next/link";
import { LogOut } from "lucide-react";

const NavBarRoutes=()=>{
    const pathname=usePathname();
const isTeacher=pathname.startsWith("/teacher");

return <>
<div
className="
flex
items-center
flex-row
gap-2
">
    {isTeacher?(
   <Link
   href="/">
   <Button
   size={"sm"}
   variant={"ghost"}>
       <div
       className="flex
       items-center
       flex-row
       "><LogOut
       className="w-4 h-4 mr-2
       "/>Exit</div> 
        
    </Button></Link> 
):(
<Link
href="/teacher/courses">
<Button
size={"sm"}
variant={"ghost"}>
    Teacher Mode
</Button></Link>
)}

 <UserButton 
 afterSignOutUrl='/'/>
   
</div>

    </>
}
export default NavBarRoutes;