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

    const existingNik = await prisma.guru.findUnique({
      where: { nik },
    });
    if (existingNik) {
      return NextResponse.json(
        { error: "Guru dengan NIK tersebut sudah terdaftar" },
        { status: 400 },
      );
    }

    const user = await prisma.guru.update({
      where: { id: Number(id) },
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
    console.log(`Error saat memperbarui data guru: ${error}`);
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
