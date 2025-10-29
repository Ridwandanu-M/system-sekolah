"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";

const VisiMisiPage = () => {
  const [visiMisi, setVisiMisi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisiMisi = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/tentang-sekolah/visi-misi");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const result = await response.json();

        if (result.success) {
          setVisiMisi(result.data);
        } else {
          setError(result.message || "Gagal memuat data visi misi");
        }
      } catch (err) {
        console.error("Error fetching visi misi:", err);
        setError("Terjadi kesalahan saat memuat data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisiMisi();
  }, []);

  if (isLoading) {
    return (
      <section className="pt-[7.4rem]">
        <div className="py-[9.6rem]">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <Title>Visi, Misi & Tujuan</Title>
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
            <Title>Visi, Misi & Tujuan</Title>
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
    visi: `"Terwujudnya Murid yang Islami, Berintegritas, dan Berprestasi"

Islami: Aqidah yang lurus dan kuat, memahami dan menjalankan ibadah dengan baik, akhlak mulia dalam kehidupan sehari-hari, mampu membaca, menghafal, dan mengamalkan Al-Qur'an, bermanfaat bagi masyarakat, berkemajuan dengan menguasai IPTEK dan IMTAQ.

Berintegritas: Bertanggung jawab terhadap diri dan lingkungan, jujur dalam perkataan dan perbuatan, disiplin dalam kehidupan sehari-hari, sopan dan santun dalam tutur kata, peduli terhadap lingkungan sekitar.

Berprestasi: Berprestasi dalam bidang akademik seperti lomba sains, IPA, matematika, dan lomba keagamaan (MTQ, Olympicad). Serta berprestasi dalam bidang non-akademik seperti olahraga (O2SN, YKTC, POPDA) dan seni budaya.`,
    misi: `Menanamkan nilai-nilai akidah yang lurus dan kuat dalam kehidupan sehari-hari.

Melakukan pembelajaran yang menekankan praktek cara beribadah yang baik.

Membiasakan akhlak yang baik dan menghindari akhlak buruk.

Membiasakan membaca Al-Qur'an dan menghafalnya.

Membiasakan berbuat baik kepada sesama untuk bermanfaat bagi masyarakat.

Membekali siswa dengan wawasan berkemajuan, menguasai IPTEK dan IMTAQ yang seimbang.

Menanamkan nilai tanggung jawab terhadap diri, keluarga, dan lingkungan.

Menanamkan nilai jujur dalam perkataan dan perbuatan.

Menanamkan nilai disiplin dalam kehidupan sehari-hari.

Membiasakan sikap sopan dan santun dalam tutur kata dan perbuatan.

Membiasakan sikap peduli lingkungan dengan menjaga kebersihan.

Melatih siswa mengikuti berbagai lomba untuk memotivasi berprestasi.`,
  };

  const displayData = visiMisi || defaultContent;

  return (
    <section className="pt-[7.4rem]">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <Title>Visi, Misi & Tujuan</Title>

          {/* Visi Section */}
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-6">
                Visi
              </h2>
              <div className="space-y-6 text-[1.6rem] leading-relaxed text-gray-700">
                {displayData.visi.split("\n\n").map((section, index) => {
                  if (index === 0) {
                    return (
                      <p
                        key={index}
                        className="text-[1.8rem] font-semibold text-center mb-8"
                      >
                        {section}
                      </p>
                    );
                  } else {
                    const [title, ...contentParts] = section.split(": ");
                    const content = contentParts.join(": ");
                    return (
                      <div key={index}>
                        <h3 className="whitespace-pre-line mb-3">{title}</h3>
                        <p>{content}</p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-6">
                Misi
              </h2>
              <div className="space-y-4 text-[1.6rem] leading-relaxed text-gray-700 whitespace-pre-line">
                {displayData.misi.split("\n\n").map((misiItem, index) => (
                  <p key={index}>{misiItem}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Tujuan Section - Static content */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-6">
                Tujuan
              </h2>
              <div className="space-y-6 text-[1.6rem] leading-relaxed text-gray-700">
                <p>
                  Sejalan dengan tujuan pendidikan menengah dalam Sistem
                  Pendidikan Nasional yaitu meletakkan dasar kecerdasan,
                  pengetahuan, kepribadian, akhlak mulia, serta keterampilan
                  untuk hidup mandiri dan mengikuti pendidikan lebih lanjut,
                  pendidikan di SMP Muhammadiyah 1 Seyegan diarahkan untuk:
                </p>

                <p>
                  Meningkatkan pencapaian nilai rata-rata Ujian Sekolah 80 dan
                  nilai rata-rata ASPD 50. Membentuk lulusan yang memiliki
                  aqidah lurus, berakhlak mulia, dan mampu mengamalkan
                  Al-Qur&apos;an. Membentuk lulusan berkarakter tanggung jawab,
                  jujur, disiplin, dan sopan.
                </p>

                <p>
                  Menyusun Kurikulum Operasional SMP Muhammadiyah 1 Seyegan dan
                  menyusun administrasi pembelajaran. Melaksanakan pembelajaran
                  yang baik, menyenangkan, dan bermutu. Mengembangkan strategi
                  pembelajaran diferensiasi dengan pendekatan saintifik dan
                  PAIKEM, didukung Media Interaktif Kreatif Inovatif dan
                  Rekreatif (MIKIR) dengan Kurikulum Merdeka.
                </p>

                <p>
                  Mengupayakan 100% guru dan karyawan memiliki SK GTP dan
                  mengupayakan 90% guru memiliki NUPTK. Memiliki sarana
                  pembelajaran lengkap: LCD proyektor di tiap kelas, papan
                  tulis, dan meja belajar yang memadai. Lingkungan sekolah
                  bersih dan nyaman.
                </p>

                <p>
                  Melaksanakan administrasi keuangan dengan tertib (transparan
                  dan akuntabel) menggunakan aplikasi ARKAS dan SIP Lah.
                  Meningkatkan kesejahteraan guru dan karyawan. Mengembangkan
                  penilaian Literasi Numerasi dengan konsep belajar tuntas
                  (mastery learning) dan pemanfaatan TIK.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisiPage;
