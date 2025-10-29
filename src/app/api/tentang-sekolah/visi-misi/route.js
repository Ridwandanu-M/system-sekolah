import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Ambil data visi misi
export async function GET() {
  try {
    const visiMisi = await prisma.visiMisi.findFirst({
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!visiMisi) {
      return NextResponse.json({
        success: true,
        data: null,
        message: "Data visi misi belum tersedia",
      });
    }

    return NextResponse.json({
      success: true,
      data: visiMisi,
    });
  } catch (error) {
    console.error("Error fetching visi misi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data visi misi",
      },
      { status: 500 },
    );
  }
}

// POST - Buat atau update data visi misi
export async function POST(request) {
  try {
    const body = await request.json();
    const { visi, misi } = body;

    // Validasi input
    if (!visi || !misi) {
      return NextResponse.json(
        {
          success: false,
          message: "Visi dan misi harus diisi",
        },
        { status: 400 },
      );
    }

    // Cek apakah sudah ada data visi misi
    const existingVisiMisi = await prisma.visiMisi.findFirst();

    let visiMisiData;
    if (existingVisiMisi) {
      // Update data yang sudah ada
      visiMisiData = await prisma.visiMisi.update({
        where: {
          id: existingVisiMisi.id,
        },
        data: {
          visi,
          misi,
        },
      });
    } else {
      // Buat data baru
      visiMisiData = await prisma.visiMisi.create({
        data: {
          visi,
          misi,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: visiMisiData,
      message: "Data visi misi berhasil disimpan",
    });
  } catch (error) {
    console.error("Error saving visi misi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan data visi misi",
      },
      { status: 500 },
    );
  }
}

// PUT - Update data visi misi
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, visi, misi } = body;

    // Validasi input
    if (!id || !visi || !misi) {
      return NextResponse.json(
        {
          success: false,
          message: "ID, visi dan misi harus diisi",
        },
        { status: 400 },
      );
    }

    const visiMisiData = await prisma.visiMisi.update({
      where: {
        id: parseInt(id),
      },
      data: {
        visi,
        misi,
      },
    });

    return NextResponse.json({
      success: true,
      data: visiMisiData,
      message: "Data visi misi berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating visi misi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui data visi misi",
      },
      { status: 500 },
    );
  }
}

// DELETE - Hapus data visi misi
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

    await prisma.visiMisi.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Data visi misi berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting visi misi:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus data visi misi",
      },
      { status: 500 },
    );
  }
}
