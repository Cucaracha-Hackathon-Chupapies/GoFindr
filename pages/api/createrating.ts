// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Props {
    id: string,
    storeName?: string,
    itemId?: number,
    rating: number,
    comment?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    let data: Props = req.body

    if (!data.itemId && !data.storeName) return res.status(400).end()

    if (!data.rating) return res.status(400).end()

    if (data.storeName){
        
        if (await prisma.storeRating.count({
            where: {
                storeId: data.storeName,
                accountId: data.id
            }
        }) > 0){
            return res.status(401).end()
        }

        if (await prisma.account.findUnique({
            where: {
                id: data.id
            }
        })){
            return res.status(400).end()
        }

        const rating = await prisma.storeRating.create({
            data: {
                store: {
                    connect: {
                        name: data.storeName
                    }
                },
                rating: data.rating,
                accountId: data.id,
                comment: data.comment ? data.comment : ""
            }
        })          

        if (rating){
            //update rating of store

            const newRating = await prisma.storeRating.aggregate({
                where: {
                    storeId: data.storeName
                },
                _avg: {
                    rating: true
                }
            })                
    
            
            if (newRating._avg.rating){
                const update = await prisma.storeInfo.update({
                    where: {
                        name: data.storeName
                    },
                    data: {
                        rating: newRating._avg.rating
                    }
                })

                if (update) {
                    return res.status(200).json(rating)
                }

            }
        }


        return res.status(400).end()
    }  
}
