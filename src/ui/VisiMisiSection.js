import Title from "@/component/Title";
import Link from "next/link";

const VisiMisiSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[120rem] mx-auto py-[8rem] lg:py-[10.8rem] px-4">
        <div className="flex flex-col w-full items-center gap-12 lg:gap-[6.4rem] mb-[4rem] lg:mb-[5.6rem]">
          {/* Visi Section */}
          <div className="border-b-2 border-[var(--primary-color)]/20 pb-8 lg:pb-[3.2rem] w-full">
            <Title>Visi</Title>
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border-x-4 border-[var(--primary-color)] max-w-4xl mx-auto">
              <p className="text-[1.6rem] md:text-[1.8rem] lg:text-[2rem] text-gray-700 leading-relaxed">
                <i className="text-[var(--primary-color)] font-medium">
                  "Terwujudnya peserta didik yang Islami, Berintegritas, dan
                  Berprestasi."
                </i>
              </p>
            </div>
          </div>

          {/* Misi Section */}
          <div className="border-b-2 border-[var(--primary-color)]/20 pb-8 lg:pb-[3.2rem] w-full">
            <Title>Misi</Title>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[1.8rem]">
              <div className="bg-white border-2 border-[var(--primary-color)]/20 hover:border-[var(--primary-color)] p-6 lg:p-[3.2rem] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-[.15s] group">
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-4 transition-transform duration-[.15s]">
                  <span className="text-white font-bold text-[1.8rem]">1</span>
                </div>
                <p className="text-justify text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] text-gray-700 leading-relaxed">
                  Menanamkan nilai-nilai Islam dalam kehidupan sehari-hari
                  melalui pendidikan karakter yang integral.
                </p>
              </div>
              <div className="bg-white border-2 border-[var(--primary-color)]/20 hover:border-[var(--primary-color)] p-6 lg:p-[3.2rem] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-[.15s] group">
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-4 transition-transform duration-[.15s]">
                  <span className="text-white font-bold text-[1.8rem]">2</span>
                </div>
                <p className="text-justify text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] text-gray-700 leading-relaxed">
                  Mengembangkan potensi akademik dan non-akademik secara
                  seimbang untuk mencapai prestasi optimal.
                </p>
              </div>
              <div className="bg-white border-2 border-[var(--primary-color)]/20 hover:border-[var(--primary-color)] p-6 lg:p-[3.2rem] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-[.15s] group md:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center mb-4 transition-transform duration-[.15s]">
                  <span className="text-white font-bold text-[1.8rem]">3</span>
                </div>
                <p className="text-justify text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] text-gray-700 leading-relaxed">
                  Membentuk karakter jujur, disiplin, dan bertanggung jawab
                  dalam setiap aspek kehidupan.
                </p>
              </div>
            </div>
          </div>

          {/* Tujuan Section */}
          <div className="border-b-2 border-[var(--primary-color)]/20 pb-8 lg:pb-[3.2rem] w-full">
            <Title>Tujuan</Title>
            <div className="bg-white p-6 lg:p-8 rounded-xl shadow-lg border-x-4 border-[var(--primary-color)] max-w-5xl mx-auto">
              <p className="text-justify text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem] leading-relaxed">
                <i className="text-[var(--primary-color)] font-medium">
                  "Meletakkan dasar kecerdasan, pengetahuan, kepribadian, akhlak
                  mulia serta keterampilan untuk hidup mandiri dan mengikuti
                  pendidikan lebih lanjut dan mengacu pada visi dan misi
                  sekolah, serta tujuan umum pendidikan dasar."
                </i>
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            href="/tentang-sekolah/visi-misi"
            className="border-2 border-[var(--primary-color)] text-[1.4rem] text-[#fff] font-[700] px-[2.4rem] sm:px-[3.2rem] py-[1.6rem] sm:py-[1.8rem] rounded-full bg-[var(--primary-color)] cursor-pointer hover:bg-yellow-400 hover:border-yellow-400 hover:text-[var(--primary-color)] transition-all duration-[.15s] shadow-lg hover:shadow-xl"
          >
            Visi & Misi Lengkap
          </Link>
        </div>
      </div>

      {/* Decorative Elements - Hidden on mobile */}
      <div className="hidden lg:block absolute top-[25rem] right-[4rem] w-[8rem] h-[8rem] bg-[var(--primary-color)]/10 rounded-full"></div>
      <div className="hidden lg:block absolute bottom-[10rem] right-[4rem] w-[12rem] h-[12rem] bg-yellow-400/20 rounded-full"></div>
      <div className="hidden lg:block absolute top-[10rem] left-[4rem] w-[12rem] h-[12rem] bg-yellow-400/20 rounded-full"></div>
      <div className="hidden lg:block absolute top-1/2 left-[2rem] w-[6rem] h-[6rem] bg-[var(--primary-color)]/5 rounded-full"></div>
    </section>
  );
};

export default VisiMisiSection;
