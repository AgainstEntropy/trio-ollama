import { db } from "@/lib/db";
import { chatsTable } from "@/lib/schema";
import { eq, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    // const searchParams = req.nextUrl.searchParams;
    // const parentId: string = searchParams.get('parentId')!;

    const chats = await db.select()
            .from(chatsTable);

    return NextResponse.json(chats);
}