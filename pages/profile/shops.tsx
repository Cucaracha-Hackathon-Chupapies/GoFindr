import Shop from "@/components/Profile/Shop"
import { Flex, SimpleGrid, Text } from "@chakra-ui/react"
import { StoreInfo } from "@prisma/client"
import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Shops = () => {

    const [shops, setShops] = useState<StoreInfo[]>()
    const router = useRouter()
    useEffect(() => {

        if (!localStorage.getItem('id')){
            router.push('/profile')            
            return
        }        

        axios.post('/api/account/shops', {id: localStorage.getItem('id')})
        .then((res) => setShops(res.data))

    }, [router])

    return (
        <Flex justifyContent={'center'} alignItems={'center'} flexDir={'column'}>
            <Head>
                <title>GoFindr</title>
                <meta name="description" content="GoFindr! An interactive and unique place to find shops near you!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>   
                <Text fontSize={'2xl'} fontWeight={'bold'} mt={'5vh'}>My Shops</Text>
                <SimpleGrid w={'80%'} maxW={'600px'}>     
                    {shops?.map((shop) => (
                        <Shop key={shop.name} data={shop} highlight={router.query.new === shop.name}/>                                                
                    ))}
                </SimpleGrid>                
        </Flex>
    )
}

export default Shops