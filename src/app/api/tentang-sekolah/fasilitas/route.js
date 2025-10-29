import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Ambil semua data fasilitas
export async function GET() {
  try {
    const fasilitas = await prisma.fasilitas.findMany({
      where: {
        aktif: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: fasilitas,
    });
  } catch (error) {
    console.error("Error fetching fasilitas:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data fasilitas",
      },
      { status: 500 }
    );
  }
}

// POST - Buat data fasilitas baru
export async function POST(request) {
  try {
    const body = await request.json();
    const { nama, deskripsi } = body;

    // Validasi input
    if (!nama || !deskripsi) {
      return NextResponse.json(
        {
          success: false,
          message: "Nama dan deskripsi harus diisi",
        },
        { status: 400 }
      );
    }

    const fasilitas = await prisma.fasilitas.create({
      data: {
        nama,
        deskripsi,
        aktif: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: fasilitas,
      message: "Data fasilitas berhasil disimpan",
    });
  } catch (error) {
    console.error("Error saving fasilitas:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan data fasilitas",
      },
      { status: 500 }
    );
  }
}

// PUT - Update data fasilitas
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, nama, deskripsi, aktif } = body;

    // Validasi input
    if (!id || !nama || !deskripsi) {
      return NextResponse.json(
        {
          success: false,
          message: "ID, nama dan deskripsi harus diisi",
        },
        { status: 400 }
      );
    }

    const fasilitas = await prisma.fasilitas.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nama,
        deskripsi,
        aktif: aktif !== undefined ? aktif : true,
      },
    });

    return NextResponse.json({
      success: true,
      data: fasilitas,
      message: "Data fasilitas berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating fasilitas:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui data fasilitas",
      },
      { status: 500 }
    );
  }
}

// DELETE - Hapus data fasilitas (soft delete)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID harus disediakan",
        },
        { status: 400 }
      );
    }

    // Soft delete - set aktif to false
    await prisma.fasilitas.update({
      where: {
        id: parseInt(id),
      },
      data: {
        aktif: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data fasilitas berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting fasilitas:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data fasilitas",
      },
      { status: 500 }
    );
  }
}
