import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

interface ShopData {
  lat: number,
  lng: number,
  name: string,
  displayName: string,
  description: string,
  createTheme: boolean,
  sellerId: string,
  theme?: {
    backgroundImage: string,
    font: string,
    componentColor: string
  },
  themeId?: number
}

export const config = {
  api: {
    externalResolver: true
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  let data: ShopData = req.body;

  if (!data.lat || !data.lng || !data.name || !data.displayName || !data.description || !data.createTheme || !data.sellerId){
    res.status(400).end()
    return
  }

  if (data.createTheme && data.theme){
    prisma.theme.create({
      data: {
        backgroundImage: data.theme.backgroundImage,
        font: data.theme.font,
        componentColor: data.theme.componentColor
      }
    }).then((theme) => {
      prisma.store.create({
        data: {
          lat: data.lat,
          lng: data.lng,
          name: data.name,
          displayName: data.displayName,
          description: data.description,
          theme: {
            connect: {
              id: theme.id
            }
          },
        }
       })
  
       prisma.storeInfo.create({
        data: {
          name: data.name,
          displayName: data.displayName,
          description: data.description,
          rating: 0,
          theme: {
            connect: {
              id: theme.id
            }
          },
          Seller: {
            connect: {
              id: data.sellerId
            }
          }
        }
      })
    })

  } else {
    prisma.store.create({
      data: {
        lat: data.lat,
        lng: data.lng,
        name: data.name,
        displayName: data.displayName,
        description: data.description,
        theme: {
          connect: {
            id: data.themeId
          }
        }
      }
    })

    prisma.storeInfo.create({
      data: {
        name: data.name,
        displayName: data.displayName,
        description: data.description,
        rating: 0,
        theme: {
          connect: {
            id: data.themeId
          }
        },
        Seller: {
          connect: {
            id: data.sellerId
          }
        }
      }
    })

  }

  res.status(200).end()
}