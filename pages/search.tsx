import React, {useState} from "react";
import SearchBG from "@/components/Backgrounds/SearchBG";
import SearchList from "@/components/Search/SearchList";

type Section = "forYou" | "popular" | "new";

const Search = () => {

    const [activeSection, setActiveSelection] = useState<Section>("forYou");
    return (
        <div>
            <SearchBG />
            <div className="relative z-999 overflow-hidden">
                <div className="ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px]">
                    <div className="text-[36px] font-light">
                        Where's your
                    </div>
                    <div className="text-[44px] font-medium leading-[50px]">
                        Adventure?
                    </div>
                    <nav className="flex mt-[10px]">
                        <ul className="flex space-x-6">
                            <button className={activeSection === 'forYou' ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                            onClick={() => setActiveSelection('forYou')}>
                                For You
                            </button>
                            <button className={activeSection === 'popular' ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                            onClick={() => setActiveSelection('popular')}>
                                Popular
                            </button>
                            <button className={activeSection === 'new' ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                            onClick={() => setActiveSelection('new')}>
                                New
                            </button>
                        </ul>
                    </nav>
                </div>
                <div className="flex justify-center content-center mt-[40px]">

                    <div className="w-[80%] sm:w-[80%] md:w-[80%] lg:w-[40%] h-[550px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                        <SearchList sortBy={activeSection} />
                    </div>
                    
                </div>
                
                
            </div>
        </div>
    )
}

export default Search;