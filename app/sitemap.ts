import { MetadataRoute } from "next"
import { allPosts, allPages } from "contentlayer/generated"

const BASE_URL = "https://mduchev.xyz"

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = allPosts.map((post) => ({
        url: `${BASE_URL}/posts/${post.slugAsParams}`,
        lastModified: new Date(post.date),
    }))

    const pages = allPages.map((page) => ({
        url: `${BASE_URL}/${page.slugAsParams}`,
        lastModified: new Date(),
    }))

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
        },
        ...posts,
        ...pages,
    ]
}
