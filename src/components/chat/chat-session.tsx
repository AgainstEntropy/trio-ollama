"use client";

import { useChat, Message } from "ai/react";
import { nanoid } from "ai";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { updateChat } from "@/actions/chat";
import { useChatModel } from "@/hooks/chat-use-model";
import Markdown from "react-markdown";
import { ChatType } from "@/lib/schema";
import { useChatNotes } from "@/hooks/chat-use-notes";

export default function ChatSession({ chat }: { chat: ChatType }) {
  const { model } = useChatModel();
  const { noteContents } = useChatNotes();

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
  } = useChat({
    id: chat.id,
    api: "http://localhost:8080/ollama",
    initialMessages: JSON.parse(chat.history) as Message[],
    onFinish: async (message: Message) => {
      const inputMessage: Message = {
        id: nanoid(7),
        role: "user",
        content: input,
      };
      const updatedMessages = [...messages, inputMessage, message];
      setMessages(updatedMessages);

      const updateData = {
        history: JSON.stringify(updatedMessages),
      };
      await updateChat(chat.id, updateData);
    },
    body: {
      model: model,
      noteContents: noteContents,
    },
    streamMode: "text",
  });

  return (
    <div className="flex flex-col justify-between mx-auto w-full max-w-lg px-16 lg:px-32 lg:max-w-6xl">
      <ScrollShadow
        hideScrollBar={true}
        isEnabled={false}
        size={80}
        className="flex flex-grow w-full h-full"
      >
        <div className="flex flex-col gap-8 w-full px-16 py-16">
          {messages.length > 0
            ? messages.map((m) => (
                <div key={m.id}>
                  <div className="font-semibold mb-1">
                    {m.role === "user" ? "You" : "Assitant"}
                  </div>
                  <div className="whitespace-pre-wrap">
                    <Markdown>{m.content}</Markdown>
                  </div>
                </div>
              ))
            : null}
        </div>
      </ScrollShadow>
      <form className="sticky bottom-6 z-20 flex mt-6" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Message anything you want"
          value={input}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          isDisabled={!input}
          isLoading={isLoading}
          className="ml-2"
          variant="solid"
          color="danger"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
