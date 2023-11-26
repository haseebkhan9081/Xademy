"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import Link from "next/link";
import { LogOut, SearchIcon } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { SearchInput } from "../Search-input";

const NavBarRoutes=()=>{
    const pathname=usePathname();
const isTeacher=pathname.startsWith("/teacher");
const isSearchPage=pathname==="/search";
const iscoursePage=pathname.includes("/courses")
return <>
{isSearchPage&&(
<div className="hidden p-6 md:block w-full">
<SearchInput/>
 </div>
)}
<div
className="
flex
items-center
flex-row
gap-2
">
    {isTeacher || iscoursePage?(
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
<div
className="
pr-2">
<UserButton 
 
 afterSignOutUrl='/'/>
   
</div>
 
</div>

    </>
}
export default NavBarRoutes;