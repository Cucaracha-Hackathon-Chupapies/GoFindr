// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (!req.body.id || !req.body.storeName || !req.body.itemId){
    return res.status(400).end()
  }

  const hasAccess = await prisma.storeInfo.count({
    where: {
      ownerId: req.body.id,
      name: req.body.storeName
    }
  })

  if (hasAccess > 0){
    const deleteItem = await prisma.item.deleteMany({
      where: {
        id: req.body.itemId,
        storeName: req.body.storeName        
      }
    })

    if (deleteItem){
      res.status(200).json(deleteItem)
    } else {
      res.status(400).end()
    }
  } else {
    res.status(401).end()
  }

    

}
