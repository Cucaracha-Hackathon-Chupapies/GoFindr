"use client";

import React from "react";
import NavButton from "./navbutton";
import { useState } from "react";

// import ExplorerSVG from "/explorer.svg";
// import SearchSVG from "/search.svg";
// import MapSVG from "/map.svg";
// import ProfileSVG from "/profile.svg";

const MENU_ITEMS = [
    {href: "/explorer", icon: "/explorer.svg"},
    // {href: "/search", icon: SearchSVG},
    // {href: "/map", icon: MapSVG},
    // {href: "/profile", icon: ProfileSVG},
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
                        key={menu.href}>
                            <NavButton active={activeIdx === idx} {...menu} />
                        </div>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;