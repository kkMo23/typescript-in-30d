import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'john.doe@example.com',
            firstName: 'John',
            lastName: 'Doe',
            age: 30,
            gender: 'Male',
            salaryAmount: 50000,
            salaryCurrency: 'USD',
        },
        });

        const task = await prisma.task.create({
        data: {
            title: 'Feed the chickens',
            assignedToId: user.id,
            status: 'TO_DO',
        },
        });

      console.log('Seeded the following data:', { user, task });
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