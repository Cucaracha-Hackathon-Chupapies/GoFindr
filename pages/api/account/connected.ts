// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    connected: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if (!req.body.id) return res.status(400).end()
    const connected = await prisma.account.findUnique({
        where: {
            id: req.body.id
        }
    })

  res.status(200).json({ connected: connected?.connected || false })
}
