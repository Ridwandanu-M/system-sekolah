import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Mengambil data outing class berdasarkan ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const outingClass = await prisma.outingClass.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!outingClass) {
      return NextResponse.json(
        {
          success: false,
          message: "Outing class tidak ditemukan",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: outingClass,
    });
  } catch (error) {
    console.error("Error fetching outing class by ID:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data outing class",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT - Mengupdate data outing class
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { judul, deskripsi, lokasi, tanggal, gambar } = body;

    // Validasi input
    if (!judul || !deskripsi || !lokasi || !tanggal) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul, deskripsi, lokasi, dan tanggal wajib diisi",
        },
        { status: 400 }
      );
    }

    // Validasi format tanggal
    const dateObj = new Date(tanggal);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Format tanggal tidak valid",
        },
        { status: 400 }
      );
    }

    // Cek apakah outing class ada
    const existingOutingClass = await prisma.outingClass.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingOutingClass) {
      return NextResponse.json(
        {
          success: false,
          message: "Outing class tidak ditemukan",
        },
        { status: 404 }
      );
    }

    const updatedOutingClass = await prisma.outingClass.update({
      where: {
        id: parseInt(id),
      },
      data: {
        judul,
        deskripsi,
        lokasi,
        tanggal: dateObj,
        gambar: gambar || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Outing class berhasil diupdate",
      data: updatedOutingClass,
    });
  } catch (error) {
    console.error("Error updating outing class:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengupdate outing class",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE - Menghapus data outing class
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Cek apakah outing class ada
    const existingOutingClass = await prisma.outingClass.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingOutingClass) {
      return NextResponse.json(
        {
          success: false,
          message: "Outing class tidak ditemukan",
        },
        { status: 404 }
      );
    }

    await prisma.outingClass.delete({
      where: {
        id: parseInt(id),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Outing class berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting outing class:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus outing class",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
