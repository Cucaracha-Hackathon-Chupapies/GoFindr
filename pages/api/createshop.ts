import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

interface ShopData {
  lat: number,
  lng: number,
  name: string,
  displayName: string,
  description: string,
  createTheme: boolean,
  theme?: {
    backgroundImage: string,
    font: string,
    componentColor: string
  },
  themeId?: string
}

export const config = {
  api: {
    externalResolver: true
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  let data: ShopData = req.body;

  if (!data.lat || !data.lng || !data.name || !data.displayName || !data.description){
    res.status(400).end()
    return
  }

  if (await prisma.store.count({
    where: {
      name: data.name
    }
  }) > 0){
    res.status(400).end()
  } else {

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
         }).then((res) => console.log(res))
    
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
            }
          }
        }).then((res) => console.log(res))

      })
    } else {
      if (!data.themeId) return res.status(400).end();

      prisma.store.create({
        data: {
          lat: data.lat,
          lng: data.lng,
          name: data.name,
          displayName: data.displayName,
          description: data.description,
          theme: {
            connect: {
              id: parseInt(data.themeId)
            }
          }
        }
      }).then((res) => console.log(res))
      .catch(() => res.status(400).end())
      
      prisma.storeInfo.create({
        data: {
          name: data.name,
          displayName: data.displayName,
          description: data.description,
          rating: 0,
          theme: {
            connect: {
              id: parseInt(data.themeId)
            }
          }
        }
      }).then((res) => console.log(res))
      .catch(() => res.status(400).end())
    }
  }
  res.status(200).end()
}