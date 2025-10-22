"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function authenticate(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    redirect("/admin");
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      return { error: "Login gagal. Email atau password tidak valid." };
    }

    if (error.digest === "NEXT_REDIRECT") {
      throw error;
    }

    return { error: "Terjadi kesalahan tidak terduga saat login." };
  }
}
