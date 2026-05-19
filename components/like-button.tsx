"use client"

import { useState, useEffect } from "react"

interface LikeButtonProps {
    slug: string
}

export function LikeButton({ slug }: LikeButtonProps) {
    const [liked, setLiked] = useState(false)
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/likes?slug=${encodeURIComponent(slug)}`)
            .then((r) => r.json())
            .then((data) => {
                setLiked(data.liked)
                setCount(data.count)
            })
            .finally(() => setLoading(false))
    }, [slug])

    async function handleLike(e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()

        const res = await fetch("/api/likes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
        })
        const data = await res.json()
        setLiked(data.liked)
        setCount(data.count)
    }

    return (
        <button
            onClick={handleLike}
            disabled={loading}
            aria-label={liked ? "Unlike" : "Like"}
            className={`flex items-center gap-1.5 text-sm transition-colors disabled:opacity-40 ${
                liked
                    ? "text-rose-500"
                    : "text-slate-400 hover:text-rose-400 dark:hover:text-rose-400"
            }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={1.5}
                className="w-4 h-4"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
            </svg>
            {count > 0 && <span>{count}</span>}
        </button>
    )
}
