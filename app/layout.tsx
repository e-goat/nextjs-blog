import Link from "next/link"
import "./globals.css"
import localFont from "next/font/local"
import { Press_Start_2P } from "next/font/google"
import { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import { ModeToggle } from "@/components/mode-toggle"
import { SpeedInsights } from "@vercel/speed-insights/next"

const fonts_jetbrains = localFont({
    src: "./webfonts/JetBrainsMono-Bold.woff2",
})

const pressStart2P = Press_Start_2P({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-press-start-2p",
    display: "swap",
})

export const metadata: Metadata = {
    title: {
        default: "Martin Duchev",
        template: "%s | Martin Duchev",
    },
    description:
        "Martin Duchev's personal blog — thoughts on development, architecture, and the craft of building software.",
    authors: [{ name: "Martin Duchev", url: "https://mduchev.xyz" }],
    creator: "Martin Duchev",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body
                className={`antialiased min-h-screen bg-white dark:bg-indigo-950 text-slate-900 dark:text-slate-50 ${fonts_jetbrains.className} ${pressStart2P.variable}`}
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
                                        className="hover:text-blue-500"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="hover:text-blue-500"
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
