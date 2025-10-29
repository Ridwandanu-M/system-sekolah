# Quick Start - Database Integration

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- Git

## 1. Setup Database

Create a PostgreSQL database:
```sql
CREATE DATABASE system_sekolah;
```

## 2. Environment Configuration

Create `.env` file in project root:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/system_sekolah"
```

Replace `username`, `password`, and connection details with your PostgreSQL credentials.

## 3. Install Dependencies

```bash
npm install
```

## 4. Setup Database (One Command)

```bash
npm run setup-db
```

This will:
- Generate Prisma Client
- Create database tables
- Seed initial data

## 5. Start Development Server

```bash
npm run dev
```

## 6. Access Admin Panel

Open browser and go to:
```
http://localhost:3000/admin/tentang-sekolah/sambutan
```

**Default Admin Login:**
- Email: `admin@smpmuh1seyegan.sch.id`
- Password: `admin123`

## Available Admin Pages

- `/admin/tentang-sekolah/sambutan` - Kelola sambutan kepala sekolah
- `/admin/tentang-sekolah/visi-misi` - Kelola visi misi sekolah
- `/admin/tentang-sekolah/sejarah` - Kelola sejarah sekolah
- `/admin/tentang-sekolah/filosofi` - Kelola filosofi sekolah
- `/admin/tentang-sekolah/struktur` - Kelola struktur organisasi
- `/admin/tentang-sekolah/fasilitas` - Kelola fasilitas sekolah

## Features

✅ **Database Integration** - PostgreSQL with Prisma ORM
✅ **CRUD Operations** - Create, Read, Update, Delete
✅ **Real-time Preview** - Live preview before saving
✅ **Clean Interface** - Focused content management without distractions
✅ **Form Validation** - Client and server-side validation
✅ **Loading States** - User-friendly loading indicators
✅ **Error Handling** - Comprehensive error messages

## Database Management

```bash
# View database in browser
npm run db:studio

# Reset database (careful!)
npm run db:reset

# Generate Prisma client after schema changes
npm run db:generate

# Push schema changes to database
npm run db:push
```

## Troubleshooting

### Database Connection Error
1. Check PostgreSQL is running
2. Verify DATABASE_URL in `.env`
3. Ensure database exists

### Prisma Client Error
```bash
npm run db:generate
```

### Migration Issues
```bash
npm run db:reset
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

## Need Help?

Check the full documentation in `DATABASE_INTEGRATION.md` for detailed API documentation and advanced configuration.