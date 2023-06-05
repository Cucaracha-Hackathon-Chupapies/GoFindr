import { StarIcon } from "@chakra-ui/icons";
import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";

type Props = {
    id: string;
    name: string;
    price: string;
    img: string;
    rating: number;
}

const Item = (props: Props) => {
    const { id, name, price, img, rating } = props;
    const styles = {
        description: {
            backgroundColor: "#ffffff",
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
                <Flex justifyContent={'space-between'} mt={2}>
                    <div className="opacity-50 italic">{price}</div>
                    <Flex alignItems={'center'}>
                        <Text color={'yellow.600'} mr={1}>{rating}</Text>
                        <Icon mb={0.5} fontSize={'15px'} color={'#ed7bbe'} as={StarIcon}/>
                    </Flex>
                </Flex>
            </div>
        </div>
    )
}

export default Item;