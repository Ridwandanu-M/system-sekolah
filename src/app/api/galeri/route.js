import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Fetch all gallery items with pagination
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await prisma.galeri.count();

    // Get gallery items with pagination
    const galeriItems = await prisma.galeri.findMany({
      skip,
      take: limit,
      orderBy: {
        tanggal: "desc",
      },
      select: {
        id: true,
        judul: true,
        deskripsi: true,
        gambar: true,
        tanggal: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: galeriItems,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching galeri:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data galeri",
      },
      { status: 500 }
    );
  }
}

// POST - Create new gallery item
export async function POST(request) {
  try {
    const body = await request.json();
    const { judul, deskripsi, gambar, tanggal } = body;

    // Validation
    if (!judul || !gambar) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul dan gambar wajib diisi",
        },
        { status: 400 }
      );
    }

    // Create new gallery item
    const galeriItem = await prisma.galeri.create({
      data: {
        judul,
        deskripsi: deskripsi || null,
        gambar,
        tanggal: tanggal ? new Date(tanggal) : new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Galeri berhasil ditambahkan",
      data: galeriItem,
    });
  } catch (error) {
    console.error("Error creating galeri:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menambahkan galeri",
      },
      { status: 500 }
    );
  }
}
