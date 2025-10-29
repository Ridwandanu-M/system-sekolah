"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";
import Link from "next/link";

const VisiMisiSectionDynamic = () => {
  const [visiMisi, setVisiMisi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("visi");

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
    tujuan: `Sejalan dengan tujuan pendidikan menengah dalam Sistem Pendidikan Nasional yaitu meletakkan dasar kecerdasan, pengetahuan, kepribadian, akhlak mulia, serta keterampilan untuk hidup mandiri dan mengikuti pendidikan lebih lanjut.

Mengembangkan potensi peserta didik agar menjadi manusia yang beriman dan bertakwa kepada Tuhan Yang Maha Esa, berakhlak mulia, sehat, berilmu, cakap, kreatif, mandiri, dan menjadi warga negara yang demokratis serta bertanggung jawab.

Mempersiapkan peserta didik untuk melanjutkan pendidikan ke jenjang yang lebih tinggi dengan bekal pengetahuan, keterampilan, dan karakter yang kuat.`,
  };

  const tabs = [
    { id: "visi", label: "Visi" },
    { id: "misi", label: "Misi" },
    { id: "tujuan", label: "Tujuan" },
  ];

  const displayData = visiMisi || defaultContent;

  const visiText = displayData.visi || defaultContent.visi;
  const visiLines = visiText.split("\n\n");
  const mainVisi = visiLines[0].replace(/"/g, "");

  const misiText = displayData.misi || defaultContent.misi;
  const misiItems = misiText.split("\n\n").slice(0, 6);

  const renderVisiContent = () => (
    <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border-l-4 border-[var(--primary-color)] max-w-4xl mx-auto">
      <div className="text-center">
        <p className="text-[1.8rem] md:text-[2rem] lg:text-[2.2rem] text-gray-700 leading-relaxed">
          <i className="text-[var(--primary-color)] font-medium">
            &quot;{mainVisi}&quot;
          </i>
        </p>
      </div>
    </div>
  );

  const renderMisiContent = () => (
    <div className="max-w-[90rem] mx-auto space-y-6">
      {misiItems.map((misi, index) => (
        <div
          key={index}
          className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border-l-4 border-[var(--primary-color)]"
        >
          <div>
            <p className="text-[1.4rem] md:text-[1.5rem] text-gray-700 leading-relaxed whitespace-pre-line">
              {misi}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTujuanContent = () => {
    const tujuanText = displayData.tujuan || defaultContent.tujuan;
    const tujuanItems = tujuanText.split("\n\n");

    return (
      <div className="max-w-[120rem] mx-auto ">
        <div className="flex gap-[1.8rem]">
          {tujuanItems.map((tujuan, index) => (
            <div
              key={index}
              className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border-l-4 border-[var(--primary-color)] w-[40rem]"
            >
              <div>
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-[1.6rem]">
                    {index + 1}
                  </span>
                </div>
                <p className="text-[1.4rem] md:text-[1.5rem] text-gray-700 leading-relaxed">
                  {tujuan}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
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
    );
  };

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-[8rem] lg:py-[10.8rem]">
        <div className="max-w-[120rem] mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-8"></div>
              <div className="flex justify-center gap-4 mb-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-12 bg-gray-300 rounded-lg w-32"
                  ></div>
                ))}
              </div>
              <div className="h-64 bg-gray-300 rounded-xl max-w-4xl mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[120rem] mx-auto px-4">
        <div className="text-center mb-12">
          <Title>Visi, Misi & Tujuan</Title>
          <p className="text-[1.6rem] text-gray-600 max-w-3xl mx-auto">
            Landasan filosofis dan arah pengembangan SMP Muhammadiyah 1 Seyegan
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl shadow-lg border flex gap-[1.8rem] p-[1.8rem]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-[3.2rem] py-[.8rem] rounded-xl font-medium text-[1.4rem] flex items-center ${
                  activeTab === tab.id
                    ? "bg-[var(--primary-color)] text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-[var(--primary-color)] hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[400px]">
          <div className="transition-all duration-500 ease-in-out">
            {activeTab === "visi" && (
              <div className="animate-fadeIn">{renderVisiContent()}</div>
            )}
            {activeTab === "misi" && (
              <div className="animate-fadeIn">{renderMisiContent()}</div>
            )}
            {activeTab === "tujuan" && (
              <div className="animate-fadeIn">{renderTujuanContent()}</div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
};

export default VisiMisiSectionDynamic;
