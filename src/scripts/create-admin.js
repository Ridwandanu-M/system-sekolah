import { hashPassword } from "@/lib/hash";
import prisma from "@/lib/prisma";

async function createAdmin() {
  try {
    const adminData = {
      name: "Admin",
      email: "admin@sekolah.com",
      password: "admin123",
    };

    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminData.email },
    });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

    const hashedPassword = await hashPassword(adminData.password);

    const admin = await prisma.user.create({
      data: {
        name: adminData.name,
        email: adminData.email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("Admin user created successfully:");
    console.log("Email:", admin.email);
    console.log("Password:", adminData.password);
    console.log("Please change the default password after first login!");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
createAdmin();
