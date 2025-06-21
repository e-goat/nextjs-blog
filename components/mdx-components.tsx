import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"
import {FaLinkedinIn} from "react-icons/fa6"
import {AiFillGithub}  from "react-icons/ai"
import Link from "next/link"

const components = {
    Image,
    FaLinkedinIn,
    AiFillGithub,
    Link
}

interface MdxProps {
    code: string
}

export function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code)

    return <Component components={components} />
}
