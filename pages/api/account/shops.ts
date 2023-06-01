// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import { StoreInfo } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
    api: {
      externalResolver: true
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreInfo[]>
) {
    const myStores = await prisma.storeInfo.findMany({
        where: {
            ownerId: req.body.id
        }
    })

    if (myStores){
        res.status(200).json(myStores)  
    } else {
        res.status(404).end()
    }
}
