import Head from "next/head"
import { useState } from "react";
import CreateBG from "@/components/Backgrounds/CreateBG";
import NewTheme from "@/components/Create/NewTheme";
import ExistingTheme from "@/components/Create/ExistingTheme";
import LocationMap from "@/components/Create/LocationMap";

type Section = "existingTheme" | "newTheme";

const Create = () => {
    const [activeSection, setActiveSelection] = useState<Section>("existingTheme");

    return (
        <div>
            <CreateBG />
            <Head>
                <title>create store</title>
                <meta name="description" content="Makin' a store :)" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <div className="relative z-999 overflow-hidden ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px]">
                <div className="text-[36px] font-light">
                    Pave
                </div>
                <div className="text-[44px] font-medium leading-[50px]">
                    The Path
                </div>
                <div className="text-[16px] text-[#7A7A7A] font-light italic mt-[5px]">
                    Starting new around the corner? Let others see what’s happening in their daily explorations by adding a new shop!
                </div>
                <div className="text-[16px] text-[#7A7A7A] font-light italic font-medium">
                    * Store geolocation will be set to your current location!
                </div>

                <nav className="flex mt-[10px]">
                    <ul className="flex space-x-6">
                        <button className={activeSection === 'existingTheme' ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                        onClick={() => setActiveSelection('existingTheme')}>
                            Existing Theme
                        </button>
                        <button className={activeSection === 'newTheme' ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                        onClick={() => setActiveSelection('newTheme')}>
                            New Theme
                        </button>
                    </ul>
                </nav>
                <div className="flex justify-center">
                    <LocationMap/>
                </div>
                {activeSection === "existingTheme" ? <ExistingTheme /> : <NewTheme />}
                
            </div>
        </div>
    )
}

export default Create;