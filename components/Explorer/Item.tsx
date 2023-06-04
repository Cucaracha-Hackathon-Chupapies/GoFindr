import React from "react";

type Props = {
    id: string;
    name: string;
    price: string;
    img: string;
    fill: string;
}

const Item = (props: Props) => {
    const { id, name, price, img, fill } = props;
    const styles = {
        description: {
            backgroundColor: fill,
            borderBottomLeftRadius: '4px',
            borderBottomRightRadius: '4px',
            fontSize: '14px',
            paddingBottom: '5px',
            paddingLeft: '10px',
            paddingRight: '10px',
            border: '1px solid black',
        }
    }

    return (
        <div key={id} className="inline-block mr-4">
            <img src={img} alt={name} className="w-[160px] h-[120px] rounded-t object-cover border-x border-t border-black"/>
            <div style={styles.description}>
                <div className='mt-[5px]'>{name}</div>
                <div className="opacity-50 italic">{price}</div>
            </div>
        </div>
    )
}

export default Item;