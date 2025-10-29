import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const pengumuman = await prisma.pengumuman.findUnique({
      where: { id: parseInt(id) },
    });

    if (!pengumuman) {
      return NextResponse.json(
        {
          success: false,
          message: "Pengumuman tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: pengumuman,
      message: "Data pengumuman berhasil diambil",
    });
  } catch (error) {
    console.error("Error fetching pengumuman:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data pengumuman",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
