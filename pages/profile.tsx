import React, { useEffect, useState } from "react";
import ProfileBG from "@/components/Backgrounds/ProfileBG";
import { Account } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/router";

const Profile = () => {

    const [userData, setUserData] = useState<Account>()

    const router = useRouter()

    useEffect(() => {
        axios.post('/api/get/account', {id: localStorage.getItem('id')})
        .then((res) => {

            setUserData(res.data)

        }).catch(() => router.push('/login'))
    }, [router])

    return (
        <div>
            <ProfileBG />
            <div>

                <img src={userData?.icon}/>

                <h1>{userData?.username}</h1>

                <button>Edit Profile</button>



            </div>
        </div>
    )
}

export default Profile;