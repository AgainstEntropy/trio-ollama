import { useSearch } from "@/hooks/chat-use-search";
import { SearchIcon, SquarePenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ChatList from "./chat-list";
import { createChat } from "@/actions/chat";
import { mutate } from "swr";


export default function SidebarChat() {
    const router = useRouter();

    const onCreateChat = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const newChatId = await createChat();
        await mutate('/api/chats');
        // https://nextjs.org/docs/app/building-your-application/deploying/static-exports#unsupported-features
        // BUG: if directly push, the chat page will not be updated
        // router.push(`/chat/${newChatId}`);
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
                Search chat
            </div>
            <div className="mb-8 flex items-center py-1 px-2 hover:bg-gray-100/50 cursor-pointer rounded-lg"
                onClick={onCreateChat}
            >
                <SquarePenIcon className="h-4 w-4 mr-2" />
                New chat
            </div>
            <ChatList />
        </div>
    )
}
