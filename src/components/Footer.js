"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo_Seyegan from "../../public/Logo_Seyegan.png";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import axios from "axios";

const Footer = () => {
  const [kontakData, setKontakData] = useState({
    alamat:
      "Jl. Solo - Yogya Km. 12, Seyegan, Sleman, Daerah Istimewa Yogyakarta 55561",
    telepon: "(0274) 773029",
    email: "info@smpmuh1seyegan.sch.id",
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });

  useEffect(() => {
    fetchKontakData();
  }, []);

  const fetchKontakData = async () => {
    try {
      const response = await axios.get("/api/kontak");
      const result = response.data;

      if (result.success && result.data) {
        setKontakData({
          alamat:
            result.data.alamat ||
            "Jl. Solo - Yogya Km. 12, Seyegan, Sleman, Daerah Istimewa Yogyakarta 55561",
          telepon: result.data.telepon || "(0274) 773029",
          email: result.data.email || "info@smpmuh1seyegan.sch.id",
          facebook: result.data.facebook || "",
          instagram: result.data.instagram || "",
          youtube: result.data.youtube || "",
          tiktok: result.data.tiktok || "",
        });
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };
  return (
    <footer className="bg-[#30308A] text-white">
      <div className="max-w-[120rem] mx-auto px-4 py-[6rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Image
                src={Logo_Seyegan}
                alt="Logo SMP Muhammadiyah 1 Seyegan"
                width={50}
                height={50}
                className="mr-3"
              />
              <div>
                <h3 className="text-[1.8rem] font-bold text-white">
                  SMP Muhammadiyah 1
                </h3>
                <p className="text-[1.4rem] text-gray-300">Seyegan</p>
              </div>
            </div>
            <p className="text-justify text-white/80 text-[1.4rem] leading-relaxed mb-6">
              Sekolah menengah pertama yang berkomitmen mengembangkan potensi
              siswa berdasarkan nilai-nilai Islam dan prestasi akademik yang
              unggul.
            </p>

            <div className="flex space-x-4">
              {kontakData.facebook && (
                <Link
                  href={kontakData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-[.15s]"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
              )}
              {kontakData.instagram && (
                <Link
                  href={kontakData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-[.15s]"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
              )}
              {kontakData.youtube && (
                <Link
                  href={kontakData.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-[.15s]"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
              )}
              {kontakData.tiktok && (
                <Link
                  href={kontakData.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-[.15s]"
                  aria-label="TikTok"
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-[1.8rem] font-semibold mb-6 text-yellow-400">
              Menu Utama
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  href="/berita-pengumuman/berita"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Berita
                </Link>
              </li>
              <li>
                <Link
                  href="/berita-pengumuman/pengumuman"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Pengumuman
                </Link>
              </li>
              <li>
                <Link
                  href="/program-kegiatan/ekstrakurikuler"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Ekstrakurikuler
                </Link>
              </li>
              <li>
                <Link
                  href="/program-kegiatan/outing-class"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Outing Class
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[1.8rem] font-semibold mb-6 text-yellow-400">
              Tentang Sekolah
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tentang-sekolah/sambutan"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Sambutan Kepala Sekolah
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-sekolah/visi-misi"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Visi & Misi
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-sekolah/sejarah"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Sejarah
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-sekolah/filosofi"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Filosofi
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-sekolah/struktur"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Struktur Organisasi
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-sekolah/fasilitas"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Fasilitas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[1.8rem] font-semibold mb-6 text-yellow-400">
              Program Sekolah
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/program-kegiatan/ekstrakurikuler"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Ekstrakurikuler
                </Link>
              </li>
              <li>
                <Link
                  href="/program-kegiatan/outing-class"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Outing Class
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Galeri Kegiatan
                </Link>
              </li>
              <li>
                <Link
                  href="/berita-pengumuman/berita"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Berita Terkini
                </Link>
              </li>
              <li>
                <Link
                  href="/berita-pengumuman/pengumuman"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-[.15s] text-[1.4rem]"
                >
                  Pengumuman Sekolah
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[1.8rem] font-semibold mb-6 text-yellow-400">
              Kontak Kami
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-[1.4rem] leading-relaxed">
                    {kontakData.alamat}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-[1.4rem]">
                    {kontakData.telepon}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-[1.4rem]">
                    {kontakData.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-[120rem] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-[1.3rem]">
                © 2025 SMP Muhammadiyah 1 Seyegan. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/tentang-sekolah/sambutan"
                className="text-white/60 hover:text-yellow-400 text-[1.3rem] transition-colors duration-[.15s]"
              >
                Sambutan Kepala Sekolah
              </Link>
              <Link
                href="/tentang-sekolah/visi-misi"
                className="text-white/60 hover:text-yellow-400 text-[1.3rem] transition-colors duration-[.15s]"
              >
                Visi & Misi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
