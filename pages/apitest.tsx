import React, { useEffect, useState, } from 'react';

const basePath = `https://connect.squareupsandbox.com`;
const client_id = process.env.SQ_APPLICATION_ID;
const client_secret = process.env.SQ_APPLICATION_SECRET;


const scopes = [
    'ITEMS_READ',
    'MERCHANT_PROFILE_READ',
]

const url = `${basePath}/oauth2/authorize?client_id=${client_id}&response_type=code&scope=${scopes.join('+')}`;

const APITest = () => {
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
    
            console.log('Authorization Code: ', code);
        };

        if (window.location.search.includes('code=')) {
            handleRedirect();
        } else {
            fetchAuthURL();
        }
    }, [])

    return (
        <div>
            <h1>REQUEST TOKEN PAGE</h1>
            <div id="content"></div>
        </div>
    );
}

export default APITest;