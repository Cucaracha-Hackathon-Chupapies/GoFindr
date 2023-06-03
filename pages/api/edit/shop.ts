// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'


interface Props {
    id: string,
    name: string,        
    displayName: string,
    description: string,
    createTheme: boolean,    
    theme?: {
      backgroundImage: string,
      font: string,
      componentColor: string
    },
    themeId?: string,
    icon: string,    
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
    let data: Props = req.body        
    

    const validateUser = await prisma.storeInfo.findUnique({
        where: {
            name: data.name
        }
    })

    if (!validateUser){
        return res.status(404).end()
    }

    if (validateUser?.ownerId !== data.id){
        return res.status(401).end()
    }
    
    if (!data.id || !data.name  || !data.displayName || !data.description || !data.icon){
        return res.status(400).end()
    }

    if (data.createTheme && data.theme){
        let theme = await prisma.theme.create({
            data: {
                backgroundImage: data.theme.backgroundImage,
                font: data.theme.font,
                componentColor: data.theme.componentColor
            }
        })

        const update = await prisma.store.update({
            where: {
                name: data.name
            },
            data: {                
                description: data.description,
                theme: {
                    connect: {
                        id: theme.id
                    }
                }
            }
        })

        const updateInfo = await prisma.storeInfo.update({
            where: {
                name: data.name
            },
            data: {
                description: data.description,
                theme: {
                    connect: {
                        id: theme.id
                    }
                },
                icon: data.icon              
            }
        })

        if (update && updateInfo){
            res.status(200).end()
        }

    } else {
        const isExisting = await prisma.theme.count({
            where: {
                id: parseInt(data.themeId || "")
            }
        })

        if (isExisting === 0) return res.status(404).end()
        const update = await prisma.store.update({
            where: {
                name: data.name
            },
            data: {                
                description: data.description,
                theme: {
                    connect: {
                        id: parseInt(data.themeId || "")
                    }
                }
            }
        })

        const updateInfo = await prisma.storeInfo.update({
            where: {
                name: data.name
            },
            data: {
                description: data.description,
                theme: {
                    connect: {
                        id: parseInt(data.themeId || "")
                    }
                },
                icon: data.icon              
            }
        })

        if (update && updateInfo){
            res.status(200).end()
        }
    }

    res.status(400).end()
}
