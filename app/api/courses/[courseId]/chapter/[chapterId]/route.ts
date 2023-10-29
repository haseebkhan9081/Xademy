import { NextResponse } from "next/server";

export async function Patch(
 req:Request,
 {params}:{params:{courseId:number,
chapterId:number}}    ) {
    
try{

}catch(err:any){

    console.log("[chapters Patch error]: ",err);
    return new NextResponse

}

}