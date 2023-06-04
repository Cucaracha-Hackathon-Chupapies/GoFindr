import Uploader from "@/components/ImageUpload/Uploader"
import { Button, Flex, FormControl, FormHelperText, FormLabel, Image, Input, Text, VStack } from "@chakra-ui/react"
import { Account } from "@prisma/client"
import axios from "axios"
import Head from "next/head"
import { useCallback, useEffect, useState } from "react"

const EditAccount = () => {

    const [accountData, setAccountData] = useState<Account>()   
    const [url, setUrl] = useState<string>() 

    useEffect(() => {

        axios.post('/api/get/account', {id: localStorage.getItem('id')})
        .then((res) => {setAccountData(res.data); setUrl(res.data.icon)})
    }, [])

    const saveChanges = useCallback((e: any) => {
        e.preventDefault()
        console.log({...accountData, icon: url})
        axios.post('/api/edit/account', {...accountData, icon: url})

    }, [accountData, url])

    return (
        <>
            <Head>
                <title>GoFindr</title>
                <meta name="description" content="GoFindr! An interactive and unique place to find shops near you!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex flexDir={'column'} alignItems={'center'}>
                <Text mt={10} fontSize={'2xl'} fontWeight={'bold'}>Edit Account</Text>
                <FormControl onSubmit={saveChanges} mt={10}>
                    <VStack flexDir={'column'} alignItems={'center'} spacing={5}>
                        <Image alt="User Profile Picture" borderRadius={'50%'} src={url}/>                        
                        <Uploader relate="iconUpload" message="Upload Account Icon" setState={setUrl}/>                
                        <Flex flexDir={'column'}>
                        <FormLabel>Username</FormLabel>
                        <Input border={'1px solid black'} w={'330px'} value={accountData?.username} onChange={(e) => setAccountData(accountData ? {...accountData, username: e.target.value} : undefined)}/>
                        </Flex>
                        <Flex flexDir={'column'}>
                        <FormLabel>Password</FormLabel>
                        <Input border={'1px solid black'} w={'330px'} value={accountData?.password || ""} onChange={(e) => setAccountData(accountData ? {...accountData, password: e.target.value} : undefined)}/>
                        </Flex>
                        <Button fontSize={'20px'} color={'white'} fontWeight={'normal'} bgColor={'#ed7bbe'} type="submit">Submit</Button>
                    </VStack>
                </FormControl>                
            </Flex>
        </>
    )

}

export default EditAccount