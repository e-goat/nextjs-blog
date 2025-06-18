import Link from "next/link"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { GitHubIcon } from "@/components/github-icon"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

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
                className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${inter.className}`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <div className="max-w-2xl mx-auto py-10 px-4">
                        <header>
                            <div className="flex items-center justify-between">
                                <section className="flex items-center gap-4">
                                    <ModeToggle />
                                    <Link
                                        href="https://github.com/e-goat"
                                        target="_blank"
                                    >
                                        <GitHubIcon />
                                    </Link>
                                </section>
                                <nav className="ml-auto text-sm font-medium space-x-6">
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
                                        About me
                                    </Link>
                                </nav>
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
