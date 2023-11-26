import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import {headers} from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function POST(req:Request){
    console.log("[WEBHOOK just entered]");

    const body=await req.text();
    const signature=headers().get("Stripe-Signature") as string;
    let event:Stripe.Event;

    try{
        event=stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    }
    catch(error:any){
        return new NextResponse(`Webhook Error: ${error.message}`,{status:400});
        
    }
    console.log("[WEBHOOK just passed try block]");
  const session=event.data.object as Stripe.Checkout.Session;  
const userId=session?.metadata?.userId;
const courseId=session?.metadata?.courseId;

if(event.type==="checkout.session.completed"){
    if(!userId||!courseId){
        return new NextResponse(`webhook error:Missing meta data`,{status:400})
    }
    console.log("[WEBHOOK ABOUT TO INSERT INTO PURCHASE]");
    await db.$queryRaw`insert into Purchase(userId,courseId) values(${userId},${courseId})`
}else{
    return new NextResponse(`webhook Error:unhandled event type ${event.type}`,{status:200});
}
return new NextResponse(null,{status:200});
}