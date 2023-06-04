// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import { StoreInfo } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

interface StoreData extends StoreInfo {
    rated: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreData>
) {

    if (!req.body.name) return res.status(400).end()

    let data = await prisma.storeInfo.findUnique({
        where: {
            name: req.body.name            
        },
        include: {
            items: true,
            ratings: true,
            theme: true
        }        
        
    })

    const isRated = req.body.id ? (await prisma.storeRating.count({where: {accountId: req.body.id, storeId: req.body.name}})) > 0 : false

    if (data){
        res.status(200).json({...data, rated: isRated})
    } else {
        res.status(404).end()
    }
}
