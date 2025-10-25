import Title from "@/components/Title";
import Image from "next/image";

const Sambutan = () => {
  return (
    <section className="pt-[7.4rem]">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <Title>Sambutan Kepala Sekolah</Title>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border-t-4 border-[var(--primary-color)]">
                <div className="mb-8 pb-6 border-b border-gray-200">
                  <blockquote className="text-[1.5rem] md:text-[2rem] italic text-[#000]/75 leading-relaxed relative">
                    <span className="relative z-10">
                      Alhamdulillahirabbil 'aalamiin segala puji bagi Allah
                      Tuhan semesta alam. Sholawat dan salam senantiasa tercurah
                      kepada junjungan kita nabi besar Muhammad SAW.
                    </span>
                  </blockquote>
                </div>

                <div className="text-justify space-y-5 text-[#000]/75 text-[1.6rem] leading-relaxed">
                  <p>
                    Selamat datang di website SMP Muhammadiyah 1 Seyegan.
                    Website ini hadir sebagai jembatan komunikasi dan sumber
                    informasi yang komprehensif bagi seluruh civitas akademika,
                    orang tua/wali siswa, siswa aktif, alumni, dan masyarakat
                    luas.
                  </p>

                  <p>
                    Melalui platform digital ini, kami berkomitmen untuk
                    menyajikan berbagai informasi penting mulai dari profil
                    sekolah, sejarah perjalanan, program pembelajaran, hingga
                    kegiatan kesiswaan. Website ini juga memuat informasi
                    lengkap tentang guru dan tenaga kependidikan (GTK), data
                    siswa, administrasi sekolah, serta dokumentasi berbagai
                    kegiatan seperti lomba dan kegiatan keagamaan.
                  </p>

                  <p>
                    Kami akan terus melakukan perbaikan dan penyempurnaan secara
                    berkala agar website ini semakin menarik, informatif, dan
                    bermanfaat. Harapan kami, platform ini dapat menjadi sarana
                    efektif dalam mendukung kemajuan pendidikan di SMP
                    Muhammadiyah 1 Seyegan.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 pl-[2rem] pr-[1.6rem] py-[1.6rem] rounded-r-lg italic text-[#000]/75">
                    <p className="flex items-start gap-3">
                      <span>
                        Semoga Allah SWT senantiasa memberikan kemudahan untuk
                        setiap usaha kita dalam memajukan sekolah yang kita
                        cintai ini. Aamiin Ya Rabbal 'Alamin.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden lg:sticky lg:top-24">
                <div className="bg-[var(--primary-color)] p-[2.4rem] text-white text-center">
                  <h3 className="text-[2.4rem] font-bold">Kepala Sekolah</h3>
                  <p className="text-[1.4rem] opacity-90 mt-1">
                    SMP Muhammadiyah 1 Seyegan
                  </p>
                </div>
                <div className="p-6">
                  <div className="relative w-full h-[32rem] rounded-xl overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src="/Kepala_Sekolah_Seyegan.png"
                      alt="Kepala Sekolah SMP Muhammadiyah 1 Seyegan"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-[1.8rem] font-bold text-gray-800 mb-1">
                      Rochmadi, S.Sos.I.
                    </p>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-[1.4rem] text-[#000]/75 italic leading-relaxed">
                        "Islami, Berintegritas, Berprestasi"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sambutan;
