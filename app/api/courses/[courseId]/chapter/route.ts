import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req:Request,
    {params}:{params:{courseId:number}}
    ){
try{
const {Title}=await req.json();    
const {userId}=auth();
const {courseId}=params;
 
if(!userId){
    return new NextResponse("Unauthorized",{status:401});
}
if(!courseId){
redirect(`/teacher/courses`);

}
const course=await db.$queryRaw`select
 * from Course where id=${courseId} AND userId=${userId}
`;

if(!course){
    return new NextResponse("Unauthorized",{status:401});
}

await db.$queryRaw`
insert into Chapter(title,position,courseId) values(${Title},${courseId},${courseId})`;


return new NextResponse("succesfully created chapter",{status:200});

}catch(err:any){
    console.log("error while creating the chapter",err);
    return new NextResponse("Internal server Error",{status:500});
}

}