const { PrismaClient, Role } = require("../src/generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log(`Memulai proses seeding...`);

  const hashedPassword = await bcrypt.hash("passwordkuatadmin", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
      namaLengkap: "Administrator",
      role: Role.ADMIN,
    },
  });

  const normalUser = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      username: "user",
      email: "user@example.com",
      password: await bcrypt.hash("passwordbiasa", 10),
      namaLengkap: "User Biasa",
      role: Role.USER,
    },
  });

  console.log(`Seeding selesai.`);
  console.log(`Akun Admin dibuat: ${adminUser.email}`);
  console.log(`Akun User dibuat: ${normalUser.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
