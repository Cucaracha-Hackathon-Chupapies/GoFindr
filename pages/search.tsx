import React, {useState} from "react";
import SearchBG from "@/components/Backgrounds/SearchBG";
import SearchList from "@/components/Search/SearchList";

type Section = "forYou" | "popular" | "new";

const Search = () => {

    const [activeSection, setActiveSelection] = useState<Section>("forYou");
    return (
        <div>
            <SearchBG />
            <div className="relative z-999 ">
                <div className="ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px] md:mt-[70px] lg:mt-[40px]">
                    <div className="text-[36px] font-light">
                        Where's your
                    </div>
                    <div className="text-[44px] font-medium leading-[50px]">
                        Adventure?
                    </div>
                </div>
                <nav>
                    <ul>
                        <li className={activeSection === 'forYou' ? 'active' : ''}
                        onClick={() => setActiveSelection('forYou')}>
                            For You
                        </li>
                        <li className={activeSection === 'popular' ? 'active' : ''}
                        onClick={() => setActiveSelection('popular')}>
                            Popular
                        </li>
                        <li className={activeSection === 'new' ? 'active' : ''}
                        onClick={() => setActiveSelection('new')}>
                            New
                        </li>
                    </ul>
                </nav>
                <SearchList sortBy={activeSection} />
            </div>
        </div>
    )
}

export default Search;