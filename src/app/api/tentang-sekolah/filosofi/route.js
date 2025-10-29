import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Ambil data filosofi
export async function GET() {
  try {
    const filosofi = await prisma.filosofi.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!filosofi) {
      return NextResponse.json({
        success: true,
        data: null,
        message: "Data filosofi belum tersedia",
      });
    }

    return NextResponse.json({
      success: true,
      data: filosofi,
    });
  } catch (error) {
    console.error("Error fetching filosofi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data filosofi",
      },
      { status: 500 },
    );
  }
}

// POST - Buat atau update data filosofi
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

    // Cek apakah sudah ada data filosofi
    const existingFilosofi = await prisma.filosofi.findFirst();

    let filosofi;
    if (existingFilosofi) {
      // Update data yang sudah ada
      filosofi = await prisma.filosofi.update({
        where: {
          id: existingFilosofi.id,
        },
        data: {
          judul,
          konten,
        },
      });
    } else {
      // Buat data baru
      filosofi = await prisma.filosofi.create({
        data: {
          judul,
          konten,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: filosofi,
      message: "Data filosofi berhasil disimpan",
    });
  } catch (error) {
    console.error("Error saving filosofi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan data filosofi",
      },
      { status: 500 },
    );
  }
}

// PUT - Update data filosofi
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

    const filosofi = await prisma.filosofi.update({
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
      data: filosofi,
      message: "Data filosofi berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating filosofi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui data filosofi",
      },
      { status: 500 },
    );
  }
}

// DELETE - Hapus data filosofi
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

    await prisma.filosofi.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data filosofi berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting filosofi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data filosofi",
      },
      { status: 500 },
    );
  }
}
