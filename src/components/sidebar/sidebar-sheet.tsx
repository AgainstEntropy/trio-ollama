import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Button } from "@nextui-org/button"
import Sidebar from "./sidebar"


export default function SidebarSheet() {

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="light" className="h-10 w-10 min-w-0 p-0">
                    <HamburgerMenuIcon className="w-5 h-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-auto md:hidden">
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}