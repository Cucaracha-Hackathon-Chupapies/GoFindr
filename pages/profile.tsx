import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Account } from "@prisma/client";
import axios from "axios";

import SignUp from "@/components/Profile/Signup";
import Login from "@/components/Profile/Login";
import ProfileBG from "@/components/Backgrounds/ProfileBG";

const Profile = () => {

    const [userData, setUserData] = useState<Account>()
    const router = useRouter()
    
    const [signFlag, setSignFlag] = useState(true);

    // useEffect(() => {
    //     axios.post('/api/get/account', {id: localStorage.getItem('id')})
    //     .then((res) => {

    //         setUserData(res.data)

    //     }).catch(() => {logFlag = false;})
    // }, [router])
    console.log(signFlag);
    return (
        <div>
            <ProfileBG />

            {localStorage.getItem('id') === null ? 
                <div>
                    <img src={userData?.icon}/>
                    <h1>{userData?.username}</h1>
                    <button>Edit Profile</button>
                </div>
            : 
            (signFlag === true ? <SignUp setSignFlag={setSignFlag}/> : <Login setSignFlag={setSignFlag}/>)}

            
        </div>
    )
}

export default Profile;