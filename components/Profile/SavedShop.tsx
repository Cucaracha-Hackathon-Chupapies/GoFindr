import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { Store } from '@prisma/client'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import Head from 'next/head'
import React, { CSSProperties, useCallback, useEffect, useState } from 'react'
import { BiMap } from 'react-icons/bi'
type Props = {
    data: Store,
    highlight: boolean
}
const mapStyles: CSSProperties = {
    width: '350px',
    height: '350px',
    borderRadius: '15px',
    outline: '2px solid #ed7bbe',
}

const mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true
}
export default function SavedShop({data, highlight}: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [map, setMap] = useState<google.maps.Map | null>(null)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ""
    })

    const [center, setCenter] = useState<google.maps.LatLngLiteral>({lat: 0, lng: 0})
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((d) => setCenter({lat: d.coords.latitude, lng: d.coords.longitude}))
    }, [])

    const onLoad = useCallback(function callback(map: google.maps.Map) {
  
      setMap(map);
    }, []);
  
    const onUnmount = useCallback(function callback(map: google.maps.Map) {
      setMap(null);
    }, []);

    useEffect(() => {
      if (isLoaded && map){
        var bounds = new window.google.maps.LatLngBounds();
       
        bounds.extend({lat: data.lat, lng: data.lng});
        bounds.extend(center);

        map.fitBounds(bounds);
      }
    }, [isLoaded, map, data, center])

  return isLoaded ? (
    <Flex color={'white'} flexDir={'column'} alignItems={'center'} bgColor={'rgb(31, 41, 55)'} my={5} borderRadius={'md'} p={5} border={highlight ? '3px solid gold' : ''}>
        <Head>
          <title>Saved Shops</title>
        </Head>
        {data.icon && <Image alt={'Shop Icon'} src={data.icon} w={'100px'} h={'100px'} borderRadius={'full'} objectFit={'cover'}/>}
        <Text mt={3} fontSize={'2xl'}>{data.displayName}</Text>
        <Text mt={6} mb={10} maxW={'70%'} fontSize={'sm'} textAlign={'center'}>{data.description}</Text>
        <Button rightIcon={<BiMap/>} onClick={onOpen}>View on Map</Button>
        <Modal isOpen={isOpen} onClose={onClose} size={['sm', 'md', 'xl']}>
        <ModalOverlay />
        <ModalContent alignItems={'center'} textAlign={'center'}>
          <ModalHeader>{data.displayName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
         
                <GoogleMap onLoad={onLoad} onUnmount={onUnmount} options={mapOptions} mapContainerStyle={mapStyles} center={center} zoom={18}>
                    <Marker label={'Your Location'} position={center}/>
                    <Marker label={data.displayName} position={{lat: data.lat, lng: data.lng}}/>
                </GoogleMap>
    
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
            
    </Flex>
  ) : 
  <></>
}


