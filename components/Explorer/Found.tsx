import axios from "axios";
import Item from "./Item";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Head from "next/head";
import { Item as ItemType, StoreInfo, StoreRating } from "@prisma/client";
import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, IconButton, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import {MdOutlineSaveAlt} from 'react-icons/md'
import Rating from "./Rating";
import { AiFillStar } from "react-icons/ai";
interface ShopData extends StoreInfo {
    rated: boolean,
    items: ItemType[]
} 

interface Props {
    setBackground: Dispatch<SetStateAction<string | undefined>>,
}

const Found = ({setBackground}: Props) => {
    /*
    const templateItems = [
        { id: "1", name: 'Corn Kakikage', price: '8.99', img: '/placeholder.jpg' },
        { id: "2", name: 'Tako Wasabi', price: '$5.39', img: '/placeholder.jpg' },
        { id: "3", name: 'Chicken Karaage', price: '$7.89', img: '/placeholder.jpg' },
        { id: "4", name: 'Fatty Short Ribs', price: '$18.99', img: '/placeholder.jpg' },
        { id: "5", name: 'Corn Kakikage', price: '8.99', img: '/placeholder.jpg' },
        { id: "6", name: 'Tako Wasabi', price: '$5.39', img: '/placeholder.jpg' },
        { id: "7", name: 'Chicken Karaage', price: '$7.89', img: '/placeholder.jpg' },
        { id: "8", name: 'Fatty Short Ribs', price: '$18.99', img: '/placeholder.jpg' },
    ];
    */

    const storeName = "mishkamushka"; //id of the store found

  
    const [shopData, setShopData] = useState<ShopData>()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [ratings, setRatings] = useState<StoreRating[]>()

    const [reviews, toggleReviews] = useState<boolean>(false)

    const fill = "#ffffff";
    const fill2 = "#D9D9D9";

    useEffect(() => {
        axios.post('/api/get/shop', {name: storeName})
        .then((res) => {
            setShopData(res.data)
            setBackground(res.data.theme.backgroundImage)
        })

        axios.post('/api/get/ratings', {storeName: storeName})
        .then((res) => {
            setRatings(res.data)
        })
    }, [setBackground])

    const createReview = (e: any) => {
        e.preventDefault()

        if (!localStorage.getItem('id') || !rating) return

        axios.post('/api/create/rating', {id: localStorage.getItem('id'), storeName: storeName, rating: rating, comment: comment})
    }

    const saveShop = () => {
        axios.post('/api/account/save', {id: localStorage.getItem('id') || "", name: storeName})
    }

    return (
        <div className="relative z-999">
            <Head>
                <title>{shopData?.displayName || "Store Found!"}</title>
                <meta name="description" content="Viewing store found using geolocation! Wowzaa that's pretty cool if you ask me :) " />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%]">
                <div className="text-[36px] font-light">
                    Approaching...
                </div>
                {}
                <div className="text-[44px] font-medium leading-[50px]">
                    {shopData?.displayName}
                </div>
                <div className="text-[16px] font-light text-[#747474] italic">
                    {shopData?.description}
                </div>
                <nav className="flex mt-[10px] mb-[30px]">
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
                    <div className="text-[20px] mt-[10px] font-medium">
                        Featured Items
                    </div>

                    <div className={`overflow-x-auto bg-[${fill2}] rounded whitespace-nowrap pt-4 pl-4 pb-4`}>
                        {shopData?.items.map((item: any) => (
                            item.featured && <Item id={item.id} name={item.displayName} price={item.price} img={'/placeholder.jpg'} fill={fill} key={item.id}/>
                        ))}
                    </div>

                    <div className="text-[20px] mt-[10px] font-medium">
                        Popular Items
                    </div>

                    <div className={`overflow-x-auto bg-[${fill2}] rounded whitespace-nowrap pt-4 pl-4 pb-4`}>
                        {shopData?.items.map((item: any) => (
                            item.popular && <Item id={item.id} name={item.displayName} price={item.price} img={'/placeholder.jpg'} fill={fill} key={item.id}/>
                        ))}                        
                    </div>

                   
                    
                   

                    <Flex w={'100%'} justifyContent={'center'} mt={'30px'}>
                        <Button fontWeight={'normal'} onClick={saveShop} size={'lg'} bgColor={'#ed7bbe'} color={'white'} rightIcon={<MdOutlineSaveAlt/>}>Save</Button>
                    </Flex>
                </div>
                :
                <Flex flexDir={'column'}>
                    <SimpleGrid columns={2} maxH={'360px'} overflow={'auto'}>
                    {ratings?.map((rating) => (
                        <Rating key={rating.id} data={rating} />
                    ))}
                    </SimpleGrid>

                     {/* The Following HTML Shows a Form To Write A Review For the Store Given That The User Hasn't Already Written One */}
                    <Flex justifyContent={'center'} flexDir={'column'} alignItems={'center'}>
                    <Heading mt={'10vh'}>Write a Review</Heading>
                    <Flex justifyContent={'center'} alignItems={'center'}>
                        <FormControl onSubmit={createReview}>
                            <VStack flexDir={'column'} spacing={5} mt={5}>
                                <Flex>
                            {[...Array(5)].map((star, index) => (
                                <IconButton key={index} fontSize={'20px'} bgColor={'transparent'} color={(index + 1 <= rating) ? 'yellow' : 'black'} aria-label="star" icon={<AiFillStar/>} onClick={() => setRating(index + 1)} />
                            ))}
                            </Flex>                      
                            <FormLabel>Comment (optional)</FormLabel>
                            <Input outline={'1px solid black'} value={comment} onChange={(e) => setComment(e.target.value)} />
                            <FormHelperText>Enter what you thought of your experience here.</FormHelperText>
                            <Button color={'white'} fontWeight={'normal'} bgColor={'#ed7bbe'} type="submit" disabled={shopData?.rated ? true : false}>Submit</Button>
                            </VStack>
                        </FormControl>
                    </Flex>
                    </Flex>
                </Flex>

                }




                 {/* The Following HTML Shows a Button Used to Save/Pin The Store To the Users Account */}
                 
            </div>
        </div>
        
    )
}

export default Found;