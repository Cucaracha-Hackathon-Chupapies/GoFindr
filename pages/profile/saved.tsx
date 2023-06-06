import SavedShop from "@/components/Profile/SavedShop"
import Shop from "@/components/Profile/Shop"
import { Flex, Link, Text } from "@chakra-ui/react"
import { Store } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Saved = () => {

    const [savedShops, setSavedShops] = useState<Store[]>()

    const router = useRouter()

    useEffect(() => {
        axios.post('/api/get/saved', {id: localStorage.getItem('id')})
        .then((res) => setSavedShops(res.data))
    }, [])

    return (
        <Flex justifyContent={'center'} alignItems={'center'} flexDir={'column'}>

        {(savedShops && savedShops.length > 0) ? savedShops?.map((shop) => (
            <SavedShop key={shop.name} data={shop} highlight={false}/>
        ))
        :
        <Flex flexDir={'column'} textAlign={'center'} alignItems={'center'} mt={'30vh'} maxW={'80vw'}>
            <Text fontSize={'2xl'}>
                You have not saved any shops yet!
            </Text>
            <Text mt={5} fontSize={'lg'}>Click <Link onClick={() => router.push('/explorer')} color={'#ed7bbe'} textDecor={'underline'}>Here</Link> to discover new shops around you to save!</Text>
        </Flex>
        }
        </Flex>
    )

}

export default Saved