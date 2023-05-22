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
    const but_d = "100";
    const icon_d = "40";

    return (
        <nav className="navbar">
            <ExplorerButton />
            <SearchButton />
            <MapButton />
            <ProfileButton />

        </nav>
    )
}

export default Navbar;