"use server";

import { eq } from "drizzle-orm";
import { db } from '@/lib/db';
import { notesTable, NoteType } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { emptyEditorContent } from "@/components/note/novel/empty-content";

export async function createNote(parentId?: string) {

    const createData = {
        parentId: parentId,
        content: JSON.stringify(emptyEditorContent),
    };

    const newNotes: NoteType[] = await db.insert(notesTable)
        .values(createData)
        .returning();

    revalidatePath('/note');

    return newNotes[0].id;
}

export async function updateNote(id: string, updateData: any) {

    await db.update(notesTable)
        .set(updateData)
        .where(eq(notesTable.id, id));

    revalidatePath('/note');
}


export default async function deleteNote(id?: string) {

    if (!id) {
        return {
            message: 'No id provided'
        }
    }

    const deletedNotes: NoteType[] = await db.delete(notesTable)
        .where(eq(notesTable.id, id))
        .returning();

    revalidatePath('/note');

    return deletedNotes[0].parentId;
}