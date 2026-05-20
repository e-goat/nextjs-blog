"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { LikeButton } from "./like-button"

export interface PostMeta {
    _id: string
    slug: string
    slugAsParams: string
    title: string
    date: string
    description?: string | null
    tags: string[]
}

interface PostListProps {
    posts: PostMeta[]
}

export function PostList({ posts }: PostListProps) {
    const [activeTag, setActiveTag] = useState<string | null>(null)
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc")
    const [tagsOpen, setTagsOpen] = useState(false)

    const allTags = useMemo(() => {
        const tags = new Set<string>()
        posts.forEach((p) => p.tags.forEach((t) => tags.add(t)))
        return Array.from(tags).sort()
    }, [posts])

    const filtered = useMemo(() => {
        const base = activeTag
            ? posts.filter((p) => p.tags.includes(activeTag))
            : posts
        return [...base].sort((a, b) => {
            const diff = new Date(b.date).getTime() - new Date(a.date).getTime()
            return sortOrder === "desc" ? diff : -diff
        })
    }, [posts, activeTag, sortOrder])

    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <button
                    onClick={() => setSortOrder((s) => (s === "desc" ? "asc" : "desc"))}
                    className="flex items-center gap-1 px-3 py-1 text-xs rounded-full border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                    {sortOrder === "desc" ? "↓ Newest" : "↑ Oldest"}
                </button>
                <button
                    onClick={() => setTagsOpen((o) => !o)}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-full border transition-colors ${
                        activeTag
                            ? "border-blue-400 text-blue-500 dark:text-blue-400"
                            : "border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400"
                    }`}
                >
                    {activeTag ? `Tag: ${activeTag}` : "Tags"}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`w-3 h-3 transition-transform duration-200 ${tagsOpen ? "rotate-180" : ""}`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                {activeTag && (
                    <button
                        onClick={() => setActiveTag(null)}
                        className="flex items-center gap-1 px-2 py-1 text-xs rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                        aria-label="Clear tag filter"
                    >
                        ✕
                    </button>
                )}
            </div>

            {tagsOpen && (
                <div className="flex flex-wrap gap-2 mb-6 pt-2 pb-3 border-b border-slate-200 dark:border-slate-700">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => {
                                setActiveTag(activeTag === tag ? null : tag)
                                setTagsOpen(false)
                            }}
                            className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                                activeTag === tag
                                    ? "bg-blue-500 text-white"
                                    : "bg-slate-200/70 dark:bg-indigo-800/50 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-indigo-700/60"
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}

            <div className="mb-4" />

            {filtered.length === 0 && (
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                    No posts match the selected filter.
                </p>
            )}

            <div className="space-y-6">
                {filtered.map((post) => (
                    <article key={post._id} className="group relative">
                        <Link href={post.slug} className="block">
                            <div className="p-5 -mx-5 rounded-xl transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-indigo-900/50">
                                <div className="flex items-baseline justify-between gap-4 mb-2">
                                    <h2
                                        className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200"
                                        style={{ fontFamily: "var(--font-press-start-2p)" }}
                                    >
                                        {post.title}
                                    </h2>
                                    <time className="text-sm text-slate-500 dark:text-slate-400 shrink-0">
                                        {new Date(post.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </time>
                                </div>
                                {post.description && (
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-3">
                                        {post.description}
                                    </p>
                                )}
                                <div className="flex items-center justify-between">
                                    {post.tags.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-1 text-xs font-medium bg-slate-200/70 dark:bg-indigo-800/50 text-slate-700 dark:text-slate-300 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span />
                                    )}
                                    <LikeButton slug={post.slugAsParams} />
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}
