import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.guru.findMany();

  if (users.length === 0) {
    return NextResponse.json({ error: "Belum ada data guru" }, { status: 404 });
  }

  return NextResponse.json(users, { status: 200 });
}

export async function POST(req) {
  try {
    const { namaLengkap, nik, jenisKelamin, tempatLahir, tanggalLahir } =
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
        { error: "Masukan semua input data" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.guru.findUnique({
      where: { nik },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Data guru dengan nik tersebut sudah terdaftar" },
        { status: 400 },
      );
    }

    const user = await prisma.guru.create({
      data: {
        namaLengkap,
        nik,
        jenisKelamin,
        tempatLahir,
        tanggalLahir: parsedDate,
      },
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
