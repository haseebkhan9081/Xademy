 import Image from "next/image";
import { SidebarRoutes } from "./SideBarRoutes";

export default function SideBar() {
  return (
    <div
    className='
    h-full 
    md:border-r
    flex 
    flex-col 
    overflow-y-auto
     bg-white 
     shadow-sm
     gap-6

    '
    >
        <div
        className="
        mt-4
        flex
        flex-row
        items-center
        justify-center
        gap-2
        w-full">
            <Image
            src='logo.svg'
            height={40}
            width={40}
            alt="logo"
            />
            <p
            className="
            text-xl
            md:text-2xl
            font-bold
            ">
                Xademy
            </p>
        </div>
        <div
        className="
        flex
        flex-row
        w-full
        ">
<SidebarRoutes/>

        </div>
    </div>
  )
}
