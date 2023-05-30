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

    const account = await prisma.account.findUnique({
        where: {
            id: req.body.id
        },
        select: {
            savedStores: true
        }
    })
    
    const storeData = await prisma.storeInfo.findUnique({
        where: {
            name: req.body.name
        }
    })
    
    if (account && account.savedStores && storeData){
        
        prisma.account.update({
            where: {
                id: req.body.id
            },
            data: {
                savedStores: {
                    update: [...account.savedStores, storeData]
                }
            }
        }).then(() => res.status(200).end())
        .catch((err) => {res.status(400).end(); console.log(err)})
               
    } else {
        res.status(404).end()
    }
    
      
}


export const config = {
    api: {
        externalResolver: true
      }
}