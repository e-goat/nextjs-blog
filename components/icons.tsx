import { FaLinkedinIn } from "react-icons/fa"
import { AiFillGithub } from "react-icons/ai"

export const LinkedInIcon = () => {
    return (
        <FaLinkedinIn
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            size={32}
        />
    )
}

export const GithubIcon = () => {
    return (
        <AiFillGithub
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            size={32}
        />
    )
}
