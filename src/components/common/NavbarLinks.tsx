import React from 'react';
import { NavbarLink } from './NavbarLink';

export function NavbarLinks() {
    return (
        <nav>
            <ul className="flex items-center space-x-2 overflow-x-auto navbar-links">
                <li>
                    <NavbarLink href="/">Home</NavbarLink>
                </li>

                <li>
                    <NavbarLink href="/guide">Guide</NavbarLink>
                </li>

                <li>
                    <NavbarLink href="/sponsor">Sponsor</NavbarLink>
                </li>

                <li>
                    <NavbarLink href="/about">About</NavbarLink>
                </li>
            </ul>
        </nav>
    );
}
