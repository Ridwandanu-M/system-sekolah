import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const struktur = await prisma.strukturOrganisasi.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!struktur) {
      return NextResponse.json({
        success: true,
        data: null,
        message: "Data struktur organisasi belum tersedia",
      });
    }

    return NextResponse.json({
      success: true,
      data: struktur,
    });
  } catch (error) {
    console.error("Error fetching struktur organisasi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data struktur organisasi",
      },
      { status: 500 }
    );
  }
}

// POST - Buat atau update data struktur organisasi
export async function POST(request) {
  try {
    const body = await request.json();
    const { judul, deskripsi, struktur } = body;

    // Validasi input
    if (!judul) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul harus diisi",
        },
        { status: 400 }
      );
    }

    // Cek apakah sudah ada data struktur organisasi
    const existingStruktur = await prisma.strukturOrganisasi.findFirst();

    let strukturData;
    if (existingStruktur) {
      // Update data yang sudah ada
      strukturData = await prisma.strukturOrganisasi.update({
        where: {
          id: existingStruktur.id,
        },
        data: {
          judul,
          deskripsi,
          struktur,
        },
      });
    } else {
      // Buat data baru
      strukturData = await prisma.strukturOrganisasi.create({
        data: {
          judul,
          deskripsi,
          struktur,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: strukturData,
      message: "Data struktur organisasi berhasil disimpan",
    });
  } catch (error) {
    console.error("Error saving struktur organisasi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan data struktur organisasi",
      },
      { status: 500 }
    );
  }
}

// PUT - Update data struktur organisasi
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, judul, deskripsi, struktur } = body;

    // Validasi input
    if (!id || !judul) {
      return NextResponse.json(
        {
          success: false,
          message: "ID dan judul harus diisi",
        },
        { status: 400 }
      );
    }

    const strukturData = await prisma.strukturOrganisasi.update({
      where: {
        id: parseInt(id),
      },
      data: {
        judul,
        deskripsi,
        struktur,
      },
    });

    return NextResponse.json({
      success: true,
      data: strukturData,
      message: "Data struktur organisasi berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating struktur organisasi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui data struktur organisasi",
      },
      { status: 500 }
    );
  }
}

// DELETE - Hapus data struktur organisasi
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

    await prisma.strukturOrganisasi.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data struktur organisasi berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting struktur organisasi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data struktur organisasi",
      },
      { status: 500 }
    );
  }
}
