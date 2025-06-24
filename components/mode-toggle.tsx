"use client"

import { useTheme } from "next-themes"
import { CgDarkMode } from "react-icons/cg"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="border rounded-md flex items-center justify-center"
        >
            <CgDarkMode size={24} />
        </button>
    )
}
