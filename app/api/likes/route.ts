import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

const SLUG_RE = /^[a-z0-9-]+$/

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

    const ip = getClientIp(req)
    const key = `likes:${slug}`

    const [count, liked] = await Promise.all([
        redis.scard(key),
        redis.sismember(key, ip),
    ])

    return NextResponse.json({ count, liked: liked === 1 })
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
    const key = `likes:${slug}`

    const alreadyLiked = await redis.sismember(key, ip)

    if (alreadyLiked) {
        await redis.srem(key, ip)
    } else {
        await redis.sadd(key, ip)
    }

    const count = await redis.scard(key)

    return NextResponse.json({ count, liked: !alreadyLiked })
}
