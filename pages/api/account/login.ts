// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
    const user = await prisma.account.findUnique({
        where: {
            username: req.body.username
        }
    })

    if (user && user.password === req.body.password){
        res.status(200).json(user.id)
    } else {
        res.status(404).end()
    }  
}
