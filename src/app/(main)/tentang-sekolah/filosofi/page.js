"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";

const FilosofiPage = () => {
  const [filosofi, setFilosofi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilosofi = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/tentang-sekolah/filosofi");

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
          setFilosofi(result.data);
        } else {
          setError(result.message || "Gagal memuat data filosofi");
        }
      } catch (err) {
        console.error("Error fetching filosofi:", err);
        setError("Terjadi kesalahan saat memuat data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilosofi();
  }, []);

  if (isLoading) {
    return (
      <section className="pt-[7.4rem]">
        <div className="py-[9.6rem]">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <Title>Filosofi</Title>
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
            <Title>Filosofi</Title>
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
    judul: "Filosofi",
    konten: `Mendidik manusia berakhlak mulia, cerdas, dan berkemajuan dengan mengintegrasikan ajaran Islam, nilai-nilai kemanusiaan, ilmu pengetahuan, serta teknologi untuk membentuk kader Muhammadiyah dan agen perubahan bagi masyarakat.

Filosofi pendidikan di SMP Muhammadiyah 1 Seyegan bertujuan melahirkan individu yang taat pada tauhid, menguasai sains dan seni, serta aktif melakukan amar ma'ruf nahi munkar.

Melalui pendekatan holistik, sekolah berupaya mengembangkan potensi siswa dalam aspek spiritual, intelektual, emosional, dan sosial. Setiap siswa didorong untuk menjadi pribadi yang tidak hanya unggul secara akademik, tetapi juga memiliki karakter yang kuat berdasarkan nilai-nilai Islam.

Filosofi ini menekankan pentingnya keseimbangan antara kehidupan dunia dan akhirat, dimana siswa diharapkan mampu menjadi khalifah di bumi yang bertanggung jawab terhadap dirinya, keluarga, masyarakat, dan lingkungan.

Dengan landasan filosofi yang kuat, SMP Muhammadiyah 1 Seyegan berkomitmen menghasilkan generasi yang siap menghadapi tantangan zaman dengan tetap berpegang teguh pada nilai-nilai keislaman dan kemuhammadiyahan.`,
  };

  const displayData = filosofi || defaultContent;

  return (
    <section className="pt-[7.4rem]">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <Title>{displayData.judul}</Title>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6 text-[1.6rem] leading-relaxed text-gray-700">
              {displayData.konten.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilosofiPage;
