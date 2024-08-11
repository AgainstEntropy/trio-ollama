"use client";

import { usePathname } from "next/navigation"

import SidebarHeader from "@/components/sidebar/sidebar-header"
import SidebarTodo from "@/components/todo/sidebar-todo";
import SidebarNote from "@/components/note/sidebar-note";
import SidebarChat from "@/components/chat/sidebar-chat";

export default function Sidebar() {

    const pathname = usePathname();

    return (
        <div className="flex flex-col w-60 h-full">
            <SidebarHeader />
            {pathname.startsWith("/todo") && <SidebarTodo />}
            {pathname.startsWith("/note") && <SidebarNote />}
            {pathname.startsWith("/chat") && <SidebarChat />}
        </div>
    )
}