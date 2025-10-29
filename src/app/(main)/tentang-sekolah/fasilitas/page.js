"use client";

import Title from "@/components/Title";
import { useEffect, useState } from "react";

const FasilitasPage = () => {
  const [fasilitas, setFasilitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFasilitas = async () => {
      try {
        const response = await fetch("/api/tentang-sekolah/fasilitas");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const data = await response.json();

        if (data.success) {
          setFasilitas(data.data || []);
        } else {
          setError(data.message || "Gagal memuat data fasilitas");
        }
      } catch (err) {
        console.error("Error fetching fasilitas:", err);
        setError("Gagal memuat data fasilitas");
      } finally {
        setLoading(false);
      }
    };

    fetchFasilitas();
  }, []);

  if (loading) {
    return (
      <section className="pt-[7.4rem] pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--primary-color)] mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data fasilitas...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-[7.4rem] pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-12">
        <div className="text-center mb-16">
          <Title>Fasilitas</Title>
          <p className="text-[1.6rem] text-gray-600 max-w-3xl mx-auto">
            Fasilitas penunjang pembelajaran di SMP Muhammadiyah 1 Seyegan
          </p>
        </div>

        <div className="max-w-[100rem] grid grid-cols-2 mx-auto">
          {error ? (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6 text-center">
              <p className="text-red-700 text-[1.6rem]">{error}</p>
            </div>
          ) : fasilitas.length === 0 ? (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-xl p-6 text-center">
              <p className="text-yellow-700 text-[1.6rem]">
                Belum ada data fasilitas tersedia.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {fasilitas.map((item, index) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border-l-4 border-[var(--primary-color)] hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[var(--primary-color)] text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-[1.8rem]">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-[2.2rem] md:text-[2.4rem] font-bold text-[var(--primary-color)] mb-4">
                        {item.nama}
                      </h2>
                    </div>
                  </div>

                  <div className="pl-16">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <p className="text-[1.6rem] text-gray-700 leading-relaxed whitespace-pre-line">
                        {item.deskripsi}
                      </p>
                    </div>

                    <div className="mt-4 text-right">
                      <span className="text-[1.3rem] text-gray-500 italic">
                        Diperbarui{" "}
                        {new Date(item.updatedAt).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {fasilitas.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-md p-6 border-l-4 border-[var(--primary-color)] max-w-5xl mx-auto">
            <div className="text-center">
              <h3 className="text-[1.8rem] font-bold text-[var(--primary-color)] mb-2">
                Total Fasilitas
              </h3>
              <p className="text-[1.6rem] text-gray-700">
                SMP Muhammadiyah 1 Seyegan memiliki{" "}
                <span className="font-bold text-[var(--primary-color)]">
                  {fasilitas.length}
                </span>{" "}
                fasilitas untuk mendukung kegiatan pembelajaran dan pengembangan
                siswa.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FasilitasPage;
