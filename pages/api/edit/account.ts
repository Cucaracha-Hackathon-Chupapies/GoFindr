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
  const isExisting = await prisma.account.count({
    where: {
      username: data.username
    }
  })

  const originalUsername = await prisma.account.findUnique({
    where: {
      id: data.id
    }
  })

  if (isExisting > 0 && originalUsername?.username !== data.username){
    return res.status(400).json("user already exists")
  }
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
