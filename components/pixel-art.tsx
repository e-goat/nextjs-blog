import Image from "next/image"

export function PixelGit() {
    return (
        <a
            href="https://github.com/e-goat"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-block hover:opacity-75 transition-opacity"
        >
            <Image
                src="/git-pixelart.png"
                alt="GitHub"
                width={40}
                height={40}
                style={{ imageRendering: "pixelated" }}
            />
        </a>
    )
}

export function PixelLinkedIn() {
    return (
        <a
            href="https://www.linkedin.com/in/martin-duchev-666672162/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-block hover:opacity-75 transition-opacity"
        >
            <Image
                src="/pixel-linkedin.png"
                alt="LinkedIn"
                width={40}
                height={40}
                style={{ imageRendering: "pixelated" }}
            />
        </a>
    )
}
