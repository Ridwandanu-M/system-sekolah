import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [
      totalSiswa,
      totalGuru,
      totalBerita,
      totalPengumuman,
      totalEkstrakurikuler,
      totalGaleri,
      totalOutingClass,
      totalPPDB,
      kontakExists,
    ] = await Promise.all([
      prisma.siswa.count(),
      prisma.guru.count(),
      prisma.berita.count(),
      prisma.pengumuman.count(),
      prisma.ekstrakurikuler.count(),
      prisma.galeri.count(),
      prisma.outingClass.count(),
      prisma.pPDB.count(),
      prisma.kontak.findFirst(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalSiswa,
        totalGuru,
        totalBerita,
        totalPengumuman,
        totalEkstrakurikuler,
        totalGaleri,
        totalOutingClass,
        totalPPDB,
        totalKontak: kontakExists ? 1 : 0,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
