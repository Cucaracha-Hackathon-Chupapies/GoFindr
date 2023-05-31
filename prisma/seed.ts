import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {

    
    await prisma.theme.upsert({
      where: { id: 1 },
      update: {},
      create: {
        font: 'Poppins',
        backgroundImage: 'https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        componentColor: '#1d9aef'
      }
    })

    await prisma.store.upsert({
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

    await prisma.account.upsert({
      where: {username: 'chubkey'},
      update: {},
      create: {
        id: 'e9583445-6ddc-44ab-a453-26e68cbfe98f',
        username: 'chubkey',
        password: '123',

      }
    })
    await prisma.storeInfo.upsert({
      where: { name: 'mishkamushka' },
      update: {},
      create: {
        displayName: 'Mishka Mushka',
        name: 'mishkamushka',
        description: 'Japanese izakaya with splashy decor & a sake-bottle chandelier, serving creative, intricate plates...',
        rating: 3.9,
        owner: {
          connect: {
            id: 'e9583445-6ddc-44ab-a453-26e68cbfe98f'
          }
        },        
        items: {
          create: [
            {
              name: 'corn-kakikage',
              displayName: 'Corn Kakikage',
              rating: 3.9,
              price: '$8.99',
              description: 'yummy!',
              featured: true,
              popular: true,
              image: "https://bandlabimages.azureedge.net/v1.0/users/297fa3f6-f06c-459e-ba5f-c297b6790fee/260x260"
            },
            {
              name: 'tako-wasabi',
              displayName: 'Tako Wasabi',
              rating: 4.2,
              price: '$5.39',
              description: 'yummy!',
              featured: true,
              popular: true,
              image: "https://bandlabimages.azureedge.net/v1.0/users/297fa3f6-f06c-459e-ba5f-c297b6790fee/260x260"
            },
            {
              name: 'chicken-karaage',
              displayName: 'Chicken Karaage',
              rating: 4.8,
              price: '$7.89',
              description: 'yummy!',
              featured: true,
              popular: true,
              image: "https://bandlabimages.azureedge.net/v1.0/users/297fa3f6-f06c-459e-ba5f-c297b6790fee/260x260"
            },
            {
              name: 'fatty-short-ribs',
              displayName: 'Fatty Short Ribs',
              rating: 5.0,
              price: '$18.99',
              description: 'yummy!',
              featured: true,
              popular: true,
              image: "https://bandlabimages.azureedge.net/v1.0/users/297fa3f6-f06c-459e-ba5f-c297b6790fee/260x260"
            }
          ],
        },
      },
    })

    await prisma.storeRating.upsert({
      where: {id: 1},
      update: {},
      create: {
        store: {
          connect: {
            name: 'mishkamushka'
          }
        },
        rating: 3,
        accountId: 'e9583445-6ddc-44ab-a453-26e68cbfe98f'
      }
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