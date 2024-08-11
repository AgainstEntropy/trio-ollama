"use client";

import useSWR from 'swr'
import ChatItem from "./chat-item";
import { ChatType } from "@/lib/schema";
import { cn } from "@/lib/utils";


export default function ChatList() {

    const { data, error, isLoading } = useSWR(`/api/chats`, fetcher);

    if (isLoading) return <div>Loading chat sessions...</div>
    if (error) return <div>Failed to load chat sessions</div>

    const chats: ChatType[] = data;

    if (chats.length === 0) return (
        <div className={cn(
            "text-muted-foreground",
            "pl-2",
        )}>
            No chat session
        </div>
    )

    return (
        <div className="flex flex-col gap-1">
            {chats.map(chat => (
                <div key={chat.id} className="flex flex-col gap-1">
                    <ChatItem chat={chat} />
                </div>
            ))}
        </div>
    );
}

export const fetcher = async (url: string) => fetch(url).then(res => res.json());