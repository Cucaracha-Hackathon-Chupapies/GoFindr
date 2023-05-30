import axios from "axios";
import Item from "./Item";
import { useEffect, useState } from "react";
import Head from "next/head";

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
    const [items, setItems] = useState<any>([]) //HAHAHAHAAH LOLLLLL FUNNY LMFAAO any :))))
    const fill = "#ffffff";
    const fill2 = "#D9D9D9";

    useEffect(() => {
        axios.post('/api/getshop', {name: storeName})
        .then((res) => {
            setName(res.data.displayName)
            setDescription(res.data.description)
            setItems(res.data.items)
        })
    }, [])

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
            </div>
        </div>
        
    )
}

export default Found;