import { createNote } from "@/actions/note";
import NoteList from "./note-list";
import { useRouter } from "next/navigation";
import { SearchIcon, SquarePenIcon } from "lucide-react";
import { useSearch } from "@/hooks/note-use-search";
import { mutate } from "swr";


export default function SidebarNote() {

    const router = useRouter();

    const onCreateNote = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const newNoteId = await createNote();
        await mutate(`/api/notes?parentId=undefined`);
        // router.push(`/note/${newNoteId}`);
    }

    const search = useSearch();

    return (
        <div>
            {/* <div className="flex text-muted-foreground">
                xxx notes in total (create)
            </div> */}
            <div className="flex items-center py-1 px-2 hover:bg-gray-100/50 cursor-pointer rounded-lg"
                onClick={search.onOpen}
            >
                <SearchIcon className="h-4 w-4 mr-2" />
                Search note
            </div>
            <div className="mb-8 flex items-center py-1 px-2 hover:bg-gray-100/50 cursor-pointer rounded-lg"
                onClick={onCreateNote}
            >
                <SquarePenIcon className="h-4 w-4 mr-2" />
                New note
            </div>
            <NoteList />
        </div>
    )
}
