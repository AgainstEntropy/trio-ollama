import { useRouter } from "next/navigation";
import { ThemeSwitcher } from "../theme-switcher";
import PageSelector from "./page-selector";


export default function SidebarHeader() {

    const router = useRouter();
    return (
        <div className="flex flex-col mb-5 border-b-1 border-border">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl cursor-pointer" onClick={() => router.push('/')}>Trio</h1>
                <ThemeSwitcher />
            </div>
            <div className="my-5">
                <PageSelector />
            </div>
        </div>
    )
}
