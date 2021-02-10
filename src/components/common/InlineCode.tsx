import React from 'react';

export function InlineCode({ code }: { code: string }) {
    return (
        <code className="text-pink-800 break-all sm:break-normal dark:text-pink-300">
            {code}
        </code>
    );
}
