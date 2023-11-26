"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown,  MoreHorizontal, PenIcon, Pencil } from "lucide-react"
import { Badge } from "@/components/ui/badge"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Course } from "@/types/course"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header:({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "isPublished",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            isPublished
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
     cell:  ({ row }) => {
      const status = row.getValue("isPublished");
        
 
      return <div className={cn(
        "text-right font-medium",
        status?"text-sky-700":"text-slate-400"
      )}>

        <Badge
        className={
          cn("",
          status?"bg-sky-700":"bg-slate-500")
        }>
          {status?"Published":"unPublished"}
        </Badge>
      </div>
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))||0;

     
       const numberValue = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
     
      return <div className="text-right font-medium">{numberValue}</div>
    },
  },
  {
    
        id: "actions",
        cell: ({ row }) => {
          const {id} = row.original
          
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                
                <DropdownMenuItem

                   
                >
                  <Link
                  className="flex flex-row items-center w-full justify-between"
                  href={`/teacher/courses/${id}`}>
                  Edit <Pencil className="h-4 w-4 "/>
                  </Link>
                 
                </DropdownMenuItem>
                 
              </DropdownMenuContent>
            </DropdownMenu>
          )
        
      },
  }
  
]
