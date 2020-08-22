import React from 'react';

export function Main(props: any) {
    return (
        <main className="flex-grow bg-white dark:bg-gray-800">
            <div className="container h-full px-4 py-8 mx-auto">
                {props.children}
            </div>
        </main>
    );
}
