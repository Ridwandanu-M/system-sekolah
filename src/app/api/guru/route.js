import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.guru.findMany();
  return NextResponse.json(users, { status: 200 });
}

export async function POST(req) {
  try {
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

    const existingUser = await prisma.guru.findUnique({
      where: { nik },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Guru dengan NIK tersebut sudah terdaftar" },
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

    const user = await prisma.guru.create({
      data: userData,
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(`Error saat membuat data guru: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function PUT(req) {
  try {
    const {
      id,
      namaLengkap,
      nik,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      image,
    } = await req.json();

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
          id: parseInt(id),
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

    const updatedUser = await prisma.guru.update({
      where: { id: parseInt(id) },
      data: userData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(`Error saat mengupdate data guru: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
