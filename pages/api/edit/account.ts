// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Props {
  id: string,
  username: string,
  password: string,
  icon: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data: Props = req.body
  const account = await prisma.account.update({
      where: {
        id: data.id
      },
      data: {
        username: data.username,
        password: data.password,
        icon: data.icon
      }
  })
  
  if (account){
    res.status(200).json(account)
  } else {
    res.status(400).end()
  }
}
