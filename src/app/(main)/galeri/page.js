"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Title from "@/components/Title";
import { X, ZoomIn, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import axios from "axios";

const GaleriPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galeriImages, setGaleriImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchGaleriImages(currentPage);
  }, [currentPage]);

  const fetchGaleriImages = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/galeri?page=${page}&limit=12`);
      const result = response.data;

      if (result.success) {
        setGaleriImages(result.data);
        setPagination(result.pagination);
      } else {
        console.error("Failed to fetch gallery images");
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  };

  return (
    <>
      <section className="pt-[7.4rem] bg-gray-50 min-h-screen">
        <div className="py-[4rem] lg:py-[6rem]">
          <div className="max-w-[120rem] mx-auto px-4">
            <Title>Galeri Sekolah</Title>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div className="aspect-square bg-gray-200 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : galeriImages.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-[2rem] text-gray-400 mb-4">📷</div>
                <h3 className="text-[1.8rem] font-semibold text-gray-600 mb-2">
                  Belum Ada Galeri
                </h3>
                <p className="text-[1.4rem] text-gray-500">
                  Galeri foto akan ditampilkan di sini ketika sudah tersedia
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                  {galeriImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-[.15s] cursor-pointer"
                      onClick={() => openModal(image)}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={image.gambar}
                          alt={image.judul}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-[.15s]"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />

                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-[.15s]"></div>

                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[.15s]">
                          <ZoomIn className="w-5 h-5 text-white" />
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-2">
                            <h3 className="text-white text-[1.2rem] font-medium line-clamp-1">
                              {image.judul}
                            </h3>
                            <div className="flex items-center text-white/80 text-[1rem] mt-1">
                              <Calendar size={12} className="mr-1" />
                              {new Date(image.tanggal).toLocaleDateString(
                                "id-ID"
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-[4rem]">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={!pagination.hasPrev}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Sebelumnya
                    </button>

                    <span className="text-[1.4rem] text-gray-600">
                      Halaman {pagination.page} dari {pagination.totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!pagination.hasNext}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Selanjutnya
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                <div className="text-center mt-[2rem]">
                  <p className="text-[1.4rem] text-gray-500">
                    {pagination?.total || 0} foto dokumentasi kegiatan sekolah
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-[.15s]"
              aria-label="Tutup modal"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedImage.gambar}
                alt={selectedImage.judul}
                width={800}
                height={600}
                className="object-contain max-w-full max-h-[80vh]"
                priority
              />

              <div className="p-4 bg-white">
                <h3 className="text-[1.8rem] font-semibold text-[var(--primary-color)] mb-2">
                  {selectedImage.judul}
                </h3>
                {selectedImage.deskripsi && (
                  <p className="text-[1.4rem] text-gray-600 mb-3">
                    {selectedImage.deskripsi}
                  </p>
                )}
                <div className="flex items-center text-[1.3rem] text-gray-500">
                  <Calendar size={16} className="mr-2" />
                  <span>
                    {new Date(selectedImage.tanggal).toLocaleDateString(
                      "id-ID",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GaleriPage;
