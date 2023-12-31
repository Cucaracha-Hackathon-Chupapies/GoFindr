import { StarIcon } from "@chakra-ui/icons";
import { Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";

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
                          
            <Image width={130} height={100} src={img} alt={name} className="rounded-t object-cover border-x border-t border-black"/>
            
            <div style={styles.description}>
                <div className='mt-[5px]'>{name}</div>
                <Flex justifyContent={'space-between'}>
                    <div className="opacity-50 italic">{price}</div>
                    <Flex alignItems={'center'}>
                        {(rating !== 0) ? 
                        <>
                        <Text color={'yellow.600'} mr={1}>{rating}</Text>
                        <Icon mb={0.5} fontSize={'15px'} color={'#ed7bbe'} as={StarIcon}/>
                        </>
                        :
                        <Icon mb={0.5} fontSize={'18px'} as={AiOutlineStar}/>
                        }
                    </Flex>
                </Flex>
            </div>
        </div>
    )
}

export default Item;