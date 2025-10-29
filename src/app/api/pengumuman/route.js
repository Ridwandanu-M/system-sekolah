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

    const pengumuman = await prisma.pengumuman.findMany(queryOptions);

    const totalCount = await prisma.pengumuman.count();

    return NextResponse.json({
      success: true,
      data: pengumuman,
      total: totalCount,
      message: "Data pengumuman berhasil diambil",
    });
  } catch (error) {
    console.error("Error fetching pengumuman:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data pengumuman",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const { judul, konten } = body;

    if (!judul || !konten) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul dan konten harus diisi",
        },
        { status: 400 }
      );
    }

    const pengumuman = await prisma.pengumuman.create({
      data: {
        judul,
        konten,
      },
    });

    return NextResponse.json({
      success: true,
      data: pengumuman,
      message: "Pengumuman berhasil dibuat",
    });
  } catch (error) {
    console.error("Error creating pengumuman:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal membuat pengumuman",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();

    const { id, judul, konten } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID pengumuman harus disertakan",
        },
        { status: 400 }
      );
    }

    if (!judul || !konten) {
      return NextResponse.json(
        {
          success: false,
          message: "Judul dan konten harus diisi",
        },
        { status: 400 }
      );
    }

    const pengumuman = await prisma.pengumuman.update({
      where: { id: parseInt(id) },
      data: {
        judul,
        konten,
      },
    });

    return NextResponse.json({
      success: true,
      data: pengumuman,
      message: "Pengumuman berhasil diperbarui",
    });
  } catch (error) {
    console.error("Error updating pengumuman:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal memperbarui pengumuman",
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
          message: "ID pengumuman harus disertakan",
        },
        { status: 400 }
      );
    }

    await prisma.pengumuman.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Pengumuman berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting pengumuman:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menghapus pengumuman",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
