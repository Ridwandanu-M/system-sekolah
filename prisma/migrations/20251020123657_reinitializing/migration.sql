/*
  Warnings:

  - You are about to drop the column `alamat` on the `guru` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `guru` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `guru` table. All the data in the column will be lost.
  - You are about to drop the column `nip` on the `guru` table. All the data in the column will be lost.
  - You are about to drop the column `telepon` on the `guru` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `guru` table. All the data in the column will be lost.
  - You are about to drop the column `alamat` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `kelasId` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `nisn` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `telepon` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `siswa` table. All the data in the column will be lost.
  - You are about to drop the `absensi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kelas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mata_pelajaran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nilai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orang_tua` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pengampu_mapel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `semester` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tahun_ajaran` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `wali_kelas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nik]` on the table `guru` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `namaLengkap` to the `guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nik` to the `guru` table without a default value. This is not possible if the table is not empty.
  - Made the column `tempatLahir` on table `guru` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tanggalLahir` on table `guru` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `namaLengkap` to the `siswa` table without a default value. This is not possible if the table is not empty.
  - Made the column `tempatLahir` on table `siswa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tanggalLahir` on table `siswa` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "StatusPPDB" AS ENUM ('PENDING', 'DITERIMA', 'DITOLAK');

-- DropForeignKey
ALTER TABLE "public"."absensi" DROP CONSTRAINT "absensi_siswaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."admin" DROP CONSTRAINT "admin_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."guru" DROP CONSTRAINT "guru_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."nilai" DROP CONSTRAINT "nilai_mataPelajaranId_fkey";

-- DropForeignKey
ALTER TABLE "public"."nilai" DROP CONSTRAINT "nilai_semesterId_fkey";

-- DropForeignKey
ALTER TABLE "public"."nilai" DROP CONSTRAINT "nilai_siswaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."orang_tua" DROP CONSTRAINT "orang_tua_siswaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."orang_tua" DROP CONSTRAINT "orang_tua_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."pengampu_mapel" DROP CONSTRAINT "pengampu_mapel_guruId_fkey";

-- DropForeignKey
ALTER TABLE "public"."pengampu_mapel" DROP CONSTRAINT "pengampu_mapel_kelasId_fkey";

-- DropForeignKey
ALTER TABLE "public"."pengampu_mapel" DROP CONSTRAINT "pengampu_mapel_mataPelajaranId_fkey";

-- DropForeignKey
ALTER TABLE "public"."semester" DROP CONSTRAINT "semester_tahunAjaranId_fkey";

-- DropForeignKey
ALTER TABLE "public"."siswa" DROP CONSTRAINT "siswa_kelasId_fkey";

-- DropForeignKey
ALTER TABLE "public"."siswa" DROP CONSTRAINT "siswa_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."wali_kelas" DROP CONSTRAINT "wali_kelas_guruId_fkey";

-- DropForeignKey
ALTER TABLE "public"."wali_kelas" DROP CONSTRAINT "wali_kelas_kelasId_fkey";

-- DropIndex
DROP INDEX "public"."guru_nip_key";

-- DropIndex
DROP INDEX "public"."guru_userId_key";

-- DropIndex
DROP INDEX "public"."siswa_nisn_key";

-- DropIndex
DROP INDEX "public"."siswa_userId_key";

-- AlterTable
ALTER TABLE "guru" DROP COLUMN "alamat",
DROP COLUMN "foto",
DROP COLUMN "nama",
DROP COLUMN "nip",
DROP COLUMN "telepon",
DROP COLUMN "userId",
ADD COLUMN     "namaLengkap" TEXT NOT NULL,
ADD COLUMN     "nik" TEXT NOT NULL,
ALTER COLUMN "tempatLahir" SET NOT NULL,
ALTER COLUMN "tanggalLahir" SET NOT NULL;

-- AlterTable
ALTER TABLE "siswa" DROP COLUMN "alamat",
DROP COLUMN "foto",
DROP COLUMN "kelasId",
DROP COLUMN "nama",
DROP COLUMN "nisn",
DROP COLUMN "telepon",
DROP COLUMN "userId",
ADD COLUMN     "namaLengkap" TEXT NOT NULL,
ALTER COLUMN "tempatLahir" SET NOT NULL,
ALTER COLUMN "tanggalLahir" SET NOT NULL;

-- DropTable
DROP TABLE "public"."absensi";

-- DropTable
DROP TABLE "public"."admin";

-- DropTable
DROP TABLE "public"."kelas";

-- DropTable
DROP TABLE "public"."mata_pelajaran";

-- DropTable
DROP TABLE "public"."nilai";

-- DropTable
DROP TABLE "public"."orang_tua";

-- DropTable
DROP TABLE "public"."pengampu_mapel";

-- DropTable
DROP TABLE "public"."semester";

-- DropTable
DROP TABLE "public"."tahun_ajaran";

-- DropTable
DROP TABLE "public"."users";

-- DropTable
DROP TABLE "public"."wali_kelas";

-- DropEnum
DROP TYPE "public"."JenisSemester";

-- DropEnum
DROP TYPE "public"."StatusAbsensi";

-- DropEnum
DROP TYPE "public"."UserRole";

-- CreateTable
CREATE TABLE "sambutan_kepala_sekolah" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sambutan_kepala_sekolah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visi_misi" (
    "id" TEXT NOT NULL,
    "visi" TEXT NOT NULL,
    "misi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "visi_misi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sejarah" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sejarah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filosofi" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filosofi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "struktur_organisasi" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "gambar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "struktur_organisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fasilitas" (
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "ringkasan" TEXT,
    "gambar" TEXT,
    "penulis" TEXT NOT NULL,
    "tanggalPost" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengumuman" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "konten" TEXT NOT NULL,
    "gambar" TEXT,
    "penting" BOOLEAN NOT NULL DEFAULT false,
    "tanggalPost" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galeri" (
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
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
CREATE UNIQUE INDEX "guru_nik_key" ON "guru"("nik");
