// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import { Account } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const account = await prisma.account.findUnique({
        where: {
            id: req.body.id
        },
        select: {
            id: true,
            createdAt: true,
            username: true,
            icon: true
        }
    })

    if (account){
        res.status(200).json(account)
    } else {
        res.status(400).end()
    }
}
