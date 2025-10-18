"use client";

import Title from "@/component/Title";
import Image from "next/image";
import { useState } from "react";

const OutingClass = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (imageId) => {
    setImageErrors((prev) => ({ ...prev, [imageId]: true }));
  };

  const outingClassImages = [
    {
      id: 1,
      src: "/OutingClass/OutingClass1.png",
      alt: "Siswa-siswi di Terminal Bandara Yogyakarta",
      title: "Terminal Bandara",
    },
    {
      id: 2,
      src: "/OutingClass/OutingClass2.png",
      alt: "Kunjungan ke Museum Penerbangan",
      title: "Museum Penerbangan",
    },
    {
      id: 3,
      src: "/OutingClass/OutingClass3.png",
      alt: "Perjalanan menggunakan Kereta Api",
      title: "Perjalanan Kereta",
    },
    {
      id: 4,
      src: "/OutingClass/OutingClass4.jpeg",
      alt: "Foto bersama di Bandara Yogyakarta",
      title: "Foto Bersama",
    },
  ];

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

          {/* Image Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {outingClassImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {imageErrors[image.id] ? (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--primary-color)] to-blue-700 flex items-center justify-center">
                      <div className="text-center text-white p-8">
                        <div className="text-6xl mb-4">📸</div>
                        <div className="font-bold text-2xl mb-2">
                          {image.title}
                        </div>
                        <div className="text-lg opacity-80">Outing Class</div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={() => handleImageError(image.id)}
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white text-[1.8rem] md:text-[2rem] font-bold drop-shadow-lg">
                      {image.title}
                    </h3>
                  </div>

                  {/* Zoom Icon */}
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
              </div>
            ))}
          </div>

          {/* Info Text */}
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

      {/* Modal for Image Preview */}
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
              {imageErrors[selectedImage.id] ? (
                <div className="w-full h-full bg-gradient-to-br from-[var(--primary-color)] to-blue-700 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <div className="text-8xl mb-6">📸</div>
                    <div className="font-bold text-4xl mb-4">
                      {selectedImage.title}
                    </div>
                    <div className="text-2xl opacity-80">Outing Class</div>
                  </div>
                </div>
              ) : (
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  onError={() => handleImageError(selectedImage.id)}
                />
              )}
            </div>

            <div className="text-center mt-4">
              <h3 className="text-white text-2xl font-bold">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OutingClass;
