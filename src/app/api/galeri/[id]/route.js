import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Fetch single gallery item by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const galeriItem = await prisma.galeri.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!galeriItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Galeri tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: galeriItem,
    });
  } catch (error) {
    console.error("Error fetching galeri item:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data galeri",
      },
      { status: 500 }
    );
  }
}

// PUT - Update gallery item by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { judul, deskripsi, gambar, tanggal } = body;

    // Check if gallery item exists
    const existingItem = await prisma.galeri.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Galeri tidak ditemukan",
        },
        { status: 404 }
      );
    }

    // Validation
    if (!judul || !gambar) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul dan gambar wajib diisi",
        },
        { status: 400 }
      );
    }

    // Update gallery item
    const updatedItem = await prisma.galeri.update({
      where: {
        id: parseInt(id),
      },
      data: {
        judul,
        deskripsi: deskripsi || null,
        gambar,
        tanggal: tanggal ? new Date(tanggal) : existingItem.tanggal,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Galeri berhasil diperbarui",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error updating galeri:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui galeri",
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery item by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Check if gallery item exists
    const existingItem = await prisma.galeri.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!existingItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Galeri tidak ditemukan",
        },
        { status: 404 }
      );
    }

    // Delete gallery item
    await prisma.galeri.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Galeri berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting galeri:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus galeri",
      },
      { status: 500 }
    );
  }
}
