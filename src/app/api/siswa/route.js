import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.siswa.findMany();

  if (users.length === 0) {
    return NextResponse.json(
      { error: "Belum ada data siswa" },
      { status: 404 },
    );
  }

  return NextResponse.json(users, { status: 200 });
}

export async function POST(req) {
  try {
    const { namaLengkap, nis, jenisKelamin, tempatLahir, tanggalLahir } =
      await req.json();

    const parsedDate = new Date(tanggalLahir);

    if (
      !namaLengkap ||
      !nis ||
      !jenisKelamin ||
      !tempatLahir ||
      !tanggalLahir
    ) {
      return NextResponse.json(
        { error: "Masukan semua input data" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.siswa.findUnique({ where: { nis } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Pengguna dengan nis tersebut sudah terdaftar" },
        { status: 400 },
      );
    }

    const user = await prisma.siswa.create({
      data: {
        namaLengkap,
        nis,
        jenisKelamin,
        tempatLahir,
        tanggalLahir: parsedDate,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(`Error saat membuat data siswa: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
