import Uploader from "@/components/ImageUpload/Uploader"
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
            <form onSubmit={saveChanges}>
                
                <img src={url}/>
                <Uploader relate="iconUpload" message="Upload Account Icon" setState={setUrl}/>                
                <input value={accountData?.username} onChange={(e) => setAccountData(accountData ? {...accountData, username: e.target.value} : undefined)}/>
                <input value={accountData?.password || ""} onChange={(e) => setAccountData(accountData ? {...accountData, password: e.target.value} : undefined)}/>
                <button type="submit">Save</button>

            </form>
            <button onClick={() => {window.location.href = "/editshops"}}>My Shops</button>

        </>
    )

}

export default EditAccount