import { NoteType } from "@/lib/schema";
import { Button } from "@nextui-org/button";
import { ChevronRightIcon, PlusIcon, EllipsisIcon, FileIcon, FileTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import deleteNote, { createNote } from "@/actions/note";
import { cn } from "@/lib/utils";
import {  Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownSection,  DropdownItem} from "@nextui-org/dropdown";
import { emptyEditorContent } from "./novel/empty-content";
import { mutate } from "swr";


interface NoteItemProps {
    note: NoteType;
    level: number;
    expanded?: boolean;
    onExpand: () => void;
}


function NoteItem({ note, level, expanded, onExpand }: NoteItemProps) {

    const router = useRouter();

    const onCreateNote = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const newNoteId = await createNote(note.id);
        await mutate(`/api/notes?parentId=${note.id}`);
        !expanded && onExpand();
    }

    const onDeleteNote = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const parentId = await deleteNote(note.id);
        const newPath = parentId ? `/note/${parentId}` : "/note";
        await mutate(`/api/notes?parentId=${parentId || "undefined"}`);
        router.push(newPath);
    }

    const Icon = (note.content === JSON.stringify(emptyEditorContent) && note.title === "") ? FileIcon : FileTextIcon;

    return (
        <div style={{ paddingLeft: `${level * 12}px` }}
            className="group py-1 px-2 flex items-center justify-between hover:bg-gray-100/50 cursor-pointer rounded-lg"
            onClick={() => router.push(`/note/${note.id}`)}
        >
            <div className="flex items-center ml-1">
                <Icon className={cn(
                    "h-4 w-4 absolute ml-1",
                    "group-hover:opacity-0 duration-0"
                )} />
                <Button variant="light" radius="sm" size="sm"
                    className={cn(
                        "min-w-0 p-0 h-6 w-6 mr-2",
                        "opacity-0 group-hover:opacity-hover duration-0",
                    )}
                    onClick={onExpand}
                >
                    <ChevronRightIcon className={cn(
                        "h-4 w-4",
                        "transition",
                        expanded && "transform rotate-90"
                    )} />
                </Button>
                <span>{note.title || "Untitled"}</span>
            </div>
            <div className={cn(
                "flex gap-1",
                "opacity-0 group-hover:opacity-hover transition-opacity duration-100",
            )}>
                <Dropdown>
                    <DropdownTrigger>
                        <Button variant="light" radius="sm" size="sm"
                            className="min-w-0 p-0 h-6 w-6"
                        >
                            <EllipsisIcon className="h-4 w-4" />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu variant="flat">
                        <DropdownItem onClick={() => console.log("Edit")}>
                            Edit
                        </DropdownItem>
                        <DropdownItem color="danger" className="text-danger"
                            onClick={onDeleteNote}>
                            Delete
                        </DropdownItem>
                        {/* <DropdownSection>
                        </DropdownSection> */}
                    </DropdownMenu>
                </Dropdown>
                <Button variant="light" radius="sm" size="sm"
                    className="min-w-0 p-0 h-6 w-6"
                    onClick={onCreateNote}
                >
                    <PlusIcon className="h-4 w-4" />
                </Button>
            </div>

        </div>
    )
}

export default NoteItem;