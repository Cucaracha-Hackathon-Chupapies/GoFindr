// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import { StoreInfo } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreInfo>
) {
    let data = await prisma.storeInfo.findUnique({
        where: {
            name: req.body.name
        },
        include: {
            items: true
        }
    })

    if (data){
        res.status(200).json(data)
    } else {
        res.status(404).end()
    }
}
