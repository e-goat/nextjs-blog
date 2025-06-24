import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"
import { CiLinkedin } from "react-icons/ci"

const components = {
    Image,
    Link,
    FaGithub,
    CiLinkedin,
}

interface MdxProps {
    code: string
}

export function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code)

    return <Component components={components} />
}
