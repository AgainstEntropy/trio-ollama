import TextScroll from "@/components/text-scroll";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function Home() {
  return (
    <main className="min-h-screen flex bg-background transition duration-500">
      <div className="flex flex-col gap-6 pb-10 m-auto">
        <ThemeSwitcher />
        <div className="flex pl-2 text-4xl font-bold text-foreground">
          Welcome to &nbsp; <TextScroll />
        </div>

      </div>
    </main>
  );
}
