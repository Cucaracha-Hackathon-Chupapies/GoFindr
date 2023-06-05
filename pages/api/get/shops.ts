// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/lib/prisma';
import { Store } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

let LAT_DISTANCE_CONSTANT = 0.00899280575; //1km
let LNG_DISTANCE_CONSTANT = 0.01038421599; //1km

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Store[]>
) {


    let distance = (req.body.distance ? req.body.distance/1000 : 100); //in km
    
    let latdistance = LAT_DISTANCE_CONSTANT*distance;
    let lngdistance = LNG_DISTANCE_CONSTANT*distance;
    
    let data = await prisma.store.findMany({
        where: {
            lat: {
              lte: req.body.lat+latdistance,
              gte: req.body.lat-latdistance
            },
            lng: {
              lte: req.body.lng+lngdistance,
              gte: req.body.lng-lngdistance
            }
        },
        include: {
          theme: true
        }
    })
  res.status(200).json(data)
}
