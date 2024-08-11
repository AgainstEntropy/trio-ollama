"use client";

import { useState } from "react";
import useSWR from 'swr'
import NoteItem from "./note-item";
import { NoteType } from "@/lib/schema";
import { cn } from "@/lib/utils";


interface NoteListProps {
    parentId?: string;
    level?: number;
}

function NoteList({ parentId, level = 0 }: NoteListProps) {

    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const { data, error, isLoading } = useSWR(`/api/notes?parentId=${parentId}`, fetcher)

    if (isLoading) return <div>Loading notes...</div>
    if (error) return <div>Failed to load notes</div>

    const notes: NoteType[] = data;

    if (notes.length === 0) return (
        <div style={{ paddingLeft: `${level * 12 + 25}px` }}
        className={cn("text-muted-foreground")}>
            No notes here
        </div>
    )

    const onExpand = (noteId: string) => {
        setExpanded((prevExpanded) => ({
            ...prevExpanded,
            [noteId]: !prevExpanded[noteId],
        }));
    };

    return (
        <div className="flex flex-col gap-1">
            {notes.map(note => (
                <div key={note.id} className="flex flex-col gap-1">
                    <NoteItem
                        note={note}
                        level={level}
                        expanded={expanded[note.id]}
                        onExpand={() => onExpand(note.id)}
                    />
                    {expanded[note.id] && (
                        <NoteList parentId={note.id} level={level + 1} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default NoteList;


export const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}