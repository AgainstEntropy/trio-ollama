"use server";

import { eq } from "drizzle-orm";
import { db } from '@/lib/db';
import { chatsTable, ChatType } from '@/lib/schema';
import { revalidatePath } from 'next/cache';

export async function createChat() {

    const createData = {
        history: "[]",
    };

    const newChats: ChatType[] = await db
        .insert(chatsTable)
        .values(createData)
        .returning();

    const id = newChats[0].id;
    revalidatePath(`/(private)/chat/${id}`);
    revalidatePath('/(private)/chat/[chatID]', 'page');

    return id;
}

export async function updateChat(id: string, updateData: any) {

    await db.update(chatsTable)
        .set(updateData)
        .where(eq(chatsTable.id, id));

    revalidatePath('/(private)/chat/[chatID]', 'page');
    revalidatePath(`/(private)/chat/${id}`);
}


export async function deleteChat(id?: string) {

    if (!id) {
        return {
            message: 'No id provided'
        }
    }

    await db.delete(chatsTable)
        .where(eq(chatsTable.id, id));

    revalidatePath('/(private)/chat/[chatID]', 'page');
}