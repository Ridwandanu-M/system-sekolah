/*
  Warnings:

  - You are about to drop the `berita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ekstrakurikuler` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fasilitas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `filosofi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `galeri` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `guru` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `kontak` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outing_class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pengaturan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pengumuman` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ppdb` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sambutan_kepala_sekolah` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sejarah` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `siswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `struktur_organisasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `visi_misi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."berita" DROP CONSTRAINT "berita_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "public"."pengumuman" DROP CONSTRAINT "pengumuman_createdBy_fkey";

-- DropTable
DROP TABLE "public"."berita";

-- DropTable
DROP TABLE "public"."ekstrakurikuler";

-- DropTable
DROP TABLE "public"."fasilitas";

-- DropTable
DROP TABLE "public"."filosofi";

-- DropTable
DROP TABLE "public"."galeri";

-- DropTable
DROP TABLE "public"."guru";

-- DropTable
DROP TABLE "public"."kontak";

-- DropTable
DROP TABLE "public"."outing_class";

-- DropTable
DROP TABLE "public"."pengaturan";

-- DropTable
DROP TABLE "public"."pengumuman";

-- DropTable
DROP TABLE "public"."ppdb";

-- DropTable
DROP TABLE "public"."sambutan_kepala_sekolah";

-- DropTable
DROP TABLE "public"."sejarah";

-- DropTable
DROP TABLE "public"."siswa";

-- DropTable
DROP TABLE "public"."struktur_organisasi";

-- DropTable
DROP TABLE "public"."users";

-- DropTable
DROP TABLE "public"."visi_misi";

-- DropEnum
DROP TYPE "public"."JenisKelamin";

-- DropEnum
DROP TYPE "public"."Role";

-- DropEnum
DROP TYPE "public"."StatusPPDB";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
