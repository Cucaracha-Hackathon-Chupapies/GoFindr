import React from "react";
import ExplorerButton from "./NavButtons/ExplorerButton";
import SearchButton from "./NavButtons/SearchButton";
import CreateButton from "./NavButtons/CreateButton";
import ProfileButton from "./NavButtons/ProfileButton";

const NavBar = () => {
    return (
        <nav className="absolute bottom-0 w-full h-[100px] z-999 flex gap-[45px] justify-center items-center overflow-hidden">
            <ExplorerButton />
            <SearchButton />
            <CreateButton />
            <ProfileButton />
        </nav>
    )
}

export default NavBar;