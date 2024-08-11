"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useSearch } from "@/hooks/note-use-search";
import useSWR from "swr";
import { fetcher } from "./chat-list";
import { NoteType } from "@/lib/schema";
import { useRouter } from "next/navigation";


export default function NoteSearchCommand() {
    const [mounted, setMounted] = useState(false);
    const search = useSearch();
    const router = useRouter();

    const { data, error, isLoading } = useSWR(`/api/chats?parentId=undefined`, fetcher)
    // BUG: data does not include all notes

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const notes: NoteType[] = data;

    const onSelect = (id_title: string) => {
        const [id, title] = id_title.split("?title=");
        router.push(`/note/notes/${id}`);
        search.onClose();
    };

    return (
        <CommandDialog open={search.open} onOpenChange={search.toggle} >
            <CommandInput placeholder={`Search notes...`} />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Notes">
                    {notes?.map((note) => (
                        note.title && <CommandItem
                            key={note.id}
                            value={`${note.id}?title=${note.title}`}
                            title={note.title}
                            onSelect={onSelect}
                        >
                            <span>{note.title}</span>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}