/*
  Warnings:

  - The primary key for the `account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `account` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `berita` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `berita` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdBy` column on the `berita` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ekstrakurikuler` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ekstrakurikuler` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `fasilitas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `fasilitas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `filosofi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `filosofi` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `galeri` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `galeri` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `guru` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `guru` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `kontak` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `kontak` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `outing_class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `outing_class` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `pengaturan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `pengaturan` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `pengumuman` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `pengumuman` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `createdBy` column on the `pengumuman` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ppdb` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ppdb` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `sambutan_kepala_sekolah` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `sambutan_kepala_sekolah` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `sejarah` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `sejarah` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `siswa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `siswa` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `struktur_organisasi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `struktur_organisasi` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `verification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `verification` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `visi_misi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `visi_misi` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userId` on the `account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `userId` on the `session` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."berita" DROP CONSTRAINT "berita_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "public"."pengumuman" DROP CONSTRAINT "pengumuman_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "public"."session" DROP CONSTRAINT "session_userId_fkey";

-- AlterTable
ALTER TABLE "account" DROP CONSTRAINT "account_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "account_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "berita" DROP CONSTRAINT "berita_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER,
ADD CONSTRAINT "berita_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ekstrakurikuler" DROP CONSTRAINT "ekstrakurikuler_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ekstrakurikuler_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "fasilitas" DROP CONSTRAINT "fasilitas_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "fasilitas_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "filosofi" DROP CONSTRAINT "filosofi_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "filosofi_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "galeri" DROP CONSTRAINT "galeri_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "galeri_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "guru" DROP CONSTRAINT "guru_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "guru_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "kontak" DROP CONSTRAINT "kontak_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "kontak_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "outing_class" DROP CONSTRAINT "outing_class_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "outing_class_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "pengaturan" DROP CONSTRAINT "pengaturan_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "pengaturan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "pengumuman" DROP CONSTRAINT "pengumuman_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "createdBy",
ADD COLUMN     "createdBy" INTEGER,
ADD CONSTRAINT "pengumuman_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ppdb" DROP CONSTRAINT "ppdb_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ppdb_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sambutan_kepala_sekolah" DROP CONSTRAINT "sambutan_kepala_sekolah_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "sambutan_kepala_sekolah_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sejarah" DROP CONSTRAINT "sejarah_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "sejarah_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "session" DROP CONSTRAINT "session_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "session_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "siswa" DROP CONSTRAINT "siswa_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "siswa_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "struktur_organisasi" DROP CONSTRAINT "struktur_organisasi_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "struktur_organisasi_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "verification" DROP CONSTRAINT "verification_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "verification_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "visi_misi" DROP CONSTRAINT "visi_misi_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "visi_misi_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "account_userId_providerId_key" ON "account"("userId", "providerId");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berita" ADD CONSTRAINT "berita_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
