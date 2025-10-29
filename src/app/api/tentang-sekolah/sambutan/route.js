import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Ambil data sambutan kepala sekolah
export async function GET() {
  try {
    const sambutan = await prisma.sambutanKepalaSekolah.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!sambutan) {
      return NextResponse.json({
        success: true,
        data: null,
        message: "Data sambutan belum tersedia",
      });
    }

    return NextResponse.json({
      success: true,
      data: sambutan,
    });
  } catch (error) {
    console.error("Error fetching sambutan:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data sambutan",
      },
      { status: 500 },
    );
  }
}

// POST - Buat atau update data sambutan kepala sekolah
export async function POST(request) {
  try {
    const body = await request.json();
    const { judul, konten, gambar } = body;

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

    // Cek apakah sudah ada data sambutan
    const existingSambutan = await prisma.sambutanKepalaSekolah.findFirst();

    let sambutan;
    if (existingSambutan) {
      // Update data yang sudah ada
      sambutan = await prisma.sambutanKepalaSekolah.update({
        where: {
          id: existingSambutan.id,
        },
        data: {
          judul,
          konten,
          gambar: gambar || existingSambutan.gambar,
        },
      });
    } else {
      // Buat data baru
      sambutan = await prisma.sambutanKepalaSekolah.create({
        data: {
          judul,
          konten,
          gambar,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: sambutan,
      message: "Data sambutan berhasil disimpan",
    });
  } catch (error) {
    console.error("Error saving sambutan:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan data sambutan",
      },
      { status: 500 },
    );
  }
}

// PUT - Update data sambutan kepala sekolah
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, judul, konten, gambar } = body;

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

    const sambutan = await prisma.sambutanKepalaSekolah.update({
      where: {
        id: parseInt(id),
      },
      data: {
        judul,
        konten,
        gambar,
      },
    });

    return NextResponse.json({
      success: true,
      data: sambutan,
      message: "Data sambutan berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating sambutan:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui data sambutan",
      },
      { status: 500 },
    );
  }
}

// DELETE - Hapus data sambutan kepala sekolah
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

    await prisma.sambutanKepalaSekolah.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data sambutan berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting sambutan:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data sambutan",
      },
      { status: 500 },
    );
  }
}
