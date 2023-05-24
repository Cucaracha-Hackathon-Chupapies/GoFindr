import React from "react";
import ExplorerBG from "@/components/Backgrounds/ExplorerBG";
import Wandering from "@/components/Explorer/Wandering";
import Found from "@/components/Explorer/Found";

const Explorer = () => {
    const flag = false;
    return (
        <div>
            <ExplorerBG />
            { flag ? <Wandering /> : <Found />}
        </div>
    )
}

export default Explorer;
