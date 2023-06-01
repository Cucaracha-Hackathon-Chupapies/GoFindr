import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next'

interface ShopData {
  lat: number,
  lng: number,  
  name: string,
  displayName: string,
  description: string,
  createTheme: boolean,
  ownerId: string,
  theme?: {
    backgroundImage: string,
    font: string,
    componentColor: string
  },
  themeId?: string,
  icon?: string
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

  if (!data.lat || !data.lng || !data.displayName || !data.description || !data.ownerId){
    res.status(400).end()
    return
  }

  data.name =  data.displayName.toLowerCase().replaceAll(' ', '-')

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
            ...(data.icon ? {icon: data.icon} : {}),
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
            ...(data.icon ? {icon: data.icon} : {}),
            owner: {
              connect: {
                id: data.ownerId
              }
            },
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
          ...(data.icon ? {icon: data.icon} : {}),
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
          ...(data.icon ? {icon: data.icon} : {}),
          owner: {
            connect: {
              id: data.ownerId
            }
          },
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