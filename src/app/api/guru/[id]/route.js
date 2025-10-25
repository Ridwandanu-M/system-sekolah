import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const user = await prisma.guru.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Data guru tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(`Error saat mencari data guru: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { namaLengkap, nik, jenisKelamin, tempatLahir, tanggalLahir, image } =
      await req.json();

    const parsedDate = new Date(tanggalLahir);

    if (
      !namaLengkap ||
      !nik ||
      !jenisKelamin ||
      !tempatLahir ||
      !tanggalLahir
    ) {
      return NextResponse.json(
        { error: "Semua input data wajib harus diisi" },
        { status: 400 },
      );
    }

    // Check if NIK already exists for other teachers
    const existingUser = await prisma.guru.findFirst({
      where: {
        nik: nik,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "NIK sudah digunakan oleh guru lain" },
        { status: 400 },
      );
    }

    const userData = {
      namaLengkap,
      nik,
      jenisKelamin,
      tempatLahir,
      tanggalLahir: parsedDate,
    };

    if (image) {
      userData.image = image;
    }

    const user = await prisma.guru.update({
      where: { id: Number(id) },
      data: userData,
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(`Error saat mengupdate data guru: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    const existingUser = await prisma.guru.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Data guru tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.guru.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Data guru berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.log(`Error saat menghapus data guru: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
