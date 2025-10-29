const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🔄 Starting Database Update - Removing Image Fields...\n");

// Check if .env file exists
const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
  console.log("❌ .env file not found!");
  console.log("📝 Please create .env file with DATABASE_URL");
  console.log(
    'Example: DATABASE_URL="postgresql://username:password@localhost:5432/system_sekolah"',
  );
  process.exit(1);
}

try {
  // Step 1: Generate new Prisma Client
  console.log("🔧 Step 1: Generating updated Prisma Client...");
  execSync("npx prisma generate", { stdio: "inherit" });
  console.log("✅ Prisma Client generated successfully!\n");

  // Step 2: Push updated schema to database
  console.log("📊 Step 2: Pushing updated schema to database...");
  console.log(
    "⚠️  This will remove gambar columns from sejarah, filosofi, and struktur_organisasi tables",
  );

  // Ask for confirmation
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Do you want to continue? This will remove image columns (y/N): ",
    (answer) => {
      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        try {
          execSync("npx prisma db push", { stdio: "inherit" });
          console.log("✅ Database schema updated successfully!\n");

          // Step 3: Optional - Re-seed data without images
          rl.question(
            "Do you want to re-seed the data? (y/N): ",
            (seedAnswer) => {
              if (
                seedAnswer.toLowerCase() === "y" ||
                seedAnswer.toLowerCase() === "yes"
              ) {
                console.log(
                  "🌱 Step 3: Re-seeding database with updated data...",
                );
                execSync("node src/lib/seed.js", { stdio: "inherit" });
                console.log("✅ Database re-seeded successfully!\n");
              }

              // Success message
              console.log("🎉 Database update completed successfully!");
              console.log("📋 Changes Made:");
              console.log("✅ Removed gambar field from sejarah table");
              console.log("✅ Removed gambar field from filosofi table");
              console.log(
                "✅ Removed gambar field from struktur_organisasi table",
              );
              console.log("✅ Updated Prisma Client");
              console.log("✅ Updated API routes");
              console.log("✅ Updated admin pages");

              console.log("\n📝 What was removed:");
              console.log("❌ Image upload functionality from Sejarah page");
              console.log("❌ Image upload functionality from Filosofi page");
              console.log(
                "❌ Image upload functionality from Struktur Organisasi page",
              );
              console.log("❌ Gambar fields from database tables");

              console.log("\n🌐 You can now run:");
              console.log("npm run dev - Start development server");
              console.log("npm run db:studio - Open Prisma Studio");

              rl.close();
            },
          );
        } catch (error) {
          console.error("\n❌ Database update failed!");
          console.error("Error:", error.message);
          rl.close();
          process.exit(1);
        }
      } else {
        console.log("Operation cancelled.");
        rl.close();
      }
    },
  );
} catch (error) {
  console.error("\n❌ Database update failed!");
  console.error("Error:", error.message);
  console.log("\n🔧 Troubleshooting:");
  console.log("1. Make sure PostgreSQL is running");
  console.log("2. Check your DATABASE_URL in .env file");
  console.log("3. Ensure database exists and is accessible");
  console.log("4. Backup your database before running updates");
  process.exit(1);
}
