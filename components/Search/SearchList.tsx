import axios from "axios";
import { useEffect, useState } from "react";
import Place from "./Place";

type Props = {
    sortBy: string;
}

const SearchList = (props: Props) => {
    const { sortBy } = props;
    
    const templatePlaces = [
        { id: "1", name: 'Yomama house', rating: '5', img: '/placeholder.jpg' },
        { id: "2", name: 'Wanokuni', rating: '5', img: '/placeholder.jpg' },
        { id: "3", name: 'Mishimuno watanubo', rating: '4', img: '/placeholder.jpg' },
        { id: "4", name: 'Annyeoung Heungmidae', rating: '4', img: '/placeholder.jpg' },
        { id: "5", name: 'Jones BBQ and foot massage', rating: '3', img: '/placeholder.jpg' },
        { id: "6", name: 'Ching chong motha fucka', rating: '3', img: '/placeholder.jpg' },
        { id: "7", name: 'i wanna commit sebsycide', rating: '2', img: '/placeholder.jpg' },
        { id: "8", name: 'school: where dumpies go to die', rating: '2', img: '/placeholder.jpg' },
    ];
    

    const storeName = "mishkamushka"; //id of the store found

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [items, setItems] = useState<any>([]) //HAHAHAHAAH LOLLLLL FUNNY LMFAAO any :))))
    const fill = "#ffffff";
    const fill2 = "#f2f2f2";
    const bg = "bg-[" + fill2 + "]";

    useEffect(() => {
        axios.post('/api/get/shop', {name: storeName})
        .then((res) => {
            setName(res.data.displayName)
            setDescription(res.data.description)
            setItems(res.data.items)
        })
    })

    return (
        <div className="w-full h-full">

            <div className={`flex flex-col overflow-y-scroll ${bg} h-full rounded p-4 content-center items-center`}>
                {/* {items.map((item: any) => (
                    item.popular && <Item id={item.id} name={item.displayName} price={item.price} img={'/placeholder.jpg'} fill={fill} key={item.id}/>
                ))} */}

                {templatePlaces.map((item: any) => (
                    <Place id={item.id} name={item.name} rating={item.rating} img={'/placeholder.jpg'} fill={fill} key={item.id}/>
                ))}
            </div>

        </div>
        
    )
}

export default SearchList;