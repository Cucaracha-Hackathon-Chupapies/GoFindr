import Item from "./Item";

const Found = () => {
    const name = "MISHKA MUSHKA";
    const description = "Japanese izakaya with splashy decor & a sake-bottle chandelier, serving creative, intricate plates...";
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
    const fill = "#ffffff";
    const fill2 = "#D9D9D9";

    return (
        <div className="relative z-999 ">
            <div className="ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[100px] md:mt-[70px] lg:mt-[40px]">
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
                    {templateItems.map((item) => (
                        <Item id={item.id} name={item.name} price={item.price} img={item.img} fill={fill} key={item.id}/>
                    ))}
                </div>

                <div className="text-[20px] mt-[10px] font-medium">
                    Popular Items
                </div>

                <div className={`overflow-x-scroll bg-[${fill2}] rounded whitespace-nowrap pt-4 pl-4 pb-4`}>
                    {templateItems.map((item) => (
                        <Item id={item.id} name={item.name} price={item.price} img={item.img} fill={fill} key={item.id}/>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default Found;