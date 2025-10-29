"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";
import Image from "next/image";

const Sambutan = () => {
  const [sambutan, setSambutan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSambutan = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/tentang-sekolah/sambutan");

        // Check if response is ok and content-type is JSON
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const result = await response.json();

        if (result.success) {
          setSambutan(result.data);
        } else {
          setError(result.message || "Gagal memuat data sambutan");
        }
      } catch (err) {
        console.error("Error fetching sambutan:", err);
        setError("Terjadi kesalahan saat memuat data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSambutan();
  }, []);

  if (isLoading) {
    return (
      <section className="pt-[7.4rem]">
        <div className="py-[9.6rem]">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <Title>Sambutan Kepala Sekolah</Title>
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-[7.4rem]">
        <div className="py-[9.6rem]">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <Title>Sambutan Kepala Sekolah</Title>
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default content jika tidak ada data di database
  const defaultContent = {
    judul: "Sambutan Kepala Sekolah",
    konten: `Alhamdulillahirabbil 'aalamiin segala puji bagi Allah Tuhan semesta alam. Sholawat dan salam senantiasa tercurah kepada junjungan kita nabi besar Muhammad SAW.

Selamat datang di website SMP Muhammadiyah 1 Seyegan. Website ini hadir sebagai jembatan komunikasi dan sumber informasi yang komprehensif bagi seluruh civitas akademika, orang tua/wali siswa, siswa aktif, alumni, dan masyarakat luas.

Melalui platform digital ini, kami berkomitmen untuk menyajikan berbagai informasi penting mulai dari profil sekolah, sejarah perjalanan, program pembelajaran, hingga kegiatan kesiswaan. Website ini juga memuat informasi lengkap tentang guru dan tenaga kependidikan (GTK), data siswa, administrasi sekolah, serta dokumentasi berbagai kegiatan seperti lomba dan kegiatan keagamaan.

Kami akan terus melakukan perbaikan dan penyempurnaan secara berkala agar website ini semakin menarik, informatif, dan bermanfaat. Harapan kami, platform ini dapat menjadi sarana efektif dalam mendukung kemajuan pendidikan di SMP Muhammadiyah 1 Seyegan.

Semoga Allah SWT senantiasa memberikan kemudahan untuk setiap usaha kita dalam memajukan sekolah yang kita cintai ini. Aamiin Ya Rabbal 'Alamin.`,
  };

  const displayData = sambutan || defaultContent;

  return (
    <section className="pt-[7.4rem]">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <Title>{displayData.judul}</Title>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="space-y-6 text-[1.6rem] leading-relaxed text-gray-700">
                  {displayData.konten.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[var(--primary-color)] p-6 text-white text-center">
                  <h3 className="text-[2rem] font-bold">Kepala Sekolah</h3>
                  <p className="text-[1.2rem] opacity-90 mt-1">
                    SMP Muhammadiyah 1 Seyegan
                  </p>
                </div>
                <div className="p-6">
                  <div className="relative w-full h-[28rem] rounded-lg overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src="/Kepala_Sekolah_Seyegan.png"
                      alt="Kepala Sekolah SMP Muhammadiyah 1 Seyegan"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[1.6rem] font-bold text-gray-800 mb-2">
                      Rochmadi, S.Sos.I.
                    </p>
                    <p className="text-[1.2rem] text-gray-600 italic">
                      &quot;Islami, Berintegritas, Berprestasi&quot;
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sambutan;
