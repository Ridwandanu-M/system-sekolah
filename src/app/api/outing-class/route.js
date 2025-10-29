import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Mengambil semua data outing class
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    const queryOptions = {
      orderBy: {
        tanggal: "desc",
      },
    };

    if (limit) {
      queryOptions.take = parseInt(limit);
    }

    const outingClass = await prisma.outingClass.findMany(queryOptions);

    return NextResponse.json({
      success: true,
      data: outingClass,
      total: outingClass.length,
    });
  } catch (error) {
    console.error("Error fetching outing class:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data outing class",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// POST - Menambah data outing class baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { judul, deskripsi, lokasi, tanggal, gambar } = body;

    // Validasi input
    if (!judul || !deskripsi || !lokasi || !tanggal) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul, deskripsi, lokasi, dan tanggal wajib diisi",
        },
        { status: 400 }
      );
    }

    // Validasi format tanggal
    const dateObj = new Date(tanggal);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Format tanggal tidak valid",
        },
        { status: 400 }
      );
    }

    const newOutingClass = await prisma.outingClass.create({
      data: {
        judul,
        deskripsi,
        lokasi,
        tanggal: dateObj,
        gambar: gambar || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Outing class berhasil ditambahkan",
      data: newOutingClass,
    });
  } catch (error) {
    console.error("Error creating outing class:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambahkan outing class",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
