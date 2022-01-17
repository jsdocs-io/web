import React from 'react';

export function Main(props: any) {
    return (
        <main className="grow bg-white dark:bg-gray-800">
            <div className="container h-full max-w-screen-xl px-4 py-12 mx-auto sm:px-8 lg:px-12 xl:px-20">
                {props.children}
            </div>
        </main>
    );
}
