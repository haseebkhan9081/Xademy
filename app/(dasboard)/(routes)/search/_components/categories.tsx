"use client"; 
import { db } from "@/lib/db";
import category from "@/types/category";
import { IconType } from "react-icons";
interface CategoriesProps{
    Categories:category[]
}
import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode
  } from "react-icons/fc";
import { CategoryItem } from "./CategoryItem";
const iconMap:Record<category["name"],IconType>={
    "Music": FcMusic,
  "Photography": FcOldTimeCamera,
  "Fitness": FcSportsMode,
  "Accounting": FcSalesPerformance,
  "Computer Science": FcMultipleDevices,
  "Filming": FcFilmReel,
  "Engineering": FcEngineering,
}
const Categories= ({Categories}:CategoriesProps)=>
{
 

 
 return <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
  {Categories.map((item,index)=>{
   return ( <CategoryItem
    label={item.name}
    key={index}
    icon={iconMap[item.name]}
  value={item.id}
    />)
  })}  
 </div>   
}
export default Categories;