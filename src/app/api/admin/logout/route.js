import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  try {
    const response = NextResponse.json({
      message: "Logout berhasil",
      success: true,
    });

    response.cookies.set("admin-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in logout API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
