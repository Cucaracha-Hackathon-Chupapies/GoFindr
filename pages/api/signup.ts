// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

    
    if (await prisma.account.count({
      where: {
        username: req.body.username
      }
    }) > 0){
      res.status(400).end()
    } else {
      prisma.account.create({
          data: {
            username: req.body.username,
            password: req.body.password
          }
      })
    }
    
  res.status(200).json({ name: 'John Doe' })
}
