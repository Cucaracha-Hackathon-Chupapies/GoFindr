import { Flex, Text } from '@chakra-ui/react'
import { StoreRating } from '@prisma/client'
import React from 'react'
import { AiFillStar } from 'react-icons/ai'
interface Props {
    data: StoreRating
}

export default function Rating({data}: Props) {
  return (
    <Flex bgColor={'rgb(31, 41, 55)'} borderRadius={'md'} flexDir={'column'} px={5} py={5}>
        <Flex justifyContent={'center'}>
            <Text color={'gray.100'}>{data.comment}</Text>
        </Flex>
        <Flex mt={5} alignItems={'center'} justifyContent={'space-between'}>
       
            <Flex mr={5}>
                {Array.from(Array(data.rating).keys()).map(() => (

                
                        <AiFillStar key={data.id} fontSize={'20px'} color={'yellow'}/>    
                    
                ))}
                
            </Flex>
            <Text color={'gray.100'} fontSize={'sm'}>{new Date(data.created).toDateString()}</Text>
        </Flex>
        
    </Flex>
  )
}