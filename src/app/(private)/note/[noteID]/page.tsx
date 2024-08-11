import { db } from "@/lib/db";
import { notesTable, NoteType } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import Editor from "@/components/note/novel/editor";


export default async function Page({ params }: { params: { noteID: string } }) {

    const notes: NoteType[] = await db
        .selectDistinct()
        .from(notesTable)
        .where(eq(notesTable.id, params.noteID));
    const note = notes[0];

    return (
        <main className="flex flex-grow justify-center h-full mx-auto max-w-sm md:max-w-5xl">
            <div className="flex flex-col flex-grow mt-20">
                <Editor note={note} />
            </div>
        </main>
    );
};

export async function generateStaticParams() {

    const notes = await db
        .select()
        .from(notesTable);

    const paths = notes.map(note => {
        return { noteID: note.id };
    });

    return paths;
}