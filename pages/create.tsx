import Head from "next/head"
import { useEffect, useState } from "react";
import CreateBG from "@/components/Backgrounds/CreateBG";
import NewTheme from "@/components/Create/NewTheme";
import ExistingTheme from "@/components/Create/ExistingTheme";
import LocationMap from "@/components/Create/LocationMap";
import { Flex, Link, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";

type Section = "existingTheme" | "newTheme";

const Create = () => {
    const [activeSection, setActiveSelection] = useState<Section>("existingTheme");
    const [viewMap, setViewMap] = useState<boolean>(false);
    const [isConnected, setConnected] = useState<boolean>()    
    const router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem('id')){
            router.push('/profile')
            return
        }
        axios.post('/api/account/connected', {id: localStorage.getItem('id')})
        .then((res) => setConnected(res.data.connected))
    }, [])    

    return (
        <div>
            <CreateBG />
            <Head>
                <title>Create Shop</title>
                <meta name="description" content="Makin' a shop :)" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <div className="relative z-999 overflow-hidden ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] pt-[50px]">
                <div className="text-[36px] font-light">
                    Pave
                </div>
                <div className="text-[44px] font-medium leading-[50px]">
                    The Path
                </div>
                <div className="text-[16px] text-[#7A7A7A] font-light italic mt-[5px]">
                    Starting something new around the corner? Let others see what’s happening in their daily explorations by adding a new shop!
                </div>
                <div className="text-[16px] text-[#7A7A7A] font-medium italic mt-[5px]">
                    *Store location will be set to current location
                    <button className="text-[#ed7bbe] italic ml-[4px]" onClick={() => setViewMap(true)}>
                        (Where am I?)
                    </button>
                </div>
                
                <div className="flex flex-col items-center">
                    {viewMap && (
                        <div className="fixed w-[300px] bg-gray-800 bg-opacity-70 items-center self-center rounded-2xl">
                            <LocationMap/>
                            <div className="flex flex-col items-center">
                                <button className="text-white italic p-1 text-[18px] m-[10px]"
                                    onClick={() => setViewMap(false)}>
                                    Close
                                </button>
                            </div>
                            
                        </div>
                    )}
                </div>
                
                {isConnected ?
                (<>
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
                
                {activeSection === "existingTheme" ? <ExistingTheme /> : <NewTheme />}
                </>)
                :
                <Flex flexDir={'column'}>
                    <Text fontSize={'2xl'}>Please connect your account with square to create shops.</Text>
                    <Text>Click <Link textDecor={'underline'} color={'#ed7bbe'} onClick={() => router.push('/auth')}>Here</Link> to Connect Account with Square.</Text>
                </Flex>
                }
                
            </div>
        </div>
    )
}

export default Create;