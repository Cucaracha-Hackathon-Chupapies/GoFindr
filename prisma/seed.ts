import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const mishkamushka = await prisma.store.upsert({
      where: { name: 'mishkamushka' },
      update: {},
      create: {
        displayName: 'Mishka Mushka',
        name: 'mishkamushka',
        lat: 49.2378333,
        lng: -123.0411864,
        description: 'poopie poopie :)'
      },
    })
    const mishkamushka_storeinfo = await prisma.storeInfo.upsert({
      where: { name: 'mishkamushka' },
      update: {},
      create: {
        displayName: 'Mishka Mushka',
        name: 'mishkamushka',
        description: 'poopie poopie :)',
        rating: 3.9,
        items: {
          create: [
            {
              name: 'corn-kakikage',
              displayName: 'Corn Kakikage',
              rating: 3.9,
              price: '$8.99',
              description: 'yummy!',
              featured: true,
              popular: true
            },
            {
              name: 'tako-wasabi',
              displayName: 'Tako Wasabi',
              rating: 4.2,
              price: '$5.39',
              description: 'yummy!',
              featured: true,
              popular: true
            },
            {
              name: 'chicken-karaage',
              displayName: 'Chicken Karaage',
              rating: 4.8,
              price: '$7.89',
              description: 'yummy!',
              featured: true,
              popular: true
            },
            {
              name: 'fatty-short-ribs',
              displayName: 'Fatty Short Ribs',
              rating: 5.0,
              price: '$18.99',
              description: 'yummy!',
              featured: true,
              popular: true
            }
          ],
        },
      },
    })

  }
  main()
    .then(async () => {
      await prisma.$disconnect()
    })
    .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
    })