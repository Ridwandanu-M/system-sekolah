import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.siswa.findMany();
  return NextResponse.json(users, { status: 200 });
}

export async function POST(req) {
  try {
    const {
      namaLengkap,
      nis,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      tahun,
      image,
    } = await req.json();

    const parsedDate = new Date(tanggalLahir);
    const parsedTahun = parseInt(tahun, 10);

    if (
      !namaLengkap ||
      !nis ||
      !jenisKelamin ||
      !tempatLahir ||
      !tanggalLahir ||
      !tahun
    ) {
      return NextResponse.json(
        { error: "Semua input data wajib harus diisi" },
        { status: 400 },
      );
    }

    if (isNaN(parsedTahun)) {
      return NextResponse.json(
        { error: "Tahun harus berupa angka yang valid" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.siswa.findUnique({ where: { nis } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Siswa dengan nis tersebut sudah terdaftar" },
        { status: 400 },
      );
    }

    const userData = {
      namaLengkap,
      nis,
      jenisKelamin,
      tempatLahir,
      tanggalLahir: parsedDate,
      tahun: parsedTahun,
    };

    if (image) {
      userData.image = image;
    }

    const user = await prisma.siswa.create({
      data: userData,
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

export async function PUT(req) {
  try {
    const {
      id,
      namaLengkap,
      nis,
      jenisKelamin,
      tempatLahir,
      tanggalLahir,
      tahun,
      image,
    } = await req.json();

    const parsedDate = new Date(tanggalLahir);
    const parsedTahun = parseInt(tahun, 10);

    if (
      !namaLengkap ||
      !nis ||
      !jenisKelamin ||
      !tempatLahir ||
      !tanggalLahir ||
      !tahun
    ) {
      return NextResponse.json(
        { error: "Semua input data wajib harus diisi" },
        { status: 400 },
      );
    }

    if (isNaN(parsedTahun)) {
      return NextResponse.json(
        { error: "Tahun harus berupa angka yang valid" },
        { status: 400 },
      );
    }

    // Check if NIS already exists for other students
    const existingUser = await prisma.siswa.findFirst({
      where: {
        nis: nis,
        NOT: {
          id: parseInt(id),
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "NIS sudah digunakan oleh siswa lain" },
        { status: 400 },
      );
    }

    const userData = {
      namaLengkap,
      nis,
      jenisKelamin,
      tempatLahir,
      tanggalLahir: parsedDate,
      tahun: parsedTahun,
    };

    if (image) {
      userData.image = image;
    }

    const updatedUser = await prisma.siswa.update({
      where: { id: parseInt(id) },
      data: userData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log(`Error saat mengupdate data siswa: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
