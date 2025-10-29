import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    const queryOptions = {
      orderBy: {
        tanggalPost: "desc",
      },
      include: {},
    };

    if (limit) {
      queryOptions.take = parseInt(limit);
    }
    if (offset) {
      queryOptions.skip = parseInt(offset);
    }

    const berita = await prisma.berita.findMany(queryOptions);

    const totalCount = await prisma.berita.count();

    return NextResponse.json({
      success: true,
      data: berita,
      total: totalCount,
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

export async function POST(request) {
  try {
    const body = await request.json();
    const { judul, konten, gambar, penulis } = body;

    // Validasi input
    if (!judul || !konten || !penulis) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul, konten, dan penulis harus diisi",
        },
        { status: 400 }
      );
    }

    const slug = judul
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    const berita = await prisma.berita.create({
      data: {
        judul,
        konten,
        gambar,
        penulis,
        tanggalPost: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: berita,
      message: "Berita berhasil dibuat",
    });
  } catch (error) {
    console.error("Error creating berita:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat berita",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, judul, konten, gambar, penulis } = body;

    if (!id || !judul || !konten || !penulis) {
      return NextResponse.json(
        {
          success: false,
          message: "ID, judul, konten, dan penulis harus diisi",
        },
        { status: 400 }
      );
    }

    const berita = await prisma.berita.update({
      where: {
        id: parseInt(id),
      },
      data: {
        judul,
        konten,
        gambar,
        penulis,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      data: berita,
      message: "Berita berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating berita:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui berita",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID berita harus disediakan",
        },
        { status: 400 }
      );
    }

    await prisma.berita.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting berita:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus berita",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
