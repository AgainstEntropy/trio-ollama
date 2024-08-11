import NoteSearchCommand from "@/components/note/note-search-command";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <NoteSearchCommand />
            {children}
        </>
    )
}