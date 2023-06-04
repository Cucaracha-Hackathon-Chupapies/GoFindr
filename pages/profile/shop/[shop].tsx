import Uploader from "@/components/ImageUpload/Uploader"
import { Item, StoreInfo } from "@prisma/client"
import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCallback, useEffect, useReducer, useState } from "react"
const formReducer = (state: any, event: any) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

interface ShopInfo extends StoreInfo {
    items: Item[]
}

const EditShop = () => {

    const [shopData, setShopData] = useState<ShopInfo>()   
    const [newShopName, setNewShopName] = useState<string>()
    const [itemData, setItemData] = useReducer(formReducer, {})
    const [url, setUrl] = useState<string>()
    const [itemUrl, setItemUrl] = useState<string>()
    const router = useRouter() 

    useEffect(() => {
        if (!router.query.shop) return
        axios.post('/api/get/shop', {name: router.query.shop})
        .then((res) => {setShopData(res.data); setUrl(res.data.icon); setNewShopName(res.data.displayName)})
    }, [router.query.shop])

    const saveChanges = useCallback((e: any) => {
        e.preventDefault()
        console.log({...shopData, icon: url})
        //name -> displayname
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

    return (
        <>
            <Head>
                <title>GoFindr</title>
                <meta name="description" content="GoFindr! An interactive and unique place to find shops near you!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <button onClick={() => router.push('/profile/shops')}>Back</button>

            <form onSubmit={saveChanges}>
                
                <img className="w-[200px]" src={url}/>
                <Uploader relate="shopIcon" message="Upload Account Icon" setState={setUrl}/>                
                <input value={newShopName} onChange={(e) => setNewShopName(e.target.value)}/>
                <input value={shopData?.description || ""} onChange={(e) => setShopData(shopData ? {...shopData, description: e.target.value} : undefined)}/>
                <input value={shopData?.themeId || ""} onChange={(e) => setShopData(shopData ? {...shopData, themeId: parseInt(e.target.value)} : undefined)}/>
                <button type="submit">Save</button>

            </form>          

            <h1>Items</h1>
            {shopData?.items.map((item) => (
                <div key={item.id}>
                    <h1>{item.displayName}</h1>
                    <p>{item.description}</p>
                    <h1>{item.rating}</h1>
                    {item.featured}
                    {item.popular}
                    <img className="w-[100px]" src={item.image}/>
                    <h2>{item.price}</h2>
                </div>
            ))}
            
            <h1>Add Item</h1>
            <form onSubmit={addItem}>                                
                <input type="text" name="itemName" placeholder="Item Name" onChange={handleChange}/>
                <img className="w-[200px]" src={itemUrl}/>
                <Uploader relate="itemUpload" setState={setItemUrl} message="Upload Image"/>
                <textarea name="description" onChange={handleChange} placeholder="Description"/>
                <input type="text" name="price" onChange={handleChange} placeholder="$9.99"/>
                <label>Featured</label>
                <input type="checkbox" name="featured" onChange={(e) => setItemData({name: e.target.name, value: e.target.checked})}/>
                <label>Popular</label>
                <input type="checkbox" name="popular" value={"Popular"} onChange={(e) => setItemData({name: e.target.name, value: e.target.checked})}/>
                <button type="submit">Add Item</button>                
            </form>

        </>
    )

}

export default EditShop