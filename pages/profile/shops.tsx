import Shop from "@/components/Profile/Shop"
import { Flex, Link, SimpleGrid, Text } from "@chakra-ui/react"
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
        <Flex justifyContent={'center'} alignItems={'center'} flexDir={'column'} pb={'200px'} maxH={'-webkit-fit-content'}>
            <Head>
                <title>GoFindr</title>
                <meta name="description" content="GoFindr! An interactive and unique place to find shops near you!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>                
            {(shops && shops.length > 0) ? 
                <SimpleGrid w={'80%'} maxW={'600px'}>     
                    {shops?.map((shop) => (
                        <Shop key={shop.name} data={shop} highlight={router.query.new === shop.name}/>                                                
                    ))}
                </SimpleGrid>           
                :
                <Flex flexDir={'column'} textAlign={'center'} alignItems={'center'} mt={'30vh'} maxW={'80vw'}>
                    <Text fontSize={'2xl'}>
                        You have not created any shops yet!
                    </Text>
                    <Text mt={5} fontSize={'lg'}>Click <Link onClick={() => router.push('/create')} color={'#ed7bbe'} textDecor={'underline'}>Here</Link> to create a shop!</Text>
                </Flex>
            }
        </Flex>
    )
}

export default Shops