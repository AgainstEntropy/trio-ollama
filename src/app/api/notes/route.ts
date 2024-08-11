import { db } from "@/lib/db";
import { notesTable } from "@/lib/schema";
import { eq, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const parentId: string = searchParams.get('parentId')!;

    const notes = (parentId === "undefined") ?
        await db.select()
            .from(notesTable)
            .where(isNull(notesTable.parentId))
        :
        await db.select()
            .from(notesTable)
            .where(eq(notesTable.parentId, parentId));
            
    return NextResponse.json(notes);
}