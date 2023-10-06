"use client";

import NavBarRoutes from "@/components/ui/NavBarRoutes";
import MobileSideBar from "./MobileSideBar";


const NavBar=()=>{
    return <>
    <div
    className="
    h-full
    flex
    flex-row
     
    items-center
    border-b">
        <div
        className="
        md:hidden
        flex
        pl-4"><MobileSideBar/></div>
        <div
        className="flex
        w-full
        justify-end
        ">
            <NavBarRoutes/>
        </div>
        
        </div></>
}

export default NavBar;