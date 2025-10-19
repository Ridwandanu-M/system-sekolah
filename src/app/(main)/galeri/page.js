"use client";
import { useState } from "react";
import Image from "next/image";
import Title from "@/component/Title";
import { X, ZoomIn } from "lucide-react";

const GaleriPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const galeriImages = [
    { id: 1, src: "/Galeri/gambar1.jpeg", alt: "Kegiatan Sekolah 1" },
    { id: 2, src: "/Galeri/gambar2.jpeg", alt: "Kegiatan Sekolah 2" },
    { id: 3, src: "/Galeri/gambar3.jpeg", alt: "Kegiatan Sekolah 3" },
    { id: 4, src: "/Galeri/gambar4.jpeg", alt: "Kegiatan Sekolah 4" },
    { id: 5, src: "/Galeri/gambar5.jpeg", alt: "Kegiatan Sekolah 5" },
    { id: 6, src: "/Galeri/gambar6.jpeg", alt: "Kegiatan Sekolah 6" },
    { id: 7, src: "/Galeri/gambar7.jpeg", alt: "Kegiatan Sekolah 7" },
    { id: 8, src: "/Galeri/gambar8.jpeg", alt: "Kegiatan Sekolah 8" },
    { id: 9, src: "/Galeri/gambar9.jpeg", alt: "Kegiatan Sekolah 9" },
    { id: 10, src: "/Galeri/gambar10.jpeg", alt: "Kegiatan Sekolah 10" },
    { id: 11, src: "/Galeri/gambar11.jpeg", alt: "Kegiatan Sekolah 11" },
    { id: 12, src: "/Galeri/gambar12.jpeg", alt: "Kegiatan Sekolah 12" },
    { id: 13, src: "/Galeri/gambar13.jpeg", alt: "Kegiatan Sekolah 13" },
    { id: 14, src: "/Galeri/gambar14.jpeg", alt: "Kegiatan Sekolah 14" },
    { id: 15, src: "/Galeri/gambar15.jpeg", alt: "Kegiatan Sekolah 15" },
    { id: 16, src: "/Galeri/gambar16.jpeg", alt: "Kegiatan Sekolah 16" },
  ];

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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {galeriImages.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-[.15s] cursor-pointer"
                  onClick={() => openModal(image)}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-[.15s]"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-[.15s]"></div>

                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[.15s]">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>

                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-[var(--primary-color)] text-white text-[1.2rem] font-medium rounded-full">
                      {image.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-[4rem] lg:mt-[6rem]">
              <p className="text-[1.4rem] text-gray-500">
                {galeriImages.length} foto dokumentasi kegiatan sekolah
              </p>
            </div>
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
                src={selectedImage.src}
                alt={selectedImage.alt}
                width={800}
                height={600}
                className="object-contain max-w-full max-h-[80vh]"
                priority
              />

              <div className="p-4 bg-white">
                <h3 className="text-[1.8rem] font-semibold text-[var(--primary-color)] mb-2">
                  {selectedImage.alt}
                </h3>
                <p className="text-[1.4rem] text-gray-600">
                  Foto ke-{selectedImage.id} dari {galeriImages.length}{" "}
                  dokumentasi kegiatan sekolah
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GaleriPage;
