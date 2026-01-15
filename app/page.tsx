import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
    const sortedPosts = allPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    return (
        <div className="py-6">
            <header className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    Posts
                </h1>
                <p className="text-slate-600 dark:text-slate-400">
                    Thoughts on development, architecture, and the craft of building software.
                </p>
            </header>

            <div className="space-y-6">
                {sortedPosts.map((post) => (
                    <article
                        key={post._id}
                        className="group relative"
                    >
                        <Link href={post.slug} className="block">
                            <div className="p-5 -mx-5 rounded-xl transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-indigo-900/50">
                                <div className="flex items-baseline justify-between gap-4 mb-2">
                                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
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
                                {post.tags && post.tags.length > 0 && (
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
                                )}
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    )
}
