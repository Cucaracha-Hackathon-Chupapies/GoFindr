import axios from "axios";
import Item from "./Item";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Head from "next/head";
import { Item as ItemType, StoreInfo, StoreRating } from "@prisma/client";
import { Box, Button, Flex, FormControl, FormLabel, IconButton, Input, SimpleGrid, VStack, useToast } from "@chakra-ui/react";
import {MdOutlineSaveAlt} from 'react-icons/md'
import Rating from "./Rating";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";
interface ShopData extends StoreInfo {
    rated: boolean,
    items: ItemType[]
} 

interface Props {
    store: string,    
    setBackground: Dispatch<SetStateAction<string | undefined>>,        
    setStore: Dispatch<SetStateAction<string | undefined>>
}

const Found = ({store, setBackground, setStore}: Props) => {

    const storeName = store;


    const [shopData, setShopData] = useState<ShopData>()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [ratings, setRatings] = useState<StoreRating[]>()
    const [itemViewChoice, setItemViewChoice] = useState<"featured" | "popular" | "all">("featured")
    const [reviewViewChoice, setReviewViewChoice] = useState<"view" | "make">("view")

    const [reviews, toggleReviews] = useState<boolean>(false)

    const fill = "#ffffff";
    const fill2 = "#D9D9D9";

    const toast = useToast()
    const router = useRouter()

    useEffect(() => {
        axios.post('/api/get/shop', {name: storeName, id: localStorage.getItem('id')})
        .then((res) => {
            setShopData(res.data)
            setBackground(res.data.theme.backgroundImage)
        })
        .catch(() => router.push('/explorer').then(() => {toast({title: 'Invalid Store', status: 'error', duration: 3000, isClosable: true}); setStore(undefined)}))

        axios.post('/api/get/ratings', {storeName: storeName})
        .then((res) => {
            setRatings(res.data)
        })
    }, [router, setBackground, setStore, storeName, toast])

    const createReview = (e: any) => {
        e.preventDefault()
        if (!localStorage.getItem('id') || !rating) return
        
        axios.post('/api/create/rating', {id: localStorage.getItem('id'), storeName: storeName, rating: rating, comment: comment})
        .then(() => toast({title: 'Review Created!', description: 'Thank you for sharing your feedback!', status: 'success', duration: 3000, isClosable: true}))
        .catch(() => toast({title: 'Error Creating Review!', description: 'Maybe you already made one?', status: 'error', duration: 3000, isClosable: true}))
    }

    const saveShop = () => {
        axios.post('/api/account/save', {id: localStorage.getItem('id') || "", name: storeName})
        .then(() => toast({title: 'Shop Saved!', status: 'success', duration: 3000, isClosable: true}))
        .catch(() => toast({title: 'Error Saving Shop!', status: 'error', duration: 3000, isClosable: true}))
    }   

    return (
        <div className="relative z-999 max-h-full">
            <Head>
                <title>{shopData?.displayName || "Store Found!"}</title>
                <meta name="description" content="Viewing store found using geolocation! Wowzaa that's pretty cool if you ask me :) " />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <IconButton bgColor={'#ed7bbe'} color={"white"} fontSize={'22px'} pos={'fixed'} top={2} left={2} aria-label="back button" w={'40px'} h={'40px'} onClick={() => setStore(undefined)} icon={<BiArrowBack />} />

            <div className="ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] pt-[70px]">
                <div className="text-[28px] font-light">
                    Approaching...
                </div>
                {}
                <div className="text-[40px] font-medium leading-[50px] flex items-center">
                    {shopData?.displayName}
                    {shopData?.displayName && <IconButton ml={3} aria-label="save shop button" onClick={saveShop} size={'md'} fontSize={'3xl'} bgColor={'#ed7bbe'} color={'white'} icon={<MdOutlineSaveAlt/>}/>}             
                </div>
                <div className="text-[14px] font-light text-[#747474] italic">
                    {shopData?.description}
                </div>
                <nav className="flex mt-[10px] mb-[20px]">
                    <ul className="flex space-x-6">
                        <button className={!reviews ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                        onClick={() => toggleReviews(false)}>
                            Items
                        </button>
                        <button className={reviews ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                        onClick={() => toggleReviews(true)}>
                            Reviews
                        </button>
                    </ul>
                </nav>
                {!reviews ? 
                <div>
                    {(itemViewChoice === 'featured') ?                                     
                    <div className={`overflow-x-auto bg-[${fill2}] rounded whitespace-nowrap pt-4 pl-4 pb-4`}>
                        {shopData?.items.map((item) => (
                            item.featured && <Item id={JSON.stringify(item.id)} name={item.displayName} price={item.price} img={'/placeholder.jpg'} rating={item.rating} key={item.id}/>
                        ))}
                    </div>                    
                    :                
                    <div className={`overflow-x-auto bg-[${fill2}] rounded whitespace-nowrap pt-4 pl-4 pb-4`}>
                        {shopData?.items.map((item) => (
                            item.popular && <Item id={JSON.stringify(item.id)} name={item.displayName} price={item.price} img={'/placeholder.jpg'} rating={item.rating} key={item.id}/>
                        ))}                        
                    </div>                    
                    }
                    <Flex justifyContent={'center'}>
                        <nav className="flex mt-[30px] mb-[20px]">
                            <ul className="flex space-x-6">
                                <button className={(itemViewChoice === 'featured') ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                                onClick={() => setItemViewChoice("featured")}>
                                    Featured
                                </button>
                                <button className={(itemViewChoice === 'popular') ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                                onClick={() => setItemViewChoice("popular")}>
                                    Popular
                                </button>
                            </ul>
                        </nav>
                    </Flex>

                    
                </div>
                :
                <Flex flexDir={'column'}>
                    {(reviewViewChoice === 'view') ? <>
                    <SimpleGrid spacing={2} columns={[1, 1, 2]} h={'220px'} overflow={'auto'}>
                        {ratings?.map((rating) => (
                            <Rating key={rating.id} data={rating} />
                        ))}
                    </SimpleGrid>
                    </>
                    :
                    <>
                    {!shopData?.rated &&
                    <Flex justifyContent={'center'} flexDir={'column'} alignItems={'center'}>                    
                    <Flex justifyContent={'center'} alignItems={'center'}>
                        <FormControl onSubmit={createReview}>
                            <VStack flexDir={'column'} spacing={1} mt={2}>
                                <Flex>
                            {[...Array(5)].map((star, index) => (
                                <IconButton key={index} fontSize={'20px'} bgColor={'transparent'} color={(index + 1 <= rating) ? 'yellow' : 'black'} aria-label="star" icon={<AiFillStar/>} onClick={() => setRating(index + 1)} />
                            ))}
                            </Flex>                      
                            <FormLabel>Comments (optional)</FormLabel>
                            <Input outline={'1px solid black'} value={comment} onChange={(e) => setComment(e.target.value)} />                            
                            <Button mt={'30px'} onClick={createReview} color={'white'} fontWeight={'normal'} bgColor={'#ed7bbe'} type="submit" disabled={shopData?.rated ? true : false}>Submit</Button>
                            </VStack>
                        </FormControl>
                    </Flex>
                    </Flex>
                    }</>
                }
                <Flex justifyContent={'center'}>
                        <nav className="flex mt-[30px] mb-[20px]">
                            <ul className="flex space-x-6">
                                <button className={(reviewViewChoice === 'view') ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                                onClick={() => setReviewViewChoice("view")}>
                                    View
                                </button>
                                <button className={(reviewViewChoice === 'make') ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                                onClick={() => shopData?.rated ? toast({title: 'Already Reviewed', description: 'You have already written a review.', status: 'error', duration: 3000, isClosable: true}) : setReviewViewChoice("make")}>
                                    Create
                                </button>
                            </ul>
                        </nav>
                    </Flex>
                </Flex>
                }
            </div>
            <Box h={'100px'}/>
        </div>
        
    )
}

export default Found;