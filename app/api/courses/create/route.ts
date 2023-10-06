import { auth } from "@clerk/nextjs";
import { MysqlError, PoolConfig, PoolConnection } from "mysql";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import jsonBigint from "json-bigint";
interface LastInsertIdResult {
    id: number;
  }
export async function POST(req: Request) {
  try {
    const { Title } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const result = await db.$queryRaw`
      INSERT INTO Course (title,userId) VALUES (${Title},${userId});
    `;

    if (!result) {
      return new NextResponse("Unable to create the course");
    }
    let lastInsertIdResult = await db.$queryRaw<LastInsertIdResult[]>`
    SELECT LAST_INSERT_ID() as id;
  `;
  
   
const newid=Number(lastInsertIdResult[0]?.id);
console.log(newid);
    return NextResponse.json({ id:newid });
  } catch (error: any) {
    console.log("Error while Creating Course", error);
    return new NextResponse("Internal error", { status: 501 });
  }
}