import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Achieve1 from "../../public/Achievement/Achieve1.png";
import Achieve2 from "../../public/Achievement/Achieve2.png";
import Achieve3 from "../../public/Achievement/Achieve3.png";
import Achieve4 from "../../public/Achievement/Achieve4.png";
import Image from "next/image";

const Achievement = () => {
  return (
    <section className="bg-[var(--primary-color)] overflow-hidden">
      <div className="max-w-[120rem] mx-auto py-[8rem] lg:py-[10.8rem] px-4">
        <div className="text-center mb-[6rem]">
          <h2 className="text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] font-[700] text-[#fff] mb-[1.2rem]">
            Prestasi Sekolah
          </h2>
          <div className="w-[8rem] h-[0.4rem] bg-yellow-400 mx-auto rounded-full"></div>
        </div>
        <div className="relative">
          <Carousel>
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 px-3">
                <div className="relative w-full h-[28rem] sm:h-[32rem] md:h-[40rem] lg:h-[45rem] overflow-hidden rounded-xl shadow-2xl group">
                  <Image
                    src={Achieve1}
                    alt="Prestasi Silat - Medali Emas Kategori Putra"
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 px-3">
                <div className="relative w-full h-[28rem] sm:h-[32rem] md:h-[40rem] lg:h-[45rem] overflow-hidden rounded-xl shadow-2xl group">
                  <Image
                    src={Achieve2}
                    alt="Prestasi Silat - Medali Perak Kategori Putri"
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 px-3">
                <div className="relative w-full h-[28rem] sm:h-[32rem] md:h-[40rem] lg:h-[45rem] overflow-hidden rounded-xl shadow-2xl group">
                  <Image
                    src={Achieve3}
                    alt="Prestasi Silat - Medali Perunggu Tim"
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </CarouselItem>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3 px-3">
                <div className="relative w-full h-[28rem] sm:h-[32rem] md:h-[40rem] lg:h-[45rem] overflow-hidden rounded-xl shadow-2xl group">
                  <Image
                    src={Achieve4}
                    alt="Prestasi Silat - Juara Umum Kejuaraan"
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious
              className="bg-white/80 hover:bg-white text-[var(--primary-color)] border-2 border-[var(--primary-color)] shadow-lg size-[5.6rem] -left-[6.4rem] lg:-left-[8rem] transition-all duration-300 hover:scale-105"
              variant="secondary"
              size="icon"
            >
              <ChevronLeft className="w-[2.4rem] h-[2.4rem]" />
            </CarouselPrevious>
            <CarouselNext
              className="bg-white/80 hover:bg-white text-[var(--primary-color)] border-2 border-[var(--primary-color)] shadow-lg size-[5.6rem] -right-[6.4rem] lg:-right-[8rem] transition-all duration-300 hover:scale-105"
              variant="secondary"
              size="icon"
            >
              <ChevronRight className="w-[2.4rem] h-[2.4rem]" />
            </CarouselNext>
          </Carousel>
        </div>
        <div className="mt-[4.8rem] px-4">
          <p className="text-center text-[1.6rem] md:text-[1.8rem] text-[#fff]/80 leading-relaxed max-w-[80rem] mx-auto">
            Siswa-siswi SMP Muhammadiyah 1 Seyegan memenangkan kejuaraan di
            cabang silat, menyabet medali perunggu hingga emas di berbagai
            kategori dan membanggakan nama sekolah.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
