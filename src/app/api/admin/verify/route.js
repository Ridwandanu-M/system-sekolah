import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function GET(req) {
  try {
    const token = req.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Token tidak ditemukan", authenticated: false },
        { status: 401 }
      );
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      console.error("JWT secret not configured");
      return NextResponse.json(
        { error: "Server configuration error", authenticated: false },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, jwtSecret);

    return NextResponse.json({
      message: "Token valid",
      authenticated: true,
      user: {
        username: decoded.username,
        role: decoded.role,
      },
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { error: "Token sudah kadaluarsa", authenticated: false },
        { status: 401 }
      );
    }

    if (error.name === "JsonWebTokenError") {
      return NextResponse.json(
        { error: "Token tidak valid", authenticated: false },
        { status: 401 }
      );
    }

    console.error("Error in verify token API:", error);
    return NextResponse.json(
      { error: "Internal server error", authenticated: false },
      { status: 500 }
    );
  }
}
