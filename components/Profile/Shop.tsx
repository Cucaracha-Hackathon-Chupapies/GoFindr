import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { StoreInfo } from '@prisma/client'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    data: StoreInfo,
    highlight: boolean
}

export default function Shop({data, highlight}: Props) {
    const router = useRouter()

  return (
    <Flex color={'white'} flexDir={'column'} alignItems={'center'} bgColor={'rgb(31, 41, 55)'} my={5} borderRadius={'md'} p={5} border={highlight ? '3px solid gold' : ''}>
        {data.icon && <Image alt={'Shop Icon'} src={data.icon} w={'200px'} h={'200px'} borderRadius={'full'} objectFit={'cover'}/>}
        <Text mt={3} fontSize={'2xl'}>{data.displayName}</Text>
        <Text mt={6} mb={10} maxW={'70%'} fontSize={'sm'} textAlign={'center'}>{data.description}</Text>
        <Flex justifyContent={'space-between'} w={'85%'}>
            <Text>Theme ID: {data.themeId}</Text>
            <Text>Created: {new Date(data.created).toDateString()}</Text>
        </Flex>
        <Button mt={6} px={10} onClick={() => router.push(`/profile/shop/${data.name}`)} fontSize={'20px'} color={'white'} fontWeight={'normal'} bgColor={'#ed7bbe'}>Edit</Button>
    </Flex>
  )
}