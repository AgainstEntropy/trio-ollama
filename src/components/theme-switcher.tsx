"use client"

import { useState, useEffect } from 'react'
import { useTheme } from "next-themes"

import { Button } from "@nextui-org/button"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <Button variant="light" onClick={toggleTheme}
            className="h-10 w-10 min-w-0">
            <SunIcon className="absolute h-[1.2rem] w-[1.2rem] dark:rotate-0 dark:scale-100 transition-all -rotate-90 scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] dark:rotate-90 dark:scale-0 transition-all rotate-0 scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
