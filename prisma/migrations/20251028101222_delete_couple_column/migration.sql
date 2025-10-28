/*
  Warnings:

  - You are about to drop the column `createdBy` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `berita` table. All the data in the column will be lost.
  - You are about to drop the column `pembimbing` on the `ekstrakurikuler` table. All the data in the column will be lost.
  - You are about to drop the column `aktif` on the `galeri` table. All the data in the column will be lost.
  - You are about to drop the column `kategori` on the `galeri` table. All the data in the column will be lost.
  - You are about to drop the column `aktif` on the `outing_class` table. All the data in the column will be lost.
  - You are about to drop the column `peserta` on the `outing_class` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `penting` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `pengumuman` table. All the data in the column will be lost.
  - You are about to drop the `pengaturan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `kelas` to the `siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SUPER_ADMIN';

-- AlterTable
ALTER TABLE "berita" DROP COLUMN "createdBy",
DROP COLUMN "published",
DROP COLUMN "views";

-- AlterTable
ALTER TABLE "ekstrakurikuler" DROP COLUMN "pembimbing";

-- AlterTable
ALTER TABLE "galeri" DROP COLUMN "aktif",
DROP COLUMN "kategori";

-- AlterTable
ALTER TABLE "outing_class" DROP COLUMN "aktif",
DROP COLUMN "peserta";

-- AlterTable
ALTER TABLE "pengumuman" DROP COLUMN "createdBy",
DROP COLUMN "penting",
DROP COLUMN "published",
DROP COLUMN "views";

-- AlterTable
ALTER TABLE "siswa" ADD COLUMN     "kelas" "Kelas" NOT NULL;

-- DropTable
DROP TABLE "public"."pengaturan";
