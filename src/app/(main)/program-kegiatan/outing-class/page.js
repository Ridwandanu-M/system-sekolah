"use client";

import Title from "@/components/Title";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";

const OutingClass = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [outingClassData, setOutingClassData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutingClass = async () => {
      try {
        const response = await fetch("/api/outing-class");
        const result = await response.json();

        if (result.success && result.data) {
          setOutingClassData(result.data);
        }
      } catch (error) {
        console.error("Error fetching outing class:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOutingClass();
  }, []);

  const handleImageError = (imageId) => {
    setImageErrors((prev) => ({ ...prev, [imageId]: true }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="pt-[7.4rem] bg-gray-50 min-h-screen">
      <div className="py-[8rem] lg:py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-4 lg:px-12">
          <Title>Outing Class</Title>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
              <span className="ml-4 text-[1.6rem] text-gray-600">
                Memuat data outing class...
              </span>
            </div>
          )}

          {!loading && outingClassData.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-[2.4rem] font-bold text-gray-800 mb-4">
                Belum Ada Outing Class
              </h3>
              <p className="text-[1.6rem] text-gray-600">
                Data outing class akan segera ditambahkan.
              </p>
            </div>
          )}

          {!loading && outingClassData.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {outingClassData.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {item.gambar && !imageErrors[item.id] ? (
                      <Image
                        src={item.gambar}
                        alt={item.judul}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={() => handleImageError(item.id)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--primary-color)] to-blue-700 flex items-center justify-center">
                        <div className="text-center text-white p-8">
                          <div className="text-6xl mb-4">🏫</div>
                          <div className="font-bold text-2xl mb-2">
                            {item.judul}
                          </div>
                          <div className="text-lg opacity-80">Outing Class</div>
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-white text-[1.8rem] md:text-[2rem] font-bold drop-shadow-lg mb-2">
                        {item.judul}
                      </h3>

                      <div className="flex flex-col gap-1 text-white/90 text-[1.3rem]">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2" />
                          {item.lokasi}
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-2" />
                          {formatDate(item.tanggal)}
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Card Description */}
                  <div className="p-6">
                    <p className="text-gray-600 text-[1.4rem] leading-relaxed line-clamp-3">
                      {item.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 text-center bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-[2.4rem] md:text-[2.8rem] font-bold text-[var(--primary-color)] mb-6">
                Pembelajaran Menyenangkan
              </h3>
              <div className="w-[6rem] h-[0.4rem] bg-yellow-400 mx-auto rounded-full"></div>
              <p className="text-gray-600 text-[1.6rem] leading-relaxed">
                Program Outing Class memberikan pengalaman belajar yang tak
                terlupakan bagi siswa-siswi SMP Muhammadiyah 1 Seyegan melalui
                kunjungan ke berbagai tempat edukatif.
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative aspect-[4/3] w-full bg-white rounded-lg overflow-hidden">
              {selectedImage.gambar && !imageErrors[selectedImage.id] ? (
                <Image
                  src={selectedImage.gambar}
                  alt={selectedImage.judul}
                  fill
                  className="object-contain"
                  onError={() => handleImageError(selectedImage.id)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--primary-color)] to-blue-700 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="text-8xl mb-6">🏫</div>
                    <div className="font-bold text-4xl mb-4">
                      {selectedImage.judul}
                    </div>
                    <div className="text-2xl opacity-80">Outing Class</div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="text-center mt-6 max-w-4xl mx-auto">
              <h3 className="text-white text-2xl font-bold mb-3">
                {selectedImage.judul}
              </h3>

              {/* Location & Date */}
              <div className="flex justify-center gap-6 mb-4 text-white/90">
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2" />
                  {selectedImage.lokasi}
                </div>
                <div className="flex items-center">
                  <Calendar size={18} className="mr-2" />
                  {formatDate(selectedImage.tanggal)}
                </div>
              </div>

              {/* Description */}
              <p className="text-white/80 text-[1.4rem] leading-relaxed">
                {selectedImage.deskripsi}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OutingClass;
