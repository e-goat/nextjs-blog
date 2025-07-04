import Link from "next/link"
import "./globals.css"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { SpeedInsights } from "@vercel/speed-insights/next"

const fonts_jetbrains = localFont({
    src: "./webfonts/JetBrainsMono-Bold.woff2",
})

export const metadata = {
    title: "Martin Duchev",
    description: "Martin Duchvev's personal website",
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body
                className={`antialiased min-h-screen bg-white dark:bg-indigo-950 text-slate-900 dark:text-slate-50 ${fonts_jetbrains.className}`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                >
                    <div className="max-w-2xl mx-auto py-10 px-4">
                        <header>
                            <div className="flex items-center justify-between">
                                <nav className="flex space-x-4">
                                    <Link
                                        href="/"
                                        className="hover:text-blue-500 transition-colors"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="hover:text-blue-500 transition-colors"
                                    >
                                        About
                                    </Link>
                                </nav>
                                <ModeToggle />
                            </div>
                        </header>
                        <main>{children}</main>
                    </div>
                    <Analytics />
                </ThemeProvider>
                <SpeedInsights />
            </body>
        </html>
    )
}
