import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const tokenUrl = 'https://connect.squareupsandbox.com/oauth2/token';
    const { code } = req.query;

    const params = new URLSearchParams();
    params.append('client_id', process.env.SQ_APPLICATION_ID || '');
    params.append('client_secret', process.env.SQ_APPLICATION_SECRET || '');
    params.append('code', Array.isArray(code) ? code[0] : code || '');
    params.append('grant_type', 'authorization_code');

    try {
        const response = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });

        if (!response.ok) {
            throw new Error('Failed to obtain access token');
        }

        const data = await response.json();
        const accessToken = data.access_token;

        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to obtain access token' });
    }
};

export default handler;
