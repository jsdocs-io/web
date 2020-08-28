import Link from 'next/link';

export function InternalLink({
    href,
    title,
    children,
}: {
    href: string;
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <Link href={href}>
            <a
                className="text-blue-700 dark:text-blue-300 hover:underline"
                title={title}
            >
                {children}
            </a>
        </Link>
    );
}
