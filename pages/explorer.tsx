import React, { useState } from "react";
import ExplorerBG from "@/components/Backgrounds/ExplorerBG";
import Wandering from "@/components/Explorer/Wandering";
import Found from "@/components/Explorer/Found";
import { Box, Image } from "@chakra-ui/react";

const Explorer = () => {
    const flag = false;
    const [background, setBackground] = useState<string>()
    return (
        <div className="h-screen relative">
            {background ?  <Image mt={0} src={background} objectFit={'cover'} pos={'absolute'} w={'100%'} h={'100%'} /> : <ExplorerBG />}
            { flag ? <Wandering /> : <Found setBackground={setBackground}/>}            
        </div>
    )
}

export default Explorer;
