import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: await bcrypt.hash('password123', 10)
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      password: await bcrypt.hash('password123', 10)
    }
  });

  // Create links
  const link1 = await prisma.link.create({
    data: {
      url: 'https://www.prisma.io',
      description: 'Prisma - Next-generation ORM for Node.js & TypeScript',
      postedBy: {
        connect: { id: user1.id }
      }
    }
  });

  const link2 = await prisma.link.create({
    data: {
      url: 'https://www.graphql.org',
      description: 'GraphQL - A query language for your API',
      postedBy: {
        connect: { id: user2.id }
      }
    }
  });

  // Add some votes
  await prisma.link.update({
    where: { id: link1.id },
    data: {
      voters: {
        connect: { id: user2.id }
      }
    }
  });

  await prisma.link.update({
    where: { id: link2.id },
    data: {
      voters: {
        connect: { id: user1.id }
      }
    }
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 