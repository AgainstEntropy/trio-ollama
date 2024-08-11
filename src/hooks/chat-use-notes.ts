import { create } from "zustand";

type useNotesProps = {
    noteIDs: Set<string>;
    noteContents: string[];
    setNoteIDs: (note_ids: Set<string>) => void;
    setNoteContents: (note_contents: string[]) => void;
}

export const useChatNotes = create<useNotesProps>((set, get) => ({
    noteIDs: new Set<string>([]),
    noteContents: [],
    setNoteIDs: (note_ids) => set({ noteIDs: note_ids }),
    setNoteContents: (note_contents) => set({ noteContents: note_contents }),
}));