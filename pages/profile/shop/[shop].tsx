import Item from "@/components/Explorer/Item"
import Uploader from "@/components/ImageUpload/Uploader"
import { DeleteIcon } from "@chakra-ui/icons"
import { Button, Flex, FormControl, FormLabel, IconButton, Image, Input, SimpleGrid, Switch, Text, VStack, useToast } from "@chakra-ui/react"
import { Item as ItemType, StoreInfo } from "@prisma/client"
import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCallback, useEffect, useReducer, useState } from "react"
import { BiArrowBack } from "react-icons/bi"

const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

interface ShopInfo extends StoreInfo {
    items: ItemType[]
}

const EditShop = () => {

    const [shopData, setShopData] = useState<ShopInfo>()   
    const [newShopName, setNewShopName] = useState<string>()
    const [itemData, setItemData] = useReducer(formReducer, {})
    const [url, setUrl] = useState<string>()
    const [itemUrl, setItemUrl] = useState<string>()
    const [page, setPage] = useState<"edit" | "manage" | "add">("edit")
    const router = useRouter() 
    const toast = useToast()
    useEffect(() => {
        if (!router.query.shop) return
        axios.post('/api/get/shop', {name: router.query.shop})
        .then((res) => {setShopData(res.data); setUrl(res.data.icon); setNewShopName(res.data.displayName)})
    }, [router.query.shop])

    const saveChanges = useCallback((e: any) => {
        e.preventDefault()

        axios.post('/api/edit/shop', {...shopData, icon: url, createTheme: false, id: localStorage.getItem('id'), displayName: newShopName})

    }, [shopData, url, newShopName])
 
    const addItem = useCallback((e: any) => {
        e.preventDefault()
        let data = {...itemData, ...(itemData.featured ? {} : {featured: false}), ...(itemData.popular ? {} : {popular: false}), id: localStorage.getItem('id'), ...(itemUrl ? {image: itemUrl} : {}), storeName: router.query.shop}
        
        axios.post('/api/create/item', data)
        .then(() => router.reload())
    }, [itemData, itemUrl, router])

    const handleChange = (event: any) => {
        setItemData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const deleteItem = useCallback(async (itemId: number) => {
        axios.post('/api/delete/item', {id: localStorage.getItem('id'), itemId: itemId, storeName: shopData?.name})
        .then(() => toast({title: 'Item Deleted!', status: 'success', duration: 3000, isClosable: true}))
        .catch(() => toast({title: 'Error!', description: 'A problem occured while deleting item!', status: 'error', duration: 3000, isClosable: true}))
    }, [shopData])  

    return (
        <Flex justifyContent={'center'} alignItems={'center'}>
            <Head>
                <title>Edit {shopData?.displayName}</title>
                <meta name="description" content="GoFindr! An interactive and unique place to find shops near you!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <IconButton pos={'absolute'} top={3} left={3} aria-label="back button" w={'50px'} h={'50px'} onClick={() => router.push('/profile/shops')} icon={<BiArrowBack />} />

            <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} w={'80%'}>
            
                <nav className="flex mt-[10px] mb-[20px]">
                    <ul className="flex space-x-6">
                        <button className={(page === 'edit') ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                        onClick={() => setPage("edit")}>
                            Edit Shop
                        </button>
                        <button className={(page === 'manage') ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                        onClick={() => setPage("manage")}>
                            Manage Items
                        </button>
                        <button className={(page === 'add') ? 'text-black border-b-2 border-black' : 'text-gray-400'}
                        onClick={() => setPage("add")}>
                            Add Item
                        </button>
                    </ul>
                </nav>
                

                
                <Flex justifyContent={'center'} w={'100%'} mt={'5vh'}>
                    {(page === "edit") && 
                        <form onSubmit={saveChanges}>
                            <FormControl>
                                <VStack justifyContent={'center'} spacing={3}>

                                
                                    <Image w={'200px'} src={url}/>
                                    <Uploader relate="shopIcon" message="Upload Account Icon" setState={setUrl}/>                
                                    <Input value={newShopName} onChange={(e) => setNewShopName(e.target.value)}/>
                                    <Input value={shopData?.description || ""} onChange={(e) => setShopData(shopData ? {...shopData, description: e.target.value} : undefined)}/>
                                    <Input value={shopData?.themeId || ""} onChange={(e) => setShopData(shopData ? {...shopData, themeId: parseInt(e.target.value)} : undefined)}/>
                                    <Button type="submit" bgColor={'#ed7bbe'} color={'white'} p={5}>Save</Button>
                                </VStack>
                            </FormControl>

                        </form>  
                            
                    }
                    {(page === "manage") && 
                        <SimpleGrid columns={2} spacing={3}>
                            {shopData?.items.map((item) => (
                                <Flex flexDir={'column'} alignItems={'center'} w={'fit-content'}>
                                    <Item id={JSON.stringify(item.id)} price={item.price} name={item.displayName} img={item.image} rating={item.rating} />
                                    <IconButton colorScheme="red" m={1} w={'50%'} aria-label="delete item" icon={<DeleteIcon />} onClick={() => deleteItem(item.id)} />
                                </Flex>
                            ))}
                     </SimpleGrid>
                    }
            
                
                    {(page === "add") && 
                    <form onSubmit={addItem}>    
                        <FormControl>     
                            <VStack spacing={3}>                      
                                <Input type="text" name="itemName" placeholder="Item Name" onChange={handleChange}/>
                                <Image width={'200px'} src={itemUrl}/>
                                <Uploader relate="itemUpload" setState={setItemUrl} message="Upload Image"/>
                                <Input type="text" name="description" onChange={handleChange} placeholder="Description"/>
                                <Input type="text" name="price" onChange={handleChange} placeholder="Price"/>
                                <FormLabel>Featured</FormLabel>
                                <Switch name="featured" onChange={(e) => setItemData({name: e.target.name, value: e.target.checked})}/>
                                <FormLabel>Popular</FormLabel>
                                <Switch name="popular" onChange={(e) => setItemData({name: e.target.name, value: e.target.checked})}/>
                                <Button type="submit" bgColor={'#ed7bbe'} color={'white'} p={5}>Add Item</Button>     
                            </VStack> 
                        </FormControl>           
                    </form>
                    }
                </Flex>
            </Flex>
        </Flex>
    )

}

export default EditShop