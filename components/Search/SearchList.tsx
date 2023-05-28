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
    const fill2 = "#D9D9D9";

    useEffect(() => {
        axios.post('/api/getshop', {name: storeName})
        .then((res) => {
            setName(res.data.displayName)
            setDescription(res.data.description)
            setItems(res.data.items)
        })
    })

    return (
        <div className="relative z-999 ">
            <div className="ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px] md:mt-[70px] lg:mt-[40px]">

                <div className={`overflow-scroll bg-[${fill2}] rounded whitespace-nowrap pt-4 pl-4 pb-4`}>
                    {/* {items.map((item: any) => (
                        item.popular && <Item id={item.id} name={item.displayName} price={item.price} img={'/placeholder.jpg'} fill={fill} key={item.id}/>
                    ))} */}
                    
                    CURRENT SORT: { sortBy }
                    {templatePlaces.map((item: any) => (
                        <Place id={item.id} name={item.name} rating={item.rating} img={'/placeholder.jpg'} fill={fill} key={item.id}/>
                    ))}
                </div>

            </div>
        </div>
        
    )
}

export default SearchList;