// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import { StoreRating } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
    api: {
      externalResolver: true
    }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreRating[]>
) {
    const ratings = await prisma.storeRating.findMany({
        where: {
            storeId: req.body.storeName
        },
        orderBy: {
            rating: req.body.sortBy || "desc"
        }
    })

    if (req.body.sortBy && !(req.body.sortBy === 'asc' || req.body.sortBy === 'desc')) return res.status(400).end()

    if (ratings){
        res.status(200).json(ratings)
    } else {
        res.status(400).end()
    }
  
}
