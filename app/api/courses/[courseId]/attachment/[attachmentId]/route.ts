import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request,
    {params}:{params:{courseId:number,attachmentId:number}}
){
try{

const {userId}=auth();
const {courseId,attachmentId}=params;
 if(!userId || !courseId ||!attachmentId){
    return new NextResponse("unAuthorized",{status:401});
 }

await db.$queryRaw`
delete from Attachment where courseId=${courseId} AND id=${attachmentId}` ;

return new NextResponse("succesfully deleted",{status:200});
}
catch(err:any){

}


}