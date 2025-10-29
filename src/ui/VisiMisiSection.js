"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";
import Link from "next/link";

const VisiMisiSectionDynamic = () => {
  const [visiMisi, setVisiMisi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisiMisi = async () => {
      try {
        const response = await fetch("/api/tentang-sekolah/visi-misi");

        // Check if response is ok and content-type is JSON
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const result = await response.json();
        if (result.success && result.data) {
          setVisiMisi(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch visi misi:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisiMisi();
  }, []);

  const defaultContent = {
    visi: `"Terwujudnya Murid yang Islami, Berintegritas, dan Berprestasi"`,
    misi: `Menanamkan nilai-nilai akidah yang lurus dan kuat dalam kehidupan sehari-hari.

Melakukan pembelajaran yang menekankan praktek cara beribadah yang baik.

Membiasakan akhlak yang baik dan menghindari akhlak buruk.

Membiasakan membaca Al-Qur'an dan menghafalnya.

Membiasakan berbuat baik kepada sesama untuk bermanfaat bagi masyarakat.

Membekali siswa dengan wawasan berkemajuan, menguasai IPTEK dan IMTAQ yang seimbang.`,
  };

  const displayData = visiMisi || defaultContent;

  // Parse visi untuk mendapatkan statement utama
  const visiLines = displayData.visi.split("\n\n");
  const mainVisi = visiLines[0].replace(/"/g, "");

  // Parse misi menjadi array
  const misiItems = displayData.misi.split("\n\n").slice(0, 6); // Ambil maksimal 6 misi

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-[8rem] lg:py-[10.8rem]">
        <div className="max-w-[120rem] mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-32 mx-auto mb-8"></div>
              <div className="h-6 bg-gray-300 rounded w-96 mx-auto mb-12"></div>
              <div className="h-8 bg-gray-300 rounded w-32 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-48 bg-gray-300 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[120rem] mx-auto py-[8rem] lg:py-[10.8rem] px-4">
        <div className="flex flex-col w-full items-center gap-12 lg:gap-[6.4rem] mb-[4rem] lg:mb-[5.6rem]">
          {/* Visi Section */}
          <div className="border-b-2 border-[var(--primary-color)]/20 pb-8 lg:pb-[3.2rem] w-full">
            <Title>Visi</Title>
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border-x-4 border-[var(--primary-color)] max-w-4xl mx-auto">
              <p className="text-[1.6rem] md:text-[1.8rem] lg:text-[2rem] text-gray-700 leading-relaxed text-center">
                <i className="text-[var(--primary-color)] font-medium">
                  &quot;{mainVisi}&quot;
                </i>
              </p>
            </div>
          </div>

          {/* Misi Section */}
          <div className="border-b-2 border-[var(--primary-color)]/20 pb-8 lg:pb-[3.2rem] w-full">
            <Title>Misi</Title>
            <div>
              {misiItems.map((misi, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-[var(--primary-color)]/20 hover:border-[var(--primary-color)] p-6 lg:p-[3.2rem] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-[.15s] group"
                >
                  <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-4 transition-transform duration-[.15s]">
                    <span className="text-white font-bold text-[1.8rem]">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-justify text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] text-gray-700 leading-relaxed">
                    {misi}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tujuan Section Preview */}
          <div className="w-full">
            <Title>Tujuan</Title>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 lg:p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
              <p className="text-[1.6rem] text-gray-700 leading-relaxed mb-6 text-center">
                Sejalan dengan tujuan pendidikan menengah dalam Sistem
                Pendidikan Nasional yaitu meletakkan dasar kecerdasan,
                pengetahuan, kepribadian, akhlak mulia, serta keterampilan untuk
                hidup mandiri dan mengikuti pendidikan lebih lanjut.
              </p>
              <div className="text-center">
                <Link
                  href="/tentang-sekolah/visi-misi"
                  className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors text-[1.4rem] font-medium"
                >
                  Lihat Selengkapnya
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisiSectionDynamic;
