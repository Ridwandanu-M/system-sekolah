"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/admin/sign-in", {
        username: email,
        password,
      });

      if (response.status === 200) {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Email atau password salah");
      } else {
        setError("Terjadi kesalahan saat login");
      }
      console.error("Error saat login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSignIn}>
        <div className="fixed top-1/2 left-1/2 -translate-1/2">
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
