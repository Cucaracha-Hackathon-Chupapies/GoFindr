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
        displayName: 'Dairy Queen',
        name: 'mishkamushka',
        lat: 49.23908569087235,
        lng: -123.06502634908576,
        description: 'From tasty milkshakes to grilled burgers, Dairy Queen serves quality fresh food. It is not fast food it is fan food.',
        rating: 3.7,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Dairy_Queen_logo.svg/640px-Dairy_Queen_logo.svg.png',  
        theme: {
          connect: {
            id: 1
          }
        }
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
        displayName: 'Dairy Queen',
        name: 'mishkamushka',
        description: 'From tasty milkshakes to grilled burgers, Dairy Queen serves quality fresh food. It is not fast food it is fan food.',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Dairy_Queen_logo.svg/640px-Dairy_Queen_logo.svg.png',
        rating: 3.7,
        owner: {
          connect: {
            id: 'e9583445-6ddc-44ab-a453-26e68cbfe98f'
          }
        },        
        theme: {
          connect: {
            id: 1
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
        accountId: 'e9583445-6ddc-44ab-a453-26e68cbfe98f',
        comment: "wow it was incomprehensibly mid no cap on jiggidy dig dawg dawg."
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