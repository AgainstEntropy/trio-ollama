import { create } from "zustand";
import { ChatModelId } from "@/types/chat-model";

type useModelProps = {
  model: ChatModelId;
  setModel: (model_id: ChatModelId) => void;
};

export const useChatModel = create<useModelProps>((set, get) => ({
  model: "llama3.1:8b-instruct-q8_0",
  setModel: (model_id) => set({ model: model_id }),
}));
