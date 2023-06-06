import React from "react";
import ExplorerButton from "./NavButtons/ExplorerButton";
import CreateButton from "./NavButtons/CreateButton";
import ProfileButton from "./NavButtons/ProfileButton";

const NavBar = () => {
    return (
        <nav className="fixed bottom-0 bg-white w-full h-[80px] z-999 flex gap-[100px] justify-center items-center overflow-hidden">
            <ExplorerButton />
            <CreateButton />
            <ProfileButton />
        </nav>
    )
}

export default NavBar;