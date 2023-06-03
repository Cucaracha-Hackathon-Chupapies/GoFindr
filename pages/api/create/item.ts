// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import { Item } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

interface Props {
    id: string,    
    itemName: string,
    price: string,
    description: string,
    image: string,
    featured: boolean,
    popular: boolean,
    storeName: string
}

export const config = {
    api: {
      externalResolver: true
    }
  }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item>
) {
  
    let data: Props = req.body        

    if (!data.itemName || !data.price  || !data.storeName){
        return res.status(400).end()
    }

    const validateUser = await prisma.storeInfo.findUnique({
        where: {
            name: data.storeName
        }
    })

    if (validateUser?.ownerId !== data.id){
        return res.status(401).end()
    }
    
    const item = await prisma.item.create({
        data: {
            name: data.itemName.toLowerCase().replaceAll(' ', '-'),
            displayName: data.itemName,
            price: data.price,
            description: data.description || "",
            rating: 0,
            image: data.image || "https://bandlabimages.azureedge.net/v1.0/users/297fa3f6-f06c-459e-ba5f-c297b6790fee/260x260",
            featured: data.featured ? data.featured : false,
            popular: data.popular ? data.popular : false,
            store: {
                connect: {
                    name: data.storeName
                }
            }
        }
    })

    if (item){
        const update = await prisma.storeInfo.update({
            where: {
                name: data.storeName
            },
            data: {
                items: {
                    connect: {
                        id: item.id
                    }
                }
            }
        })

        if (update){
            return res.status(200).json(item)
        }

    }

    res.status(400).end()
  
}
