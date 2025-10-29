import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Ambil data sejarah
export async function GET() {
  try {
    const sejarah = await prisma.sejarah.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!sejarah) {
      return NextResponse.json({
        success: true,
        data: null,
        message: "Data sejarah belum tersedia",
      });
    }

    return NextResponse.json({
      success: true,
      data: sejarah,
    });
  } catch (error) {
    console.error("Error fetching sejarah:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data sejarah",
      },
      { status: 500 },
    );
  }
}

// POST - Buat atau update data sejarah
export async function POST(request) {
  try {
    const body = await request.json();
    const { judul, konten } = body;

    // Validasi input
    if (!judul || !konten) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul dan konten harus diisi",
        },
        { status: 400 },
      );
    }

    // Cek apakah sudah ada data sejarah
    const existingSejarah = await prisma.sejarah.findFirst();

    let sejarah;
    if (existingSejarah) {
      // Update data yang sudah ada
      sejarah = await prisma.sejarah.update({
        where: {
          id: existingSejarah.id,
        },
        data: {
          judul,
          konten,
        },
      });
    } else {
      // Buat data baru
      sejarah = await prisma.sejarah.create({
        data: {
          judul,
          konten,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: sejarah,
      message: "Data sejarah berhasil disimpan",
    });
  } catch (error) {
    console.error("Error saving sejarah:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan data sejarah",
      },
      { status: 500 },
    );
  }
}

// PUT - Update data sejarah
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, judul, konten } = body;

    // Validasi input
    if (!id || !judul || !konten) {
      return NextResponse.json(
        {
          success: false,
          message: "ID, judul dan konten harus diisi",
        },
        { status: 400 },
      );
    }

    const sejarah = await prisma.sejarah.update({
      where: {
        id: parseInt(id),
      },
      data: {
        judul,
        konten,
      },
    });

    return NextResponse.json({
      success: true,
      data: sejarah,
      message: "Data sejarah berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating sejarah:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui data sejarah",
      },
      { status: 500 },
    );
  }
}

// DELETE - Hapus data sejarah
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
        { status: 400 },
      );
    }

    await prisma.sejarah.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data sejarah berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting sejarah:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data sejarah",
      },
      { status: 500 },
    );
  }
}
