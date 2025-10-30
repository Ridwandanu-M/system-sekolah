"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import Title from "./Title";
import axios from "axios";

const KontakSection = () => {
  const [kontakData, setKontakData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchKontakData();
  }, []);

  const fetchKontakData = async () => {
    try {
      const response = await axios.get("/api/kontak");
      const result = response.data;

      if (result.success && result.data) {
        setKontakData(result.data);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-[4rem] lg:py-[6rem] bg-white">
        <div className="max-w-[120rem] mx-auto px-4">
          <div className="text-center mb-[3rem] lg:mb-[5rem]">
            <Title>Kontak Kami</Title>
            <p className="text-[1.4rem] lg:text-[1.6rem] text-gray-600 max-w-2xl mx-auto">
              Hubungi kami untuk informasi lebih lanjut
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 rounded-2xl p-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mb-4"></div>
                <div className="bg-gray-200 animate-pulse h-4 rounded mb-2"></div>
                <div className="bg-gray-200 animate-pulse h-3 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-[4rem] lg:py-[6rem] bg-white">
      <div className="max-w-[120rem] mx-auto px-4">
        <div className="text-center mb-[3rem] lg:mb-[5rem]">
          <Title>Kontak Kami</Title>
          <p className="text-[1.4rem] lg:text-[1.6rem] text-gray-600 max-w-2xl mx-auto">
            Hubungi kami untuk informasi lebih lanjut tentang SMP Muhammadiyah 1
            Seyegan
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-[3rem] lg:mb-[5rem]">
          <div className="flex flex-col gap-[2.4rem]">
            {kontakData?.alamat && (
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[1.6rem] font-semibold text-gray-800 mb-2">
                    Alamat Sekolah
                  </h3>
                  <p className="text-[1.4rem] text-gray-600 leading-relaxed">
                    {kontakData.alamat}
                  </p>
                </div>
              </div>
            )}

            {kontakData?.telepon && (
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[1.6rem] font-semibold text-gray-800 mb-2">
                    Telepon
                  </h3>
                  <p className="text-[1.4rem] text-gray-600 mb-1">
                    {kontakData.telepon}
                  </p>
                </div>
              </div>
            )}

            {kontakData?.email && (
              <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-[1.6rem] font-semibold text-gray-800 mb-2">
                    Email
                  </h3>
                  <p className="text-[1.4rem] text-gray-600 mb-1">
                    {kontakData.email}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 bg-[var(--primary-color)]">
              <h3 className="text-[2rem] font-bold text-white mb-2">
                Lokasi Sekolah
              </h3>
              <p className="text-white/90 text-[1.4rem]">
                Temukan kami di peta
              </p>
            </div>

            <div className="relative">
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.468144733825!2d110.29958377595449!3d-7.740064992278495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af6419da16b41%3A0x5118fe3a89cb7ebf!2sSMP%20Muhammadiyah%201%20Seyegan!5e0!3m2!1sid!2sid!4v1761749246018!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-b-2xl"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[var(--primary-color)] rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-[2.4rem] lg:text-[3rem] font-bold text-white mb-4">
            Ikuti Media Sosial Kami
          </h3>
          <p className="text-[1.4rem] lg:text-[1.6rem] text-white/90 mb-8 max-w-2xl mx-auto">
            Dapatkan update terbaru tentang kegiatan sekolah, prestasi siswa,
            dan informasi penting lainnya
          </p>

          {(kontakData?.facebook ||
            kontakData?.instagram ||
            kontakData?.youtube ||
            kontakData?.tiktok) && (
            <div className="flex justify-center space-x-6 mb-8">
              {kontakData.facebook && (
                <Link
                  href={kontakData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/20 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-8 h-8 text-white group-hover:text-[var(--primary-color)] transition-colors duration-300" />
                </Link>
              )}
              {kontakData.instagram && (
                <Link
                  href={kontakData.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/20 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-8 h-8 text-white group-hover:text-[var(--primary-color)] transition-colors duration-300" />
                </Link>
              )}
              {kontakData.youtube && (
                <Link
                  href={kontakData.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/20 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="YouTube"
                >
                  <Youtube className="w-8 h-8 text-white group-hover:text-[var(--primary-color)] transition-colors duration-300" />
                </Link>
              )}
              {kontakData.tiktok && (
                <Link
                  href={kontakData.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 bg-white/20 hover:bg-yellow-500 rounded-full flex items-center justify-center transition-all duration-300 group"
                  aria-label="TikTok"
                >
                  <svg
                    className="w-8 h-8 text-white group-hover:text-[var(--primary-color)] transition-colors duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default KontakSection;
