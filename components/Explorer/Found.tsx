import axios from "axios";
import Item from "./Item";
import { useEffect, useState } from "react";
import Head from "next/head";
import { StoreRating } from "@prisma/client";

const Found = () => {
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

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [rated, setRated] = useState(false)
    const [rating, setRating] = useState(3)
    const [comment, setComment] = useState("")
    const [ratings, setRatings] = useState<StoreRating[]>()
    const [items, setItems] = useState<any>([]) //HAHAHAHAAH LOLLLLL FUNNY LMFAAO any :))))
    const fill = "#ffffff";
    const fill2 = "#D9D9D9";

    useEffect(() => {
        axios.post('/api/get/shop', {name: storeName})
        .then((res) => {
            setName(res.data.displayName)
            setDescription(res.data.description)
            setItems(res.data.items)
            setRated(res.data.rated)
        })

        axios.post('/api/get/ratings', {storeName: storeName})
        .then((res) => {
            setRatings(res.data)
        })
    }, [])

    const createReview = (e: any) => {
        e.preventDefault()

        if (!localStorage.getItem('id') || !rating) return

        axios.post('/api/create/rating', {id: localStorage.getItem('id'), storeName: storeName, rating: rating, comment: comment})
    }

    const saveShop = () => {
        axios.post('/api/account/save', {id: localStorage.getItem('id') || "", name: storeName})
    }

    return (
        <div className="relative z-999 ">
            <Head>
                <title>{name || "Store Found!"}</title>
                <meta name="description" content="Viewing store found using geolocation! Wowzaa that's pretty cool if you ask me :) " />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px] ">
                <div className="text-[36px] font-light">
                    Approaching...
                </div>
                <div className="text-[44px] font-medium leading-[50px]">
                    {name}
                </div>
                <div className="text-[16px] font-light text-[#747474] italic">
                    {description}
                </div>
                <div className="text-[20px] mt-[10px] font-medium">
                    Featured Items
                </div>

                <div className={`overflow-x-scroll bg-[${fill2}] rounded whitespace-nowrap pt-4 pl-4 pb-4`}>
                    {items.map((item: any) => (
                        item.featured && <Item id={item.id} name={item.displayName} price={item.price} img={'/placeholder.jpg'} fill={fill} key={item.id}/>
                    ))}
                </div>

                <div className="text-[20px] mt-[10px] font-medium">
                    Popular Items
                </div>

                <div className={`overflow-x-scroll bg-[${fill2}] rounded whitespace-nowrap pt-4 pl-4 pb-4`}>
                    {items.map((item: any) => (
                        item.popular && <Item id={item.id} name={item.displayName} price={item.price} img={'/placeholder.jpg'} fill={fill} key={item.id}/>
                    ))}
                </div>

                {/* The Following HTML Shows the Reviews the Store Has */}
                <div>
                    <h1>Reviews</h1>
                    {ratings?.map((rating) => (
                        <div>
                            <h1>{rating.rating}</h1>
                            <h3>{rating.comment}</h3>            
                            <p>{new Date(rating.created).toDateString()}</p>           
                        </div>
                    ))}
                </div>
                
                {/* The Following HTML Shows a Button Used to Save/Pin The Store To the Users Account */}
                <button onClick={saveShop}>Save</button>

                {/* The Following HTML Shows a Form To Write A Review For the Store Given That The User Hasn't Already Written One */}
                <div>
                    <h2>Write A Review</h2>
                    <form onSubmit={createReview}>
                        <input type="range" min={1} max={5} value={rating} onChange={(e) => setRating(parseInt(e.target.value))}/>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        <button type="submit" disabled={rated ? true : false}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default Found;