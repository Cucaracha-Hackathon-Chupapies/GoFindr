// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import { Store } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Store[]>
) {
    const savedShops = await prisma.account.findUnique({
        where: {
            id: req.body.id
        },
        include: {
            savedStores: true
        }
    })

    if (savedShops){
        res.status(200).json(savedShops.savedStores)
    } else {
        res.status(404).end()
    }
  
}
