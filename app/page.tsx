import { allPosts } from "@/.contentlayer/generated"
import Link from "next/link"

export default function Home() {
const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return (
        <div className="prose dark:prose-invert">
            {sortedPosts.map((post) => (
                <article key={post._id} className="py-2 border-b border-gray-200 dark:border-gray-700">
                    <Link href={post.slug}>
                        <h2>{post.title}</h2>
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                    {post.description && <p>{post.description}</p>}
                </article>
            ))}
        </div>
    )
}
