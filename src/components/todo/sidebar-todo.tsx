
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Chip } from "@nextui-org/chip";

import { HomeIcon, SunIcon, StarIcon, HamburgerMenuIcon, PlusIcon, CalendarIcon } from '@radix-ui/react-icons'


export default function SidebarTodo() {

    const contents = [
        // { count: 2, href: "/myday", label: "My Day", icon: <SunIcon className='w-5 h-5 text-accent-green-foreground' />, hiddenClassName: "" },
        { count: 2, href: "/planned", label: "Planned", icon: <CalendarIcon className='w-5 h-5 text-inplan-foreground' />, hiddenClassName: "" },
        { count: 2, href: "/important", label: "Important", icon: <StarIcon className='w-5 h-5 text-important-foreground' />, hiddenClassName: "" },
        { count: 12, href: "/tasks", label: "Tasks", icon: <HomeIcon className='w-5 h-5 text-task-foreground' />, hiddenClassName: "" },
    ]


    return (
        <ScrollShadow hideScrollBar>
            <Listbox>
                {contents.map((content, index) => (
                    <ListboxItem key={index} href={content.href}
                        startContent={content.icon}
                        endContent={<Chip color="default" size="sm" className="text-muted-foreground">{content.count}</Chip>}
                    >
                        <span>{content.label}</span>
                    </ListboxItem>
                ))}
            </Listbox>
        </ScrollShadow>
    )
}
