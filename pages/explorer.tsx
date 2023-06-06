import React, { useCallback, useEffect, useState } from "react";
import ExplorerBG from "@/components/Backgrounds/ExplorerBG";
import Wandering from "@/components/Explorer/Wandering";
import Found from "@/components/Explorer/Found";
import { Image } from "@chakra-ui/react";
import { Store } from "@prisma/client";
import axios from "axios";

const Explorer = () => {
    const [shops, setShops] = useState<Store[]>()    
    const [storeChoice, setStoreChoice] = useState<string | undefined>()
    const [background, setBackground] = useState<string>()        
    const [location, setLocation] = useState<google.maps.LatLngLiteral>()    

    const getLocation = useCallback(() => {                    
        navigator.geolocation.getCurrentPosition((data) => {
          //setLocation({lat: data.coords.latitude, lng: data.coords.longitude})                  
          setLocation({lat: 49.23908569087235, lng: -123.06502634908576})
        })

      }, [setLocation])
      
      useEffect(() => {
        getLocation();

        const geolocationPing = setInterval(() => {
          if (storeChoice === undefined){
            getLocation()
          }          
        }, 1000*5)
        return () => clearInterval(geolocationPing)

      }, [storeChoice])

      useEffect(() => {
        if (location){
            axios.post('/api/get/shops', {...location, distance: 50})
            .then((res) => setShops(res.data))
            .catch((err) => console.log(err))
        }
        
      }, [location])

    return (
        <div className=" relative pb-[70px]">            
            {(background && storeChoice) ?  <Image alt="Shop Background" mt={0} src={background} objectFit={'cover'} pos={'absolute'} w={'100%'} h={'100%'} /> : <ExplorerBG />}
            { (storeChoice) ? <Found store={storeChoice} setBackground={setBackground} setStore={setStoreChoice}/> : <Wandering shops={shops} setStore={setStoreChoice} />}                     
        </div>
    )
}

export default Explorer;
