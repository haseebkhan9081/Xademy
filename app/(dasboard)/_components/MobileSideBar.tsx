"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Menu } from "lucide-react";
import { SidebarRoutes } from "./SideBarRoutes";
import SideBar from "./SideBar";
  


const MobileSideBar=()=>
{
    return <>
    <Sheet>
        <SheetTrigger>
          <div> 
            <Menu/>
            </div>  
        </SheetTrigger>
        <SheetContent side={"left"}>
            <SideBar/>
        </SheetContent>
    </Sheet>
        </>
}

export default MobileSideBar;