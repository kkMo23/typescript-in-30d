import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const users = await Promise.all([
        prisma.user.create({
            data: {
                email: 'jane.doe@example.com',
                firstName: 'Jane',
                lastName: 'Doe',
                age: 28,
                gender: 'Female',
                salaryAmount: 55000,
                salaryCurrency: 'USD',
            },
        }),
        prisma.user.create({
            data: {
                email: 'alice.smith@example.com',
                firstName: 'Alice',
                lastName: 'Smith',
                age: 35,
                gender: 'Female',
                salaryAmount: 60000,
                salaryCurrency: 'USD',
            },
        }),
        prisma.user.create({
            data: {
                email: 'bob.jones@example.com',
                firstName: 'Bob',
                lastName: 'Jones',
                age: 40,
                gender: 'Male',
                salaryAmount: 70000,
                salaryCurrency: 'USD',
            },
        }),
        prisma.user.create({
            data: {
                email: 'charlie.brown@example.com',
                firstName: 'Charlie',
                lastName: 'Brown',
                age: 25,
                gender: 'Male',
                salaryAmount: 45000,
                salaryCurrency: 'USD',
            },
        }),
    ]);

    const tasks = await Promise.all([
        prisma.task.create({
            data: {
                title: 'Feed the chickens',
                assignedToId: users[0].id,
                status: 'TO_DO',
            },
        }),
        prisma.task.create({
            data: {
                title: 'Water the plants',
                assignedToId: users[1].id,
                status: 'IN_PROGRESS',
            },
        }),
        prisma.task.create({
            data: {
                title: 'Clean the barn',
                assignedToId: users[2].id,
                status: 'DONE',
            },
        }),
        prisma.task.create({
            data: {
                title: 'Sterilise the tools',
                assignedToId: users[3].id,
                status: 'TO_DO',
            },
        }),
    ]);

    console.log('Seeded the following data:', { users, tasks });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });