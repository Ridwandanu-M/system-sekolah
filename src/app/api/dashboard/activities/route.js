import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [
      recentSiswa,
      recentGuru,
      recentBerita,
      recentPengumuman,
      recentEkstrakurikuler,
      recentGaleri,
      recentOutingClass,
      recentPPDB,
    ] = await Promise.all([
      prisma.siswa.findMany({
        take: 2,
        orderBy: { createdAt: "desc" },
        select: { id: true, namaLengkap: true, createdAt: true },
      }),
      prisma.guru.findMany({
        take: 2,
        orderBy: { createdAt: "desc" },
        select: { id: true, namaLengkap: true, createdAt: true },
      }),
      prisma.berita.findMany({
        take: 2,
        orderBy: { createdAt: "desc" },
        select: { id: true, judul: true, createdAt: true },
      }),
      prisma.pengumuman.findMany({
        take: 2,
        orderBy: { createdAt: "desc" },
        select: { id: true, judul: true, createdAt: true },
      }),
      prisma.ekstrakurikuler.findMany({
        take: 2,
        orderBy: { createdAt: "desc" },
        select: { id: true, nama: true, createdAt: true },
      }),
      prisma.galeri.findMany({
        take: 2,
        orderBy: { createdAt: "desc" },
        select: { id: true, judul: true, createdAt: true },
      }),
      prisma.outingClass.findMany({
        take: 2,
        orderBy: { createdAt: "desc" },
        select: { id: true, judul: true, createdAt: true },
      }),
      prisma.pPDB.findMany({
        take: 2,
        orderBy: { createdAt: "desc" },
        select: { id: true, namaLengkap: true, createdAt: true },
      }),
    ]);

    const activities = [];

    recentSiswa.forEach((item) => {
      activities.push({
        id: `siswa-${item.id}`,
        type: "siswa",
        message: `Data siswa "${item.namaLengkap}" ditambahkan`,
        time: item.createdAt,
        icon: "Users",
      });
    });

    recentGuru.forEach((item) => {
      activities.push({
        id: `guru-${item.id}`,
        type: "guru",
        message: `Data guru "${item.namaLengkap}" ditambahkan`,
        time: item.createdAt,
        icon: "GraduationCap",
      });
    });

    recentBerita.forEach((item) => {
      activities.push({
        id: `berita-${item.id}`,
        type: "berita",
        message: `Berita "${item.judul}" dipublikasikan`,
        time: item.createdAt,
        icon: "FileText",
      });
    });

    recentPengumuman.forEach((item) => {
      activities.push({
        id: `pengumuman-${item.id}`,
        type: "pengumuman",
        message: `Pengumuman "${item.judul}" ditambahkan`,
        time: item.createdAt,
        icon: "Megaphone",
      });
    });

    recentEkstrakurikuler.forEach((item) => {
      activities.push({
        id: `ekstrakurikuler-${item.id}`,
        type: "ekstrakurikuler",
        message: `Ekstrakurikuler "${item.nama}" diperbarui`,
        time: item.createdAt,
        icon: "BookOpen",
      });
    });

    recentGaleri.forEach((item) => {
      activities.push({
        id: `galeri-${item.id}`,
        type: "galeri",
        message: `Foto "${item.judul}" ditambahkan ke galeri`,
        time: item.createdAt,
        icon: "Images",
      });
    });

    recentOutingClass.forEach((item) => {
      activities.push({
        id: `outing-${item.id}`,
        type: "outing-class",
        message: `Outing Class "${item.judul}" ditambahkan`,
        time: item.createdAt,
        icon: "MapPin",
      });
    });

    recentPPDB.forEach((item) => {
      activities.push({
        id: `ppdb-${item.id}`,
        type: "ppdb",
        message: `Pendaftar "${item.namaLengkap}" mendaftar`,
        time: item.createdAt,
        icon: "UserCheck",
      });
    });

    const sortedActivities = activities
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 6);

    return NextResponse.json({
      success: true,
      data: sortedActivities,
    });
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch recent activities" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
