"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"

export function GitHubIcon() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Image
            width="22"
            height="22"
            src={
                theme === "dark" ? "/github-mark-white.svg" : "/github-mark.svg"
            }
            alt="Github Logo"
        />
    )
}
