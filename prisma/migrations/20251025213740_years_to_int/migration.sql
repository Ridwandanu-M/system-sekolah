/*
  Warnings:

  - Changed the type of `tahun` on the `siswa` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "siswa" DROP COLUMN "tahun",
ADD COLUMN     "tahun" INTEGER NOT NULL;
