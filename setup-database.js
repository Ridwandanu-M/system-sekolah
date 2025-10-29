const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Database Setup for System Sekolah...\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('📝 Please create .env file with DATABASE_URL');
  console.log('Example: DATABASE_URL="postgresql://username:password@localhost:5432/system_sekolah"');
  process.exit(1);
}

try {
  // Step 1: Generate Prisma Client
  console.log('🔧 Step 1: Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma Client generated successfully!\n');

  // Step 2: Push Schema to Database
  console.log('📊 Step 2: Pushing schema to database...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
  console.log('✅ Database schema pushed successfully!\n');

  // Step 3: Seed Database
  console.log('🌱 Step 3: Seeding database with initial data...');
  execSync('node src/lib/seed.js', { stdio: 'inherit' });
  console.log('✅ Database seeded successfully!\n');

  // Success message
  console.log('🎉 Database setup completed successfully!');
  console.log('\n📋 Summary:');
  console.log('✅ Prisma Client generated');
  console.log('✅ Database schema created');
  console.log('✅ Initial data seeded');
  console.log('\n🔐 Default Admin Account:');
  console.log('📧 Email: admin@smpmuh1seyegan.sch.id');
  console.log('🔑 Password: admin123');
  console.log('\n🌐 You can now run:');
  console.log('npm run dev - Start development server');
  console.log('npm run db:studio - Open Prisma Studio');

} catch (error) {
  console.error('\n❌ Database setup failed!');
  console.error('Error:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Make sure PostgreSQL is running');
  console.log('2. Check your DATABASE_URL in .env file');
  console.log('3. Ensure database exists and is accessible');
  console.log('4. Run: npm install - to install dependencies');
  process.exit(1);
}
