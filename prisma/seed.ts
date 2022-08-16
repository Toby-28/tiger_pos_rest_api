import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const brands: Prisma.BrandsCreateManyInput[] = [
  { id_: 0, code: 'noname', name: 'No Name' },
];

async function main() {
  // await prisma.brands.createMany({ data: brands });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
  });
