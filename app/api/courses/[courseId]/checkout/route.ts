import { db } from "@/lib/db";
import Purchase from "@/types/Purchase";
import { Course } from "@/types/course";
import { StripeCustomer } from "@/types/stripeCustomer";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import {stripe} from "@/lib/stripe";
export async function POST(req:Request,
    {params}:{params:{courseId:number}}
    ){
try{
const user=await currentUser();
if(!user?.id||!user||!user?.emailAddresses?.[0]?.emailAddress){
    return new NextResponse("unAuthorized",{status:401});
}

const course:Course[]=await db.$queryRaw`
select * from Course where id=${params.courseId}
and isPublished=${1}`;
console.log("[COURSE CHECKOUT COURSE]",course[0]);
const purchase:Purchase[]=await db.$queryRaw`
select * from Purchase where userId=${user?.id}
and courseId=${params.courseId}`;
console.log("[COURSE CHECKOUT PURCHASE]",purchase[0]);
if(purchase[0] && purchase[0]?.id){
    return new NextResponse("Already Purchased",{status:400});
}

if(!course[0]){
    return new NextResponse("Not found",{status:404});
}
const line_items:Stripe.Checkout.SessionCreateParams.LineItem[]=[
    {
        quantity:1,
        price_data:{
            currency:"USD",
            product_data:{
                name:course[0].title,
                description:course[0]?.description!,

            },
            unit_amount:Math.round(course[0].price!*100),
        }
    }
];


let stripeCustomer:StripeCustomer[]=await db.$queryRaw`
select * from StripeCustomer where
userId=${user?.id}`;
console.log("[COURSE CHECKOUT STRIPECUSTOMER]",stripeCustomer[0]);
if(!stripeCustomer[0]?.id && !stripeCustomer[0]){
let customer=await stripe.customers.create({
    email:user.emailAddresses[0].emailAddress,
});
stripeCustomer=await db.$queryRaw`
insert into StripeCustomer(userId,stripeCustomerId) values(${user?.id},${customer.id})`;
stripeCustomer=await db.$queryRaw`
select * from StripeCustomer where 
userId=${user?.id}
and stripeCustomerId=${customer.id}`;
}
const session=await stripe.checkout.sessions.create({
    customer:stripeCustomer[0].stripeCustomerId,
    line_items,
    mode:'payment',
    success_url:`${process.env.NEXT_PUBLIC_APP_URL}/courses/${course[0].id}?success=1`,
    cancel_url:`${process.env.NEXT_PUBLIC_APP_URL}/courses/${course[0].id}?canceled=1`,
    metadata:{
        courseId:course[0]?.id,
        userId:user.id,
    }   
})
return NextResponse.json({url:session.url});
}catch(err){
console.log("[COURSE_ID_CHECKOUT]",err);
return new NextResponse("internal server Error",{status:500});
}
}