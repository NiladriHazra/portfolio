"use client";

import NextLink from "next/link";

interface LinkProps {
    href: string;
    children: React.ReactNode;
    external?: boolean;
    className?: string; // Added for flexibility
}

export default function Link({ href, children, external, className = "" }: LinkProps) {
    const isExternal = external || href.startsWith('http');

    return (
        <NextLink
            href={href}
            target={isExternal ? "_blank" : undefined}
            /* 'noopener' is a security best practice for older browsers */
            rel={isExternal ? "noopener noreferrer" : undefined}
            /* Using template literals to allow for custom class merging */
            className={`relative text-blue leading-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-blue after:transition-all after:duration-300 hover:after:w-full ${className}`}
        >
            {children}
        </NextLink>
    )
}