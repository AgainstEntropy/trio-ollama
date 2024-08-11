import ChatSession from "@/components/chat/chat-session";
import ChatSidebarRight from "@/components/chat/chat-sidebar-right";
import { db } from "@/lib/db";
import { chatsTable, ChatType } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { chatID: string } }) {

    const chats: ChatType[] = await db
        .selectDistinct()
        .from(chatsTable)
        .where(eq(chatsTable.id, params.chatID));
    const chat = chats[0];

    if (!chat) {
        redirect('/chat');
    }

    return (
        <main className="flex flex-grow">
            <ChatSession chat={chat} />
            <ChatSidebarRight chatID={chat.id} />
        </main>
    )
}


export async function generateStaticParams() {
    const chats = await db
        .select()
        .from(chatsTable);

    return chats.map(chat => {
        return { chatID: chat.id };
    });
}