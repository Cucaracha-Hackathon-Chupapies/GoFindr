import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Account } from "@prisma/client";
import axios from "axios";

import SignUp from "@/components/Profile/Signup";
import Login from "@/components/Profile/Login";
import ProfileBG from "@/components/Backgrounds/ProfileBG";
import Head from "next/head";
import { Button, Icon } from "@chakra-ui/react";
import { BsShop } from 'react-icons/bs'

const Profile = () => {

    const [userData, setUserData] = useState<Account>()
    const router = useRouter()
    const [isLoggedIn, setLoggedIn] = useState<boolean>()
    
    const [signFlag, setSignFlag] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('id')){
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [])

    useEffect(() => {

        if (!localStorage.getItem('id'))return;
        axios.post('/api/get/account', {id: localStorage.getItem('id')})
        .then((res) => {

            setUserData(res.data)

        })
    }, [router])

    return (
        <div>            
            <Head>
                <title>My Profile</title>
                <meta name="description" content="GoFindr! An interactive and unique place to find shops near you!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProfileBG />
            {isLoggedIn ? 
                <div className="relative ml-[10%] md:ml-[20%] lg:ml-[30%] w-[80%] md:w-[60%] lg:w-[40%] mt-[20px] flex flex-col items-center">
                    <img alt="user icon" src={userData?.icon || "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?resize=300%2C300&ssl=1"} className="border border-black rounded-full w-[130px] h-[130px] mt-[100px]"></img>
                    <h1 className="text-[32px] font-medium mt-2">{userData?.username || "Quandale Dingle"}</h1>
                    <button onClick={() => router.push('/profile/edit')} className="w-[125px] h-[40px] text-[18px] bg-gray-100 rounded-full border border-black mt-2">Edit Profile</button>

                    <div className="mt-8" />

                    <Button onClick={() => router.push('/profile/shops')} w={'370px'} h={'54px'} fontSize={'18px'} bgColor={'white'} border={'1px solid black'} mt={4} pl={8} borderRadius={'full'} fontWeight={'normal'} _hover={{}} rightIcon={<Icon fontSize={'22px'} mr={'18px'} as={BsShop}/>} justifyContent={'space-between'}>
                        My Shops
                        
                    </Button>

                    <button onClick={() => router.push('/profile/saved')} className="w-[370px] h-[54px] text-[18px] bg-white rounded-full border border-black mt-4 pl-8 flex flex-row place-items-center">
                        Saved Locations
                        <svg className="ml-[130px]" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.75 6.5L16.25 13L9.75 19.5" stroke="#33363F" strokeWidth="2"/>
                        </svg>
                    </button>

                    <button className="w-[370px] h-[54px] text-[18px] bg-white rounded-full border border-black mt-4 pl-8 flex flex-row place-items-center">
                        Contact Us
                        <svg className="ml-[176px]" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.6667 12.3333C21.6667 8.56209 21.6667 6.67647 20.4951 5.5049C19.3236 4.33333 17.4379 4.33333 13.6667 4.33333H12.3334C8.56214 4.33333 6.67652 4.33333 5.50495 5.5049C4.33337 6.67647 4.33337 8.56209 4.33337 12.3333V19.6667C4.33337 20.6095 4.33337 21.0809 4.62627 21.3738C4.91916 21.6667 5.39056 21.6667 6.33337 21.6667H13.6667C17.4379 21.6667 19.3236 21.6667 20.4951 20.4951C21.6667 19.3235 21.6667 17.4379 21.6667 13.6667V12.3333Z" stroke="#33363F" strokeWidth="2"/>
                            <path d="M9.75 10.8333L16.25 10.8333" stroke="#33363F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9.75 15.1667H13" stroke="#33363F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <button className="w-[370px] h-[54px] text-[18px] bg-white rounded-full border border-black mt-4 pl-8 flex flex-row place-items-center">
                        Help
                        <svg className="ml-[234px]" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="13" cy="13" r="9.75" stroke="#33363F" strokeWidth="2"/>
                            <circle cx="13" cy="19.5" r="0.541667" fill="#33363F" stroke="#33363F"/>
                            <path d="M13 17.3333V15.7962C13 14.7733 13.6546 13.8652 14.625 13.5417V13.5417C15.5954 13.2182 16.25 12.31 16.25 11.2871V10.7312C16.25 8.99268 14.8407 7.58334 13.1022 7.58334H13C11.2051 7.58334 9.75 9.03842 9.75 10.8333V10.8333" stroke="#33363F" strokeWidth="2"/>
                        </svg>
                    </button>     
                    <button className="w-[370px] h-[54px] text-[18px] bg-white rounded-full border border-black mt-4 pl-8 flex flex-row place-items-center" onClick={() => {localStorage.removeItem('id'); router.reload()}}>
                        Log Out
                        
                    </button>               
                </div>
            : (
                <div className="mt-[100px]">
                    <ProfileBG />
                    {signFlag === true ? 
                        <SignUp setSignFlag={setSignFlag}/> :
                        <Login setSignFlag={setSignFlag}/>}
                </div>
            )}
            
            
        </div>
    )
}

export default Profile;