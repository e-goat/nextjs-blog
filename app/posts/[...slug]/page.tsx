import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"
import Info from "@/app/ui/info"
import { LikeButton } from "@/components/like-button"

const BASE_URL = "https://mduchev.xyz"

interface PostProps {
    params: {
        slug: string[]
    }
}

async function getPostFromParams(params: PostProps["params"]) {
    const slug = params?.slug?.join("/")
    return allPosts.find((post) => post.slugAsParams === slug) ?? null
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
    const post = await getPostFromParams(params)

    if (!post) {
        return {}
    }

    const url = `${BASE_URL}/posts/${post.slugAsParams}`
    const publishedTime = new Date(post.date).toISOString()

    return {
        title: post.title,
        description: post.description,
        authors: [{ name: "Martin Duchev", url: BASE_URL }],
        keywords: post.tags,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            url,
            publishedTime,
            authors: ["Martin Duchev"],
            tags: post.tags,
            images: [
                {
                    url: "https://mduchev.xyz/github-profile.jpeg",
                    width: 460,
                    height: 460,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: ["https://mduchev.xyz/github-profile.jpeg"],
        },
    }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
    return allPosts.map((post) => ({
        slug: post.slugAsParams.split("/"),
    }))
}

export default async function PostPage({ params }: PostProps) {
    const post = await getPostFromParams(params)

    if (!post) {
        notFound()
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description ?? "",
        datePublished: new Date(post.date).toISOString(),
        author: {
            "@type": "Person",
            name: "Martin Duchev",
            url: BASE_URL,
        },
        url: `${BASE_URL}/posts/${post.slugAsParams}`,
        keywords: post.tags?.join(", ") ?? "",
        publisher: {
            "@type": "Person",
            name: "Martin Duchev",
            url: BASE_URL,
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="py-6 prose dark:prose-invert">
                <h1 className="mb-2" style={{ fontFamily: "var(--font-press-start-2p)" }}>{post.title}</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                {post.description && (
                    <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
                        {post.description}
                    </p>
                )}
                <hr className="my-4" />
                <Mdx code={post.body.code} />
                <div className="flex justify-end not-prose mt-8 mb-4">
                    <LikeButton slug={post.slugAsParams} />
                </div>
                <Info />
            </article>
        </>
    )
}
