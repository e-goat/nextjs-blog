import { allPosts } from "@/.contentlayer/generated"
import { PostList } from "@/components/post-list"
import Footer from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Posts",
    description:
        "Thoughts on development, architecture, and the craft of building software.",
    alternates: {
        canonical: "https://mduchev.xyz",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://mduchev.xyz",
        siteName: "Martin Duchev",
        title: "Martin Duchev",
        description:
            "Thoughts on development, architecture, and the craft of building software.",
        images: [
            {
                url: "https://mduchev.xyz/github-profile.jpeg",
                width: 460,
                height: 460,
                alt: "Martin Duchev",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Martin Duchev",
        description:
            "Thoughts on development, architecture, and the craft of building software.",
        images: ["https://mduchev.xyz/github-profile.jpeg"],
    },
}

export default function Home() {
    const posts = allPosts.map(({ _id, slug, slugAsParams, title, date, description, tags }) => ({
        _id,
        slug,
        slugAsParams,
        title,
        date,
        description: description ?? null,
        tags: tags ?? [],
    }))

    return (
        <div className="py-6">
            <header className="mb-10">
                <h1
                    className="text-3xl font-bold tracking-tight mb-2"
                    style={{ fontFamily: "var(--font-press-start-2p)" }}
                >
                    Posts
                </h1>
                <p
                    className="text-slate-600 dark:text-slate-400"
                    style={{ fontFamily: "var(--font-press-start-2p)" }}
                >
                    Thoughts on development, architecture, and the craft of building software.
                </p>
            </header>
            <PostList posts={posts} />
            <Footer />
        </div>
    )
}
