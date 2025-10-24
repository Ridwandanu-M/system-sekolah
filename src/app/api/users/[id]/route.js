import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Data pengguna tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.log(`Error saat mencari data pengguna: ${error}`);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { name, email } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Data pengguna tidak ditemukan" },
        { status: 400 },
      );
    }

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nama dan email tidak boleh kosong" },
        { status: 400 },
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email tersebut sudah dipakai" },
        { status: 400 },
      );
    }

    const updated = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
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
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Data pengguna tidak ditemukan" },
        { status: 400 },
      );
    }

    await prisma.user.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(
      { message: "Data pengguna berhasil dihapus" },
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
