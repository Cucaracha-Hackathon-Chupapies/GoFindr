import React, { useEffect, useState } from "react";
import ExplorerBG from "@/components/Backgrounds/ExplorerBG";
import Wandering from "@/components/Explorer/Wandering";
import Found from "@/components/Explorer/Found";
import { Image, useToast } from "@chakra-ui/react";
import { Store } from "@prisma/client";
import axios from "axios";

const Explorer = () => {
    const [shops, setShops] = useState<Store[]>()    
    const [storeChoice, setStoreChoice] = useState<string | undefined>()
    const [background, setBackground] = useState<string>()        
    const [location, setLocation] = useState<google.maps.LatLngLiteral>()    
    const toast = useToast()

    useEffect(() => {
        if (window.innerWidth <= 768 && !localStorage.getItem('seenWarning')){
            toast({
                title: 'Warning!',
                description: 'Website is best viewed on mobile. We recommend you switch to your mobile device for the best user experience!', status: 'warning', duration: 10000, isClosable: true
            })

            localStorage.setItem('seenWarning', "true")
        }
        
    }, [])

    useEffect(() => {
      if (!navigator.geolocation || storeChoice !== undefined) return;      
      const watcher = navigator.geolocation.watchPosition((data) => setLocation({lat: data.coords.latitude, lng: data.coords.longitude}), () => {}, {enableHighAccuracy: true})
      
      return () => navigator.geolocation.clearWatch(watcher)
  }, [storeChoice])

    useEffect(() => {        
      if (location){
          axios.post('/api/get/shops', {...location, distance: 50})
          .then((res) => setShops(res.data))
          .catch((err) => console.log(err))
      }
      
    }, [location])

    return (
        <div className=" relative pb-[90px] h-full">            
            {(background && storeChoice) ?  <Image alt="Shop Background" mt={0} src={background} objectFit={'cover'} pos={'absolute'} w={'100%'} h={'100%'} /> : <ExplorerBG />}
            { (storeChoice) ? <Found store={storeChoice} setBackground={setBackground} setStore={setStoreChoice}/> : <Wandering shops={shops} setStore={setStoreChoice} />}                                             
        </div>
    )
}

export default Explorer;
