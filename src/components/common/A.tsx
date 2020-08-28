export function A({
    href,
    title,
    children,
}: {
    href: string;
    title?: string;
    children: React.ReactNode;
}) {
    return (
        <a
            className="text-blue-700 dark:text-blue-300 hover:underline"
            href={href}
            title={title}
        >
            {children}
        </a>
    );
}
