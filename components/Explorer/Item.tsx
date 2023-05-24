import Image from "next/image";

type Props = {
    id: string;
    name: string;
    price: string;
    img: string;
}

const Item = (props: Props) => {
    const { id, name, price, img } = props;
    return (
        <div key={id} className="inline-block mr-4">
            <Image src={img} alt={name} width="160" height="140" />
            <div>{name}</div>
            <div>{price}</div>
        </div>
    )
}

export default Item;