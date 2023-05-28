type Props = {
    id: string;
    name: string;
    rating: string;
    img: string;
    fill: string;
}

const Place = (props: Props) => {
    const { id, name, rating, img, fill } = props;
    return (
        <div key={id} className="inline-block mr-4">
            <img src={img} alt={name} className="w-[160px] h-[120px] rounded-t object-cover border-x border-t border-black"/>
            <div className={`bg-[${fill}] rounded-b text-[14px] pt-[5px] pb-[5px] pl-[10px] pr-[10px] border border-black`}>
                <div>{name}</div>
                <div className="opacity-50 italic">{rating}/5</div>
            </div>
        </div>
    )
}

export default Place;