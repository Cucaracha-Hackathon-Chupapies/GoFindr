import React, { useEffect, useState } from 'react';

const APITest = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {

        const handleCallback = async () => {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
    
            if (code) {
                try {

                    const response = await fetch('https://connect.squareup.com/oauth2/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        client_id: 'sandbox-sq0idb-vnIblv35DnSWu7UBvFEmSw',
                        client_secret: 'sandbox-sq0csb-QvKJFVqELR5O_uGE5CMIMXJG-DxBySVFFcgGnVwn23k',
                        code,
                        grant_type: 'authorization_code',
                        redirect_uri: 'http://localhost:3000/apitest',
                    }),
                    });
        
                    const data = await response.json();
                    const accessToken = data.access_token;
            
                    setAccessToken(accessToken);

                } catch (error) {
                    console.error('Error exchanging authorization code for access token:', error);
                }
            }
        };
    
        handleCallback();
    }, []);

    const handleAuthorization = () => {
        const authorizationUrl = `https://connect.squareup.com/oauth2/authorize?client_id=sandbox-sq0idb-vnIblv35DnSWu7UBvFEmSw&scope=ITEMS_WRITE&state=RANDOM_STATE_VALUE&response_type=code&redirect_uri=http://localhost:3000/apitest`;
        window.location.href = authorizationUrl;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            {accessToken ? (
                <div>
                    <h2>Access Token Obtained!</h2>
                    <p>Access Token: {accessToken}</p>
                    {/* Step 6: Make requests to the Catalog API */}
                    {/* You can use the accessToken to make API requests to the Catalog API */}
                </div>
            ) : (
                    <div>
                    <h2>Authorize Application</h2>
                    <p>Click the button below to authorize the application to access your Square store:</p>
                    <button onClick={handleAuthorization}>Authorize</button>
                    </div>
            )}
        </div>
    )
}

export default APITest;