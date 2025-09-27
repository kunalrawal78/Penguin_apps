import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
 
  await prisma.note.deleteMany();
  await prisma.user.deleteMany();


  const hashedPassword = await bcrypt.hash("pass123", 10);

 
  const users = await Promise.all([
    prisma.user.create({ data: { username: "Alice", password: hashedPassword } }),
    prisma.user.create({ data: { username: "Bob", password: hashedPassword } }),
    prisma.user.create({ data: { username: "Charlie", password: hashedPassword } }),
    prisma.user.create({ data: { username: "David", password: hashedPassword } }),
    prisma.user.create({ data: { username: "Eve", password: hashedPassword } }),
  ]);


  for (const user of users) {
    const notes = [];
    for (let i = 1; i <= 12; i++) {
      notes.push({
        title: `${user.username} Note ${i}`,
        content: `Content of ${user.username} note ${i}`,
        userId: user.id, 
      });
    }
    await prisma.note.createMany({ data: notes });
  }

  console.log("✅ Seeding finished.....");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
