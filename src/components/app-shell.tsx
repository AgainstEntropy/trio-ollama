import Sidebar from "./sidebar/sidebar";
import SidebarSheet from "./sidebar/sidebar-sheet";

export default function AppShell({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen flex flex-grow bg-background text-foreground transition">
            <div className="h-full p-3 border-r-small border-divider hidden lg:block">
                <Sidebar />
            </div>
            <div className="flex flex-initial flex-grow relative">
                <div className="absolute block lg:hidden p-2">
                    <SidebarSheet />
                </div>
                {children}
            </div>
        </div>
    )
}