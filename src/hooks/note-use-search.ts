import { create } from "zustand";

type useSearchProps = {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    toggle: () => void;
}

export const useSearch = create<useSearchProps>((set, get) => ({
    open: false,
    onOpen: () => set({ open: true }),
    onClose: () => set({ open: false }),
    toggle: () => set({ open: !get().open }),
}));