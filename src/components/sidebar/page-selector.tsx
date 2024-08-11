"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, Tab } from "@nextui-org/tabs";
import { pageType } from "@/types/pages";

export default function PageSelector() {

    const pathname = usePathname();
    const router = useRouter();

    const pages: pageType[] = [
        { label: "Todo", path: "/todo", color: "primary" },
        { label: "Note", path: "/note", color: "warning" },
        { label: "Chat", path: "/chat", color: "danger" }
    ]

    const TabSelect = (key: React.Key) => {
        const path = key as string;
        !pathname.startsWith(path) && router.push(path);
    }

    return (
        <div >
            <Tabs fullWidth radius="md" aria-label="Pages"
                color={pathname.startsWith("/todo") ? "primary" : pathname.startsWith("/note") ? "warning" : "danger"}
                onSelectionChange={TabSelect}
                selectedKey={"/" + pathname.split("/")[1]}
            >
                {pages.map(({ label, path }) => (
                    <Tab key={path} title={label} />
                ))}
            </Tabs>
        </div>
    );
}
