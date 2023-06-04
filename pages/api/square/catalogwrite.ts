import { NextApiRequest, NextApiResponse } from 'next';
import { Environment, Client } from 'square';
import { bigint } from 'square/dist/types/schema';
import { v4 as uuidv4 } from 'uuid';


const createCatalogItem = async (displayName: string, price: number, client: any, idekey: string, id: string) => {


    try {
        
        const response = await client.catalogApi.upsertCatalogObject({
            idempotencyKey: idekey,
            object: {
                type: 'ITEM',
                id: `#${id}`,
                itemData: {
                    name: `${displayName}`,
                    variations: [
                        {
                            type: 'ITEM_VARIATION',
                            id: `#${displayName}`,
                            itemVariationData: {
                                itemId: `#${id}`,
                                pricingType: 'FIXED_PRICING',
                                priceMoney: {
                                    amount: BigInt(price),
                                    currency: 'CAD',
                                },
                            },
                        },
                    ],
                }
            }
        });

        return response.result;

    } catch (error) {
        console.error(error);
        throw new Error('Failed to create catalog item');
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("HELLO!!")
    if (req.method == 'POST') {
        console.log("HELLO???")
        const { displayName, price } = req.body;
        const accessToken = req.headers.authorization;
        
        let environment = Environment.Sandbox
        const id = uuidv4();
        const idekey = uuidv4();
        console.log(id, idekey);
    
    
        const client = new Client({
            accessToken,
            environment,
        });

        try {
            const catalogItem = await createCatalogItem(displayName, price, client, idekey, id);
            res.status(200).json({ catalogItem });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create catalog item' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};

export default handler;