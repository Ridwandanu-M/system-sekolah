"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [redirectAttempts, setRedirectAttempts] = useState(0);
  const router = useRouter();
  const { login, authenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (
      !authLoading &&
      authenticated &&
      !isRedirecting &&
      redirectAttempts < 2
    ) {
      console.log("User already authenticated, redirecting to dashboard");
      setIsRedirecting(true);
      setRedirectAttempts((prev) => prev + 1);

      // Use replace to avoid back button issues
      router.replace("/admin/dashboard");

      // Fallback redirect after 3 seconds if the first redirect failed
      const fallbackTimer = setTimeout(() => {
        console.log("Fallback redirect triggered");
        if (redirectAttempts < 1) {
          window.location.href = "/admin/dashboard";
        } else {
          // If multiple redirects failed, reset state to show form
          console.log("Multiple redirects failed, showing login form");
          setIsRedirecting(false);
          setRedirectAttempts(0);
        }
      }, 3000);

      return () => clearTimeout(fallbackTimer);
    }
  }, [authenticated, authLoading, router, isRedirecting, redirectAttempts]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("Attempting login with:", { email, password: "***" });
      const result = await login(email, password);
      console.log("Login result:", result);

      if (result.success) {
        console.log("Login successful, redirecting to dashboard");
        setIsRedirecting(true);
        router.replace("/admin/dashboard");
      } else {
        console.log("Login failed:", result.error);
        setError(result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Terjadi kesalahan saat login");
    }

    setLoading(false);
  };

  // Jika masih loading auth pertama kali, tampilkan loading
  if (authLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
          <p className="mt-4 text-[1.4rem] text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // Jika sudah authenticated atau sedang redirect, tampilkan loading
  if ((authenticated && !loading) || isRedirecting) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
          <p className="mt-4 text-[1.4rem] text-gray-600">
            Mengalihkan ke dashboard...
          </p>
          <div className="mt-4 flex flex-col items-center gap-2">
            <button
              className="text-[1.2rem] text-blue-600 underline cursor-pointer hover:text-blue-800"
              onClick={() => (window.location.href = "/admin/dashboard")}
            >
              Klik di sini jika tidak teralihkan secara otomatis
            </button>
            <button
              className="text-[1.1rem] text-gray-600 underline cursor-pointer hover:text-gray-800"
              onClick={() => {
                setIsRedirecting(false);
                setRedirectAttempts(0);
              }}
            >
              Atau kembali ke halaman login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section>
      <form onSubmit={handleSignIn}>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center mb-[1.8rem]">
            <Image
              src="/Logo_Seyegan.png"
              width={120}
              height={120}
              alt="Logo Seyegan"
            />
            <h1 className="text-[1.8rem] md:text-[2rem] lg:text-[2.4rem] font-[600] text-center">
              SMP Muhammadiyah 1 Seyegan
            </h1>
            <p className="text-[1.4rem] text-[#000]/75">Masuk halaman Admin</p>
          </div>
          {error && (
            <div className="bg-red-100 text-[1.4rem] border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <div className="flex flex-col gap-[1.8rem]">
            <div className="flex flex-col text-[1.4rem] gap-[.8rem]">
              <label>Email</label>
              <input
                placeholder="example@gmail.com"
                required
                className="border border-[#000]/50 px-[1.4rem] py-[.8rem] rounded-xl focus:outline-[var(--primary-color)]"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-[1.4rem] gap-[.8rem]">
              <label>Password</label>
              <input
                placeholder="password akun"
                required
                className="border border-[#000]/50 px-[1.4rem] py-[.8rem] rounded-xl focus:outline-[var(--primary-color)]"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color-tint)] disabled:opacity-50 disabled:cursor-not-allowed text-[#fff] text-[1.4rem] font-[500] py-[1rem] rounded-xl cursor-pointer"
            >
              {loading ? "Sedang masuk..." : "Masuk"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignInPage;
