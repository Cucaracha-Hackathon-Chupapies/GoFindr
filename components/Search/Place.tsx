type Props = {
    id: string;
    name: string;
    rating: string;
    img: string;
    fill: string;
}

const Place = (props: Props) => {
    const { id, name, rating, img, fill } = props;
    const bg = "bg-[" + fill + "]";
    return (
        <div key={id} className="w-full lg:w-[50%] p-[2%]">
            <img src={img} alt={name} className="w-full h-[250px] rounded-t object-cover border-x border-t border-black"/>
            <div className={`${bg} rounded-b text-[18px] pt-[5px] pb-[5px] pl-[10px] pr-[10px] border border-black`}>
                <div className="py-2">{name}</div>
            </div>
        </div>
    )
}

export default Place;