import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// GET - Fetch contact information
export async function GET() {
  try {
    // Get the first (and likely only) contact record
    const contact = await prisma.kontak.findFirst({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal mengambil data kontak",
      },
      { status: 500 }
    );
  }
}

// POST - Create or update contact information
export async function POST(request) {
  try {
    const body = await request.json();
    const { id, alamat, telepon, email, facebook, instagram, youtube, tiktok } =
      body;

    // Validation
    if (!alamat || !telepon || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Alamat, telepon, dan email wajib diisi",
        },
        { status: 400 }
      );
    }

    let contact;

    if (id) {
      // Update existing contact
      contact = await prisma.kontak.update({
        where: { id: parseInt(id) },
        data: {
          alamat,
          telepon,
          email,
          facebook: facebook || null,
          instagram: instagram || null,
          youtube: youtube || null,
          tiktok: tiktok || null,
        },
      });
    } else {
      // Check if contact already exists
      const existingContact = await prisma.kontak.findFirst();

      if (existingContact) {
        // Update existing contact
        contact = await prisma.kontak.update({
          where: { id: existingContact.id },
          data: {
            alamat,
            telepon,
            email,
            facebook: facebook || null,
            instagram: instagram || null,
            youtube: youtube || null,
            tiktok: tiktok || null,
          },
        });
      } else {
        // Create new contact
        contact = await prisma.kontak.create({
          data: {
            alamat,
            telepon,
            email,
            facebook: facebook || null,
            instagram: instagram || null,
            youtube: youtube || null,
            tiktok: tiktok || null,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Data kontak berhasil disimpan",
      data: contact,
    });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Gagal menyimpan data kontak",
      },
      { status: 500 }
    );
  }
}
