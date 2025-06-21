import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import { LinkedInIcon, GithubIcon } from "@/components/icons"
import Link from "next/link"

const components = {
    Image,
    LinkedInIcon,
    GithubIcon,
    Link,
}

interface MdxProps {
    code: string
}

export function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code)

    return <Component components={components} />
}
