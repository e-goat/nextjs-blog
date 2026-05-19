import { NextRequest, NextResponse } from "next/server"
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const LIKES_FILE = path.join(DATA_DIR, "likes.json")
const SLUG_RE = /^[a-z0-9-]+$/

function readLikes(): Record<string, string[]> {
    if (!existsSync(LIKES_FILE)) return {}
    try {
        return JSON.parse(readFileSync(LIKES_FILE, "utf-8"))
    } catch {
        return {}
    }
}

function writeLikes(data: Record<string, string[]>) {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
    writeFileSync(LIKES_FILE, JSON.stringify(data, null, 2))
}

function getClientIp(req: NextRequest): string {
    return (
        req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
        req.headers.get("x-real-ip") ??
        "unknown"
    )
}

export async function GET(req: NextRequest) {
    const slug = req.nextUrl.searchParams.get("slug")
    if (!slug || !SLUG_RE.test(slug)) {
        return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
    }

    const likes = readLikes()
    const ip = getClientIp(req)
    const postLikes = likes[slug] ?? []

    return NextResponse.json({ count: postLikes.length, liked: postLikes.includes(ip) })
}

export async function POST(req: NextRequest) {
    let body: unknown
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: "Invalid body" }, { status: 400 })
    }

    const slug = (body as Record<string, unknown>)?.slug
    if (typeof slug !== "string" || !SLUG_RE.test(slug) || slug.length > 200) {
        return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
    }

    const ip = getClientIp(req)
    const likes = readLikes()
    const postLikes = likes[slug] ?? []
    const alreadyLiked = postLikes.includes(ip)

    likes[slug] = alreadyLiked
        ? postLikes.filter((i) => i !== ip)
        : [...postLikes, ip]

    try {
        writeLikes(likes)
    } catch (err) {
        console.error("[likes] Failed to write likes file:", err)
        return NextResponse.json({ error: "Failed to persist like" }, { status: 500 })
    }

    return NextResponse.json({ count: likes[slug].length, liked: !alreadyLiked })
}
