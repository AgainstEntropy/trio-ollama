"use client";

import { Select, SelectItem } from "@nextui-org/select";
import { useChatModel } from "@/hooks/chat-use-model";
import { ChatModelIdList, ChatModelId2Name, ChatModelId } from "@/types/chat-model";
import useSWR from "swr";
import { fetcher } from "../note/note-list";
import { useChatNotes } from "@/hooks/chat-use-notes";
import { NoteType } from "@/lib/schema";
import { Button } from "@nextui-org/button";
import { updateChat } from "@/actions/chat";

export default function ChatSidebarRight({ chatID }: { chatID: string }) {

    const { model, setModel } = useChatModel();
    const { data, error, isLoading } = useSWR("/api/notes?parentId=undefined", fetcher)
    const { noteIDs, setNoteIDs, setNoteContents } = useChatNotes();

    const notes: NoteType[] = data;

    const handleSelectionChange = (noteIDs: Set<string>) => {
        setNoteIDs(noteIDs);
        const noteContents: string[] = Array.from(noteIDs).map((id) => {
            const note = notes.find((note) => note.id === id);
            return note?.content || "";
        })
        setNoteContents(noteContents);
    }

    const ClearHistory = async () => {
        const updateData = {
            history: JSON.stringify([]),
        };
        await updateChat(chatID, updateData);
    }

    return (
        <div className="flex flex-col justify-between border-l-1 p-4 min-w-56">
            <div className="flex flex-col">
                <label className="text-sm font-bold mb-2">Model</label>
                <Select
                    selectionMode="single"
                    placeholder="Select a Model"
                    defaultSelectedKeys={[ChatModelIdList[0]]}
                    selectedKeys={[model]}
                    onSelectionChange={(keys) => setModel(Array.from(keys)[0] as ChatModelId)}
                >
                    {ChatModelIdList.map((id) => (
                        <SelectItem key={id} value={id}>
                            {ChatModelId2Name[id]}
                        </SelectItem>
                    ))}
                </Select>

                <label className="text-sm font-bold mt-6 mb-2">Notes</label>
                {!error && isLoading ? (
                    <div>Loading notes...</div>
                ) : (
                    <Select
                        selectionMode="multiple"
                        placeholder="Select notes to chat"
                        selectedKeys={noteIDs}
                        className="max-w-xs"
                        onSelectionChange={(keys) => handleSelectionChange(keys as Set<string>)}
                    >
                        {notes.map((note) => (
                            <SelectItem key={note.id} value={note.title}>
                                {note.title || "Untitled"}
                            </SelectItem>
                        ))}
                    </Select>
                )}
            </div>
            <Button color="danger" variant="flat" onClick={ClearHistory}>
                Clear history
            </Button>
        </div>
    )
}