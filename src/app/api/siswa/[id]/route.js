import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const user = await prisma.siswa.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Data siswa tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(`Error saat mencari data siswa: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
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

    const existingUser = await prisma.siswa.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan" },
        { status: 404 },
      );
    }

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

    const existingNis = await prisma.siswa.findFirst({
      where: {
        nis: nis,
        NOT: {
          id: Number(id),
        },
      },
    });

    if (existingNis) {
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

    const updated = await prisma.siswa.update({
      where: { id: Number(id) },
      data: userData,
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.log(`Error saat memperbarui pengguna: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const existingUser = await prisma.siswa.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Data siswa tidak ditemukan" },
        { status: 404 },
      );
    }

    await prisma.siswa.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Data siswa berhasil dihapus" },
      { status: 200 },
    );
  } catch (error) {
    console.log(`Error saat menghapus pengguna: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
