import React, { useEffect, useState, } from 'react';

const accessKey = "sandbox-sq0cgb-141zjx8W4ZpIzPemGnZeMw"

const CatalogTest = () => {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        const tokenGet = async () => {
            try {
                const response = await fetch(`/api/tokentest?code=${accessKey}`)
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error);
                }

                const { accessToken } = data;
                setAccessToken(accessToken);
            }
            catch (error) {
                console.log("ERROR!")
            }
        }


        tokenGet();
    }, [])


    

    return (
        <div>
            Access Token: {accessToken}
        </div>
    );
}

export default CatalogTest;