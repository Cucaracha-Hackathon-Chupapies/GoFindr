import prisma from '@/lib/prisma';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, } from 'react';

const basePath = `https://connect.squareupsandbox.com`;
const client_id = process.env.SQ_APPLICATION_ID;

const scopes = [
    'ITEMS_READ',
    'MERCHANT_PROFILE_READ',
    'ITEMS_WRITE'
]

const url = `${basePath}/oauth2/authorize?client_id=${client_id}&response_type=code&scope=${scopes.join('+')}`;

const APITest = () => {
    const router = useRouter()

    useEffect(() => {
        const fetchAuthURL = async () => {
            try {
                window.location.href = url;
            }
            catch (error) {
                console.log("ERROR!");
            }
    
        };
        
        const handleRedirect = () => {
            const urlSearchParams = new URLSearchParams(window.location.search);
            const code = urlSearchParams.get('code');
    
            axios.post('/api/square/accesstoken', {code: code, id: localStorage.getItem('id')})
            .then((res) => {                
                if (res.data.accessToken){
                    router.push('/create')
                }
            })
        };

        
        if (window.location.search.includes('code=')) {
            handleRedirect();
        } else {
            fetchAuthURL();
        }
        
    }, [])

    return (
        <div>
            <h1>Loading...</h1>            
        </div>
    );
}

export default APITest;