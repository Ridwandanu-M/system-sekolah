import Image from "next/image";
import Link from "next/link";
import Logo_Seyegan from "../../public/Logo_Seyegan.png";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#30308A] text-white">
      <div className="max-w-[120rem] mx-auto px-4 py-[6rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Image
                src={Logo_Seyegan}
                alt="Logo SMP Muhammadiyah 1 Seyegan"
                width={50}
                height={50}
                className="mr-3"
              />
              <div>
                <h3 className="text-[1.8rem] font-bold text-white">
                  SMP Muhammadiyah 1
                </h3>
                <p className="text-[1.4rem] text-gray-300">Seyegan</p>
              </div>
            </div>
            <p className="text-justify text-white/80 text-[1.4rem] leading-relaxed mb-6">
              Sekolah menengah pertama yang berkomitmen mengembangkan potensi
              siswa berdasarkan nilai-nilai Islam dan prestasi akademik yang
              unggul.
            </p>

            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-[1.8rem] font-semibold mb-6 text-yellow-400">
              Menu Utama
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/program-kegiatan"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Program & Kegiatan
                </Link>
              </li>
              <li>
                <Link
                  href="/berita-pengumuman"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Berita & Pengumuman
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Galeri
                </Link>
              </li>
              <li>
                <Link
                  href="/ppdb"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  PPDB
                </Link>
              </li>
              <li>
                <Link
                  href="/kontak"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[1.8rem] font-semibold mb-6 text-yellow-400">
              Tentang Sekolah
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/tentang-sekolah/sambutan"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Sambutan Kepala Sekolah
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-sekolah/visi-misi"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Visi & Misi
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-sekolah/sejarah"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Sejarah
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-sekolah/filosofi"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Filosofi
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-sekolah/struktur"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Struktur Organisasi
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-sekolah/fasilitas"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Fasilitas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[1.8rem] font-semibold mb-6 text-yellow-400">
              Layanan & Program
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/program-kegiatan/akademik"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Program Akademik
                </Link>
              </li>
              <li>
                <Link
                  href="/program-kegiatan/ekstrakurikuler"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Ekstrakurikuler
                </Link>
              </li>
              <li>
                <Link
                  href="/ppdb/informasi"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Informasi PPDB
                </Link>
              </li>
              <li>
                <Link
                  href="/ppdb/daftar"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Daftar Online
                </Link>
              </li>
              <li>
                <Link
                  href="/galeri/prestasi"
                  className="text-white/80 hover:text-yellow-400 transition-colors duration-200 text-[1.4rem]"
                >
                  Prestasi Siswa
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[1.8rem] font-semibold mb-6 text-yellow-400">
              Kontak Kami
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-[1.4rem] leading-relaxed">
                    Jl. Solo - Yogya Km. 12, Seyegan, Sleman, Daerah Istimewa
                    Yogyakarta 55561
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-[1.4rem]">(0274) 773029</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-[1.4rem]">
                    info@smpmuh1seyegan.sch.id
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/80 text-[1.4rem]">Senin - Jumat</p>
                  <p className="text-white/60 text-[1.3rem]">
                    07:00 - 15:30 WIB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-[120rem] mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-white/60 text-[1.3rem]">
                © 2025 SMP Muhammadiyah 1 Seyegan. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-white/60 hover:text-yellow-400 text-[1.3rem] transition-colors duration-200"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/terms"
                className="text-white/60 hover:text-yellow-400 text-[1.3rem] transition-colors duration-200"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
