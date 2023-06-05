import SavedShop from "@/components/Profile/SavedShop"
import Shop from "@/components/Profile/Shop"
import { Flex, Text } from "@chakra-ui/react"
import { Store } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"

const Saved = () => {

    const [savedShops, setSavedShops] = useState<Store[]>()

    useEffect(() => {
        axios.post('/api/get/saved', {id: localStorage.getItem('id')})
        .then((res) => setSavedShops(res.data))
    }, [])

    return (
        <Flex justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
            <Text mt={'5vh'} fontSize={'2xl'} fontWeight={'bold'}>Saved Shops</Text>
        {savedShops?.map((shop) => (
            <SavedShop key={shop.name} data={shop} highlight={false}/>
        ))}
        </Flex>
    )

}

export default Saved