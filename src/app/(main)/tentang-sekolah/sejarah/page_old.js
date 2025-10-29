"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";

const Sejarah = () => {
  const [sejarah, setSejarah] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSejarah = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/tentang-sekolah/sejarah");
        const result = await response.json();
        
        if (result.success) {
          setSejarah(result.data);
        } else {
          setError(result.message || "Gagal memuat data sejarah");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat memuat data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSejarah();
  }, []);

  if (isLoading) {
    return (
      <section className="pt-[7.4rem]">
        <div className="py-[9.6rem]">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <Title>Sejarah</Title>
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
            <Title>Sejarah</Title>
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
    judul: "Sejarah",
    konten: `1967: SMP Muhammadiyah 1 Seyegan berdiri pada tahun 1967 menempati rumah tokoh masyarakat (Bapak Jono Wikoro) di Dusun Barak, Kalurahan Margoluwih, Kecamatan Seyegan. Dengan Kepala Sekolah Bapak Drs. Soebardi, M.Pd. dibantu oleh Bapak Soeprapto.

1975: Sehubungan rumah/gedung tersebut akan didirikan Sekolah Dasar (SD), maka pada tahun 1975 SMP Muhammadiyah Seyegan pindah di Dusun Gendengan, Kalurahan Margodadi, Kecamatan Seyegan dan juga menempati rumah tokoh masyarakat (Bapak Drs. Ponidi).

1976: Pimpinan Cabang Muhammadiyah Seyegan membangun gedung 3 (tiga) lokal dengan biaya gotong royong bersama Pimpinan Ranting Muhammadiyah se-Seyegan. Gedung tersebut menempati Tanah Sultan Ground, di Dusun Grogol, Kalurahan Margodadi, Kecamatan Seyegan, Kabupaten Sleman.

1977: SMP Muhammadiyah Seyegan pindah menempati gedung baru di Grogol, Margodadi, Seyegan dengan 3 lokal. Karena jumlah rombongan belajar (rombel) pada waktu itu mencapai 6 rombel, maka gedung 3 lokal tersebut disekat gedek/bambu menjadi 7 ruang, yaitu 1 ruang untuk kantor dan 6 ruang untuk kelas.

Di Dusun Cibuk Kidul, Kalurahan Margoluwih, Kecamatan Seyegan, berdiri SMP Muhammadiyah 2 Seyegan yang merupakan pindahan dari pinggiran kota Yogyakarta. Namun tidak berapa lama, SMP Muhammadiyah 2 tersebut mengalami kekurangan siswa. Akhirnya, SMP Muhammadiyah 2 Seyegan dinyatakan ditutup dan siswanya digabung dengan SMP Muhammadiyah 1 Seyegan.`
  };

  const displayData = sejarah || defaultContent;

  return (
    <section className="pt-[7.4rem]">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <Title>{displayData.judul}</Title>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6 text-[1.6rem] leading-relaxed text-gray-700">
              {displayData.konten.split('\n\n').map((paragraph, index) => {
                // Check if paragraph starts with year format like "1967:"
                const yearMatch = paragraph.match(/^(\d{4}:)/);
                if (yearMatch) {
                  const year = yearMatch[1];
                  const content = paragraph.substring(year.length).trim();
                  return (
                    <p key={index}>
                      <strong>{year}</strong> {content}
                    </p>
                  );
                }
                return (
                  <p key={index}>
                    {paragraph}
                  </p>
                );
              })}
              </p>

              <p className="italic text-gray-800 font-medium">
                Demikianlah sejarah singkat berdirinya SMP Muhammadiyah 1
                Seyegan, sekolah calon pemimpin yang terus berkembang hingga
                saat ini.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sejarah;
