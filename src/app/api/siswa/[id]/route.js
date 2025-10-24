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
    const { namaLengkap, nis, jenisKelamin, tempatLahir, tanggalLahir } =
      await req.json();

    const parsedDate = new Date(tanggalLahir);

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
      !tanggalLahir
    ) {
      return NextResponse.json(
        { error: "Masukan semua input data" },
        { status: 400 },
      );
    }

    const existingNis = await prisma.siswa.findUnique({
      where: { nis },
    });

    if (existingNis) {
      return NextResponse.json(
        { error: "Siswa dengan NIS tersebut sudah terdaftar" },
        { status: 400 },
      );
    }

    const updated = await prisma.siswa.update({
      where: { id: Number(id) },
      data: {
        namaLengkap,
        nis,
        jenisKelamin,
        tempatLahir,
        tanggalLahir: parsedDate,
      },
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
