const VisiMisiPage = () => {
  return (
    <section className="pt-[7.4rem]">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-[3rem] md:text-[3.6rem] lg:text-[4.2rem] font-bold text-[var(--primary-color)] mb-4">
              Visi, Misi & Tujuan
            </h1>
            <div className="w-[6rem] h-[0.4rem] bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Visi Section */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border-t-4 border-[var(--primary-color)]">
              <div className="mb-8">
                <h2 className="text-[2.8rem] md:text-[3.2rem] font-bold text-[var(--primary-color)] mb-6">
                  Visi
                </h2>
              </div>
              <div className="p-8 mb-8">
                <p className="text-[1.8rem] md:text-[2rem] font-semibold text-[#000]/75 text-center leading-relaxed">
                  "Terwujudnya Murid yang Islami, Berintegritas, dan
                  Berprestasi"
                </p>
              </div>

              {/* Indikator Visi */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Islami */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-4">
                    Islami
                  </h3>
                  <ul className="space-y-2 text-[1.6rem] text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>Aqidah yang lurus dan kuat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>Memahami dan menjalankan ibadah dengan baik</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>Akhlak mulia dalam kehidupan sehari-hari</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>
                        Mampu membaca, menghafal, dan mengamalkan Al-Qur'an
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>Bermanfaat bagi masyarakat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>Berkemajuan dengan menguasai IPTEK dan IMTAQ</span>
                    </li>
                  </ul>
                </div>

                {/* Berintegritas */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-4">
                    Berintegritas
                  </h3>
                  <ul className="space-y-2 text-[1.6rem] text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>
                        Bertanggung jawab terhadap diri dan lingkungan
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>Jujur dalam perkataan dan perbuatan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>Disiplin dalam kehidupan sehari-hari</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>Sopan dan santun dalam tutur kata</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1 flex-shrink-0">
                        •
                      </span>
                      <span>Peduli terhadap lingkungan sekitar</span>
                    </li>
                  </ul>
                </div>

                {/* Berprestasi */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-4">
                    Berprestasi
                  </h3>
                  <div className="space-y-4 text-[1.6rem] text-gray-700">
                    <div>
                      <p className="font-semibold text-[#000]/75 mb-2">
                        Akademik:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1 flex-shrink-0">
                            •
                          </span>
                          <span>Lomba Sains, IPA, Matematika</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1 flex-shrink-0">
                            •
                          </span>
                          <span>Lomba Keagamaan (MTQ, Olympicad)</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-[#000]/75 mb-2">
                        Non-Akademik:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1 flex-shrink-0">
                            •
                          </span>
                          <span>Olahraga (O2SN, YKTC, POPDA)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1 flex-shrink-0">
                            •
                          </span>
                          <span>Seni dan Budaya</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Misi Section */}
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-t-4 border-[var(--primary-color)]">
              <div className="mb-8">
                <h2 className="text-[2.8rem] md:text-[3.2rem] font-bold text-[var(--primary-color)]">
                  Misi
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Menanamkan nilai-nilai akidah yang lurus dan kuat dalam kehidupan sehari-hari",
                  "Melakukan pembelajaran yang menekankan praktek cara beribadah yang baik",
                  "Membiasakan akhlak yang baik dan menghindari akhlak buruk",
                  "Membiasakan berbuat baik kepada sesama untuk bermanfaat bagi masyarakat",
                  "Membekali siswa dengan wawasan berkemajuan, menguasai IPTEK dan IMTAQ yang seimbang",
                  "Menanamkan nilai tanggung jawab terhadap diri, keluarga, dan lingkungan",
                  "Menanamkan nilai jujur dalam perkataan dan perbuatan",
                  "Menanamkan nilai disiplin dalam kehidupan sehari-hari",
                  "Membiasakan sikap sopan dan santun dalam tutur kata dan perbuatan",
                  "Membiasakan sikap peduli lingkungan dengan menjaga kebersihan",
                  "Melatih siswa mengikuti berbagai lomba untuk memotivasi berprestasi",
                ].map((misi, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-gray-50 p-5 rounded-lg shadow-sm"
                  >
                    <div className="w-8 h-8 bg-yellow-500 text-[var(--primary-color)] rounded-full flex items-center justify-center font-bold flex-shrink-0 text-[1.4rem]">
                      {index + 1}
                    </div>
                    <p className="text-[1.6rem] text-gray-700 leading-relaxed">
                      {misi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tujuan Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border-t-4 border-[var(--primary-color)]">
              <div className="mb-6">
                <h2 className="text-[2.8rem] md:text-[3.2rem] font-bold text-[var(--primary-color)]">
                  Tujuan
                </h2>
                <p className="text-[1.6rem] text-gray-600 mt-2">
                  Pendidikan SMP Muhammadiyah 1 Seyegan
                </p>
                <p className="text-justify text-[1.6rem] text-gray-700 leading-relaxed">
                  Sejalan dengan tujuan pendidikan menengah dalam Sistem
                  Pendidikan Nasional yaitu meletakkan dasar kecerdasan,
                  pengetahuan, kepribadian, akhlak mulia, serta keterampilan
                  untuk hidup mandiri dan mengikuti pendidikan lebih lanjut,
                  pendidikan di SMP Muhammadiyah 1 Seyegan diarahkan untuk:
                </p>
              </div>

              <div className="space-y-6">
                {/* Standar Kompetensi Lulusan */}
                <div className="pl-6 py-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-3">
                    Standar Kompetensi Lulusan
                  </h3>
                  <ul className="space-y-2 text-[1.6rem] text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Meningkatkan pencapaian nilai rata-rata Ujian Sekolah 80
                        dan nilai rata-rata ASPD 50
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Membentuk lulusan yang memiliki aqidah lurus, berakhlak
                        mulia, dan mampu mengamalkan Al-Qur'an
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Membentuk lulusan berkarakter tanggung jawab, jujur,
                        disiplin, dan sopan
                      </span>
                    </li>
                  </ul>
                  <p className="text-[1.3rem] text-gray-500 italic mt-3">
                    Penanggung Jawab: Waka Urusan Kurikulum dan Kesiswaan
                  </p>
                </div>

                {/* Standar Isi */}
                <div className="pl-6 py-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-3">
                    Standar Isi
                  </h3>
                  <ul className="space-y-2 text-[1.6rem] text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Menyusun Kurikulum Operasional SMP Muhammadiyah 1
                        Seyegan
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Menyusun administrasi pembelajaran</span>
                    </li>
                  </ul>
                  <p className="text-[1.3rem] text-gray-500 italic mt-3">
                    Penanggung Jawab: Waka Urusan Kurikulum
                  </p>
                </div>

                {/* Standar Proses */}
                <div className="pl-6 py-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-3">
                    Standar Proses
                  </h3>
                  <ul className="space-y-2 text-[1.6rem] text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Melaksanakan pembelajaran yang baik, menyenangkan, dan
                        bermutu
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Mengembangkan strategi pembelajaran diferensiasi dengan
                        pendekatan saintifik dan PAIKEM
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Didukung Media Interaktif Kreatif Inovatif dan Rekreatif
                        (MIKIR) dengan Kurikulum Merdeka
                      </span>
                    </li>
                  </ul>
                  <p className="text-[1.3rem] text-gray-500 italic mt-3">
                    Penanggung Jawab: Waka Urusan Kurikulum
                  </p>
                </div>

                {/* Standar Pendidik dan Tenaga Kependidikan */}
                <div className="pl-6 py-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-3">
                    Standar Pendidik dan Tenaga Kependidikan
                  </h3>
                  <ul className="space-y-2 text-[1.6rem] text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Mengupayakan 100% guru dan karyawan memiliki SK GTP
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Mengupayakan 90% guru memiliki NUPTK</span>
                    </li>
                  </ul>
                  <p className="text-[1.3rem] text-gray-500 italic mt-3">
                    Penanggung Jawab: Waka Urusan Kurikulum dan Kesiswaan
                  </p>
                </div>

                {/* Standar Sarana dan Prasarana */}
                <div className="pl-6 py-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-3">
                    Standar Sarana dan Prasarana
                  </h3>
                  <ul className="space-y-2 text-[1.6rem] text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Memiliki sarana pembelajaran lengkap: LCD proyektor di
                        tiap kelas, papan tulis, dan meja belajar yang memadai
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Lingkungan sekolah bersih dan nyaman</span>
                    </li>
                  </ul>
                  <p className="text-[1.3rem] text-gray-500 italic mt-3">
                    Penanggung Jawab: Waka Urusan Sarana Prasarana dan Hubungan
                    Masyarakat
                  </p>
                </div>

                {/* Standar Pengelolaan */}
                <div className="pl-6 py-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-3">
                    Standar Pengelolaan
                  </h3>
                  <ul className="space-y-2 text-[1.6rem] text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Penyusunan Visi, Misi, dan Tujuan sekolah</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Pembuatan profil sekolah</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Penyusunan RKS, RKT, RKAS, RAPBS</span>
                    </li>
                  </ul>
                  <p className="text-[1.3rem] text-gray-500 italic mt-3">
                    Penanggung Jawab: Waka Urusan Kurikulum, Kesiswaan, dan
                    Hubungan Masyarakat
                  </p>
                </div>

                {/* Standar Pembiayaan */}
                <div className="pl-6 py-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-3">
                    Standar Pembiayaan
                  </h3>
                  <ul className="space-y-2 text-[1.6rem] text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Melaksanakan administrasi keuangan dengan tertib
                        (transparan dan akuntabel) menggunakan aplikasi ARKAS
                        dan SIP Lah
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Meningkatkan kesejahteraan guru dan karyawan</span>
                    </li>
                  </ul>
                  <p className="text-[1.3rem] text-gray-500 italic mt-3">
                    Penanggung Jawab: Bendahara dan Pengelola Keuangan Sekolah
                  </p>
                </div>

                {/* Standar Penilaian */}
                <div className="pl-6 py-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-[2rem] font-bold text-[var(--primary-color)] mb-3">
                    Standar Penilaian
                  </h3>
                  <ul className="space-y-2 text-[1.6rem] text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>
                        Mengembangkan penilaian Literasi Numerasi dengan konsep
                        belajar tuntas (mastery learning) dan pemanfaatan TIK
                        pada tahun 2025/2026
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">•</span>
                      <span>Pembuatan laporan hasil belajar</span>
                    </li>
                  </ul>
                  <p className="text-[1.3rem] text-gray-500 italic mt-3">
                    Penanggung Jawab: Waka Urusan Kurikulum
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisiPage;
