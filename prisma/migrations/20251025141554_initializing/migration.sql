-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "StatusPPDB" AS ENUM ('PENDING', 'DITERIMA', 'DITOLAK');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "aktif" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "siswa" (
    "id" SERIAL NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "image" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "guru" (
    "id" SERIAL NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "image" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "guru_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sambutan_kepala_sekolah" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sambutan_kepala_sekolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visi_misi" (
    "id" SERIAL NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visi_misi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sejarah" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sejarah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filosofi" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filosofi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "struktur_organisasi" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "struktur_organisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fasilitas" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fasilitas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ekstrakurikuler" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT,
    "pembimbing" TEXT,
    "jadwal" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ekstrakurikuler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outing_class" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL,
    "gambar" TEXT,
    "peserta" TEXT,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "outing_class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "berita" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "ringkasan" TEXT,
    "gambar" TEXT,
    "penulis" TEXT NOT NULL,
    "tanggalPost" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "penting" BOOLEAN NOT NULL DEFAULT false,
    "tanggalPost" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeri" (
    "id" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "gambar" TEXT NOT NULL,
    "kategori" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "galeri_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ppdb" (
    "id" SERIAL NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "alamat" TEXT NOT NULL,
    "noTelepon" TEXT NOT NULL,
    "email" TEXT,
    "namaOrangTua" TEXT NOT NULL,
    "pekerjaanOrangTua" TEXT NOT NULL,
    "asalSekolah" TEXT NOT NULL,
    "nilaiRapor" DOUBLE PRECISION,
    "berkasPendukung" TEXT,
    "status" "StatusPPDB" NOT NULL DEFAULT 'PENDING',
    "catatan" TEXT,
    "tanggalDaftar" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ppdb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kontak" (
    "id" SERIAL NOT NULL,
    "alamat" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "youtube" TEXT,
    "jamBuka" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kontak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengaturan" (
    "id" SERIAL NOT NULL,
    "namaSekolah" TEXT NOT NULL,
    "logoSekolah" TEXT,
    "favicon" TEXT,
    "deskripsiSekolah" TEXT,
    "metaKeywords" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengaturan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "siswa_nis_key" ON "siswa"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "guru_nik_key" ON "guru"("nik");
