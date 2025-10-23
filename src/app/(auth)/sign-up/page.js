"use client";

import Image from "next/image";
import { useState } from "react";

const SignUpPage = () => {
  return (
    <section>
      <form>
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
            <p className="text-[1.4rem] text-[#000]/75">Buat akun pengguna</p>
          </div>
          <div className="flex flex-col gap-[1.8rem]">
            <div className="flex flex-col text-[1.4rem] gap-[.8rem]">
              <label>Username</label>
              <input
                placeholder="Nama pengguna"
                required
                className="border border-[#000]/50 px-[1.4rem] py-[.8rem] rounded-xl focus:outline-[var(--primary-color)]"
                name="username"
                type="text"
              />
            </div>
            <div className="flex flex-col text-[1.4rem] gap-[.8rem]">
              <label>Email</label>
              <input
                placeholder="example@gmail.com"
                required
                className="border border-[#000]/50 px-[1.4rem] py-[.8rem] rounded-xl focus:outline-[var(--primary-color)]"
                name="email"
                type="email"
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
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color-tint)] text-[#fff] text-[1.4rem] font-[500] py-[1rem] rounded-xl cursor-pointer"
            >
              Buat Akun
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUpPage;
