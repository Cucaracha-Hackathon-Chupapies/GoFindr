import React from "react";
import SearchBG from "@/components/Backgrounds/SearchBG";

const Search = () => {
    return (
        <div>
            <SearchBG />
            <div className="relative z-999 ">
                <div className="ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px] md:mt-[70px] lg:mt-[40px]">
                    <div className="text-[36px] font-light">
                        Where's your
                    </div>
                    <div className="text-[20px] mt-[10px] font-medium">
                        Adventure?
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;