"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { ChevronRightIcon, PlusIcon, EllipsisIcon, FileIcon, FileTextIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { deleteChat, updateChat } from "@/actions/chat";
import { mutate } from "swr";
import { Input } from "@nextui-org/input";
import { ChatType } from "@/lib/schema";


interface ChatItemProps {
    chat: ChatType;
}


export default function ChatItem({ chat }: ChatItemProps) {

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(chat.title);

    const router = useRouter();

    const handleKeyDown = async (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            await handleBlur();
        }
    }

    const handleBlur = async () => {
        const data = {
            title: title
        }

        await updateChat(chat.id, data);
        await mutate('/api/chats');
        setTitle(title);
        setIsEditing(false);
    }

    const onDeleteChat = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await deleteChat(chat.id);
        await mutate('/api/chats');
        router.push("/chat");
    }

    return (
        <div
            className="group py-1 px-2 flex items-center justify-between hover:bg-gray-100/50 cursor-pointer rounded-lg"
            onClick={() => router.push(`/chat/${chat.id}`)}
        >
            <div className="flex items-center">
                {isEditing ? (
                    <Input type="text" variant="bordered" size="sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                    />
                ) : (
                    <span className="ml-1 text-md">{chat.title || "Untitled"}</span>
                )}
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
                        <DropdownItem onClick={() => console.log("Share")}>
                            Share
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => setIsEditing(true)}
                        >
                            Rename
                        </DropdownItem>
                        <DropdownItem color="danger" className="text-danger"
                            onClick={onDeleteChat}
                        >
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

        </div>
    )
}