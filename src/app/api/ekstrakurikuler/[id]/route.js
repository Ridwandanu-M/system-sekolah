import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Mengambil data ekstrakurikuler berdasarkan ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const ekstrakurikuler = await prisma.ekstrakurikuler.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!ekstrakurikuler) {
      return NextResponse.json(
        {
          success: false,
          message: "Ekstrakurikuler tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: ekstrakurikuler,
    });
  } catch (error) {
    console.error("Error fetching ekstrakurikuler by ID:", error);
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

// PUT - Mengupdate data ekstrakurikuler
export async function PUT(request, { params }) {
  try {
    const { id } = params;
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

    // Cek apakah ekstrakurikuler ada
    const existingEkstra = await prisma.ekstrakurikuler.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingEkstra) {
      return NextResponse.json(
        {
          success: false,
          message: "Ekstrakurikuler tidak ditemukan",
        },
        { status: 404 }
      );
    }

    const updatedEkstrakurikuler = await prisma.ekstrakurikuler.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nama,
        deskripsi,
        gambar: gambar || null,
        jadwal: jadwal || null,
        aktif: aktif !== undefined ? aktif : existingEkstra.aktif,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ekstrakurikuler berhasil diupdate",
      data: updatedEkstrakurikuler,
    });
  } catch (error) {
    console.error("Error updating ekstrakurikuler:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengupdate ekstrakurikuler",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus data ekstrakurikuler
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Cek apakah ekstrakurikuler ada
    const existingEkstra = await prisma.ekstrakurikuler.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingEkstra) {
      return NextResponse.json(
        {
          success: false,
          message: "Ekstrakurikuler tidak ditemukan",
        },
        { status: 404 }
      );
    }

    await prisma.ekstrakurikuler.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Ekstrakurikuler berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting ekstrakurikuler:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus ekstrakurikuler",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
