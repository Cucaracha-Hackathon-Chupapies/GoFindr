"use client";

import React from "react";
import Link from "next/link";
import NavButton from "./navbutton";
import { useState } from "react";

const MENU_ITEMS = [
    {href: "/explorer", src: "/explorer.svg", alt: "explorer"},
    {href: "/search", src: "/search.svg", alt: "search"},
    {href: "/map", src: "/map.svg", alt: "map"},
    {href: "/profile", src: "/profile.svg", alt: "profile"},
];

const Navbar = () => {
    const [navActive, setNavActive] = useState<boolean | null>(null);
    const [activeIdx, setActiveIdx] = useState(-1);

    return (
        <header>
            <nav className="navbar">
                <div className={`${navActive ? "active" : ""} nav__menu-list`}>
                    {MENU_ITEMS.map((menu, idx) => (
                        <div onClick={() => {
                            setActiveIdx(idx);
                            setNavActive(false);
                        }}
                        key={menu.alt}>
                            <NavButton active={activeIdx === idx} {...menu} />
                        </div>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;