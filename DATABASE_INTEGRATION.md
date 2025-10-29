# Integrasi Database - Sistem Sekolah

## Overview

Dokumentasi ini menjelaskan integrasi database untuk sistem sekolah SMP Muhammadiyah 1 Seyegan, khususnya untuk halaman-halaman "Tentang Sekolah".

## Struktur Database

### Models yang Terintegrasi

1. **SambutanKepalaSekolah** - Menyimpan data sambutan kepala sekolah
2. **VisiMisi** - Menyimpan visi dan misi sekolah
3. **Sejarah** - Menyimpan sejarah sekolah
4. **Filosofi** - Menyimpan filosofi pendidikan sekolah
5. **StrukturOrganisasi** - Menyimpan struktur organisasi sekolah
6. **Fasilitas** - Menyimpan data fasilitas sekolah

### Schema Database

```prisma
model SambutanKepalaSekolah {
  id        Int      @id @default(autoincrement())
  judul     String
  konten    String   @db.Text
  gambar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model VisiMisi {
  id        Int      @id @default(autoincrement())
  visi      String   @db.Text
  misi      String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Sejarah {
  id        Int      @id @default(autoincrement())
  judul     String
  konten    String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Filosofi {
  id        Int      @id @default(autoincrement())
  judul     String
  konten    String   @db.Text
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model StrukturOrganisasi {
  id        Int      @id @default(autoincrement())
  judul     String
  deskripsi String?  @db.Text
  struktur  Json?    // JSON field to store structure data
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Fasilitas {
  id        Int      @id @default(autoincrement())
  nama      String
  deskripsi String   @db.Text
  gambar    String?
  aktif     Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## API Endpoints

### 1. Sambutan Kepala Sekolah
- **GET** `/api/tentang-sekolah/sambutan` - Ambil data sambutan
- **POST** `/api/tentang-sekolah/sambutan` - Buat/update sambutan
- **PUT** `/api/tentang-sekolah/sambutan` - Update sambutan
- **DELETE** `/api/tentang-sekolah/sambutan?id={id}` - Hapus sambutan

### 2. Visi Misi
- **GET** `/api/tentang-sekolah/visi-misi` - Ambil data visi misi
- **POST** `/api/tentang-sekolah/visi-misi` - Buat/update visi misi
- **PUT** `/api/tentang-sekolah/visi-misi` - Update visi misi
- **DELETE** `/api/tentang-sekolah/visi-misi?id={id}` - Hapus visi misi

### 3. Sejarah
- **GET** `/api/tentang-sekolah/sejarah` - Ambil data sejarah
- **POST** `/api/tentang-sekolah/sejarah` - Buat/update sejarah
- **PUT** `/api/tentang-sekolah/sejarah` - Update sejarah
- **DELETE** `/api/tentang-sekolah/sejarah?id={id}` - Hapus sejarah

### 4. Filosofi
- **GET** `/api/tentang-sekolah/filosofi` - Ambil data filosofi
- **POST** `/api/tentang-sekolah/filosofi` - Buat/update filosofi
- **PUT** `/api/tentang-sekolah/filosofi` - Update filosofi
- **DELETE** `/api/tentang-sekolah/filosofi?id={id}` - Hapus filosofi

### 5. Struktur Organisasi
- **GET** `/api/tentang-sekolah/struktur` - Ambil data struktur
- **POST** `/api/tentang-sekolah/struktur` - Buat/update struktur
- **PUT** `/api/tentang-sekolah/struktur` - Update struktur
- **DELETE** `/api/tentang-sekolah/struktur?id={id}` - Hapus struktur

### 6. Fasilitas
- **GET** `/api/tentang-sekolah/fasilitas` - Ambil semua fasilitas
- **POST** `/api/tentang-sekolah/fasilitas` - Buat fasilitas baru
- **PUT** `/api/tentang-sekolah/fasilitas` - Update fasilitas
- **DELETE** `/api/tentang-sekolah/fasilitas?id={id}` - Hapus fasilitas (soft delete)

## Setup Database

### 1. Instalasi Dependencies

```bash
npm install @prisma/client prisma bcryptjs
```

### 2. Generate Prisma Client

```bash
npm run db:generate
```

### 3. Push Schema ke Database

```bash
npm run db:push
```

### 4. Seed Data Awal

```bash
npm run db:seed
```

### 5. Reset Database (Optional)

```bash
npm run db:reset
```

## Konfigurasi Environment

Pastikan file `.env` memiliki konfigurasi database:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/system_sekolah"
```

## Fitur Terintegrasi

### 1. Halaman Admin
- **Loading States** - Menampilkan loading saat fetch data
- **Form Validation** - Validasi input sebelum menyimpan
- **Error Handling** - Penanganan error dengan pesan yang jelas
- **Real-time Preview** - Preview konten sebelum menyimpan
- **Auto-save** - Otomatis menyimpan perubahan

### 2. CRUD Operations
- **Create** - Membuat data baru
- **Read** - Membaca data dari database
- **Update** - Memperbarui data existing
- **Delete** - Menghapus data (soft delete untuk fasilitas)

### 3. Data Management
- **Single Record** - Sambutan, Visi Misi, Sejarah, Filosofi, Struktur (hanya 1 record)
- **Multiple Records** - Fasilitas (multiple records)
- **JSON Storage** - Struktur organisasi menggunakan JSON field
- **Image Support** - Mendukung URL gambar

## Halaman yang Terintegrasi

### 1. `/admin/tentang-sekolah/sambutan`
- Form edit sambutan kepala sekolah
- Upload gambar kepala sekolah
- Rich text editor untuk konten

### 2. `/admin/tentang-sekolah/visi-misi`
- Form edit visi sekolah
- Form edit misi sekolah
- Textarea dengan format yang preserved

### 3. `/admin/tentang-sekolah/sejarah`
- Form edit sejarah sekolah
- Text area untuk konten sejarah

### 4. `/admin/tentang-sekolah/filosofi`
- Form edit filosofi pendidikan
- Text area untuk konten filosofi

### 5. `/admin/tentang-sekolah/struktur`
- Form edit struktur organisasi
- Dynamic form untuk menambah/hapus posisi
- JSON storage untuk data struktur
- Visual hierarchy dengan color-coded levels

### 6. `/admin/tentang-sekolah/fasilitas`
- CRUD fasilitas sekolah
- Kategori fasilitas
- Upload gambar fasilitas
- Soft delete untuk fasilitas

## User Default

### Admin Default
- **Email**: `admin@smpmuh1seyegan.sch.id`
- **Password**: `admin123`
- **Role**: `SUPER_ADMIN`

## Best Practices

### 1. Error Handling
- Selalu gunakan try-catch untuk operasi database
- Berikan pesan error yang jelas kepada user
- Log error ke console untuk debugging

### 2. Data Validation
- Validasi input di frontend dan backend
- Gunakan Prisma validation untuk tipe data
- Sanitize input untuk mencegah XSS

### 3. Performance
- Gunakan Prisma connection pooling
- Implement caching jika diperlukan
- Optimize database queries

### 4. Security
- Hash password menggunakan bcryptjs
- Validasi user authentication untuk API
- Implement role-based access control

## Troubleshooting

### Common Issues

1. **Prisma Client Error**
   ```bash
   npm run db:generate
   ```

2. **Database Connection Error**
   - Periksa DATABASE_URL di .env
   - Pastikan PostgreSQL berjalan

3. **Migration Error**
   ```bash
   npm run db:reset
   ```

4. **Seeding Error**
   - Periksa data seeder di `src/lib/seed.js`
   - Pastikan tidak ada konflik unique constraint

## Development Workflow

1. **Ubah Schema**
   ```bash
   # Edit prisma/schema.prisma
   npm run db:push
   npm run db:generate
   ```

2. **Update API**
   ```bash
   # Edit API routes di src/app/api/
   # Test dengan Postman atau frontend
   ```

3. **Update Frontend**
   ```bash
   # Edit halaman admin di src/app/(admin)/
   # Test form dan integrasi API
   ```

4. **Test & Deploy**
   ```bash
   npm run build
   npm run start
   ```

## Monitoring

### Database Studio
```bash
npm run db:studio
```

### Logs
- Check browser console untuk frontend errors
- Check terminal untuk backend errors
- Monitor database connections

---

**Note**: Pastikan selalu backup database sebelum melakukan perubahan schema atau migrasi.