import React from "react";
import ExplorerButton from "./NavButtons/ExplorerButton";
import SearchButton from "./NavButtons/SearchButton";
import MapButton from "./NavButtons/MapButton";
import ProfileButton from "./NavButtons/ProfileButton";

// import ExplorerSVG from "/explorer.svg";
// import SearchSVG from "/search.svg";
// import MapSVG from "/map.svg";
// import ProfileSVG from "/profile.svg";


const Navbar = () => {

    return (
        <nav className="fixed bottom-0 w-full h-[100px] flex gap-[45px] justify-center items-center">
            <ExplorerButton />
            <SearchButton />
            <MapButton />
            <ProfileButton />

        </nav>
    )
}

export default Navbar;