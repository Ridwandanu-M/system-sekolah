import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Ambil berita berdasarkan ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const berita = await prisma.berita.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!berita) {
      return NextResponse.json(
        {
          success: false,
          message: "Berita tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: berita,
      message: "Data berita berhasil diambil",
    });
  } catch (error) {
    console.error("Error fetching berita:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data berita",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
