"use client"

import { useTheme } from "next-themes"
import Image from "next/image"

export function GitHubIcon() {
    const { theme } = useTheme()

    return (
        <>
            { theme !== "dark" ? (
                <Image width="22" height="22" src="/github-mark.svg" alt="Github Logo"/>
            ) : (
                <Image width="22" height="22" src="/github-mark-white.svg" alt="Github Logo"/>
            )}
        </>
    )
}
