import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Mengambil semua data ekstrakurikuler
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const aktif = searchParams.get("aktif");
    const limit = searchParams.get("limit");

    const whereClause = {};
    if (aktif !== null && aktif !== undefined) {
      whereClause.aktif = aktif === "true";
    }

    const queryOptions = {
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    };

    if (limit) {
      queryOptions.take = parseInt(limit);
    }

    const ekstrakurikuler = await prisma.ekstrakurikuler.findMany(queryOptions);

    return NextResponse.json({
      success: true,
      data: ekstrakurikuler,
      total: ekstrakurikuler.length,
    });
  } catch (error) {
    console.error("Error fetching ekstrakurikuler:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data ekstrakurikuler",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Menambah data ekstrakurikuler baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { nama, deskripsi, gambar, jadwal, aktif } = body;

    // Validasi input
    if (!nama || !deskripsi) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama dan deskripsi wajib diisi",
        },
        { status: 400 }
      );
    }

    const newEkstrakurikuler = await prisma.ekstrakurikuler.create({
      data: {
        nama,
        deskripsi,
        gambar: gambar || null,
        jadwal: jadwal || null,
        aktif: aktif !== undefined ? aktif : true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ekstrakurikuler berhasil ditambahkan",
      data: newEkstrakurikuler,
    });
  } catch (error) {
    console.error("Error creating ekstrakurikuler:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambahkan ekstrakurikuler",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
