"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Logo_Seyegan from "../../public/Logo_Seyegan.png";
import { X, Menu, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const headerRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null); // Close any open dropdown when mobile menu toggles
  };

  const handleDropdownToggle = (menuIndex) => {
    setActiveDropdown(activeDropdown === menuIndex ? null : menuIndex);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const menus = [
    {
      menu: "Beranda",
      path: "/",
      hasDropdown: false,
    },
    {
      menu: "Tentang Sekolah",
      path: "/tentang-sekolah",
      hasDropdown: true,
      submenu: [
        { title: "Profil Sekolah", path: "/tentang-sekolah/profil" },
        { title: "Visi & Misi", path: "/tentang-sekolah/visi-misi" },
        { title: "Sejarah", path: "/tentang-sekolah/sejarah" },
        { title: "Struktur Organisasi", path: "/tentang-sekolah/struktur" },
        { title: "Fasilitas", path: "/tentang-sekolah/fasilitas" },
      ],
    },
    {
      menu: "Program & Kegiatan",
      path: "/program-kegiatan",
      hasDropdown: true,
      submenu: [
        { title: "Program Akademik", path: "/program-kegiatan/akademik" },
        { title: "Ekstrakurikuler", path: "/program-kegiatan/ekstrakurikuler" },
        { title: "Kegiatan Keagamaan", path: "/program-kegiatan/keagamaan" },
        { title: "Outing Class", path: "/program-kegiatan/outing-class" },
      ],
    },
    {
      menu: "Berita & Pengumuman",
      path: "/berita-pengumuman",
      hasDropdown: true,
      submenu: [
        { title: "Berita Terbaru", path: "/berita-pengumuman/berita" },
        { title: "Pengumuman", path: "/berita-pengumuman/pengumuman" },
        { title: "Agenda Kegiatan", path: "/berita-pengumuman/agenda" },
      ],
    },
    {
      menu: "Galeri",
      path: "/galeri",
      hasDropdown: true,
      submenu: [
        { title: "Foto Kegiatan", path: "/galeri/foto" },
        { title: "Video", path: "/galeri/video" },
        { title: "Prestasi", path: "/galeri/prestasi" },
      ],
    },
    {
      menu: "PPDB",
      path: "/ppdb",
      hasDropdown: true,
      submenu: [
        { title: "Informasi Pendaftaran", path: "/ppdb/informasi" },
        { title: "Persyaratan", path: "/ppdb/persyaratan" },
        { title: "Jadwal", path: "/ppdb/jadwal" },
        { title: "Daftar Online", path: "/ppdb/daftar" },
      ],
    },
    {
      menu: "Kontak",
      path: "/kontak",
      hasDropdown: false,
    },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed w-full bg-[#30308A] backdrop-blur-sm py-[1.2rem] z-50"
    >
      <div className="flex items-center justify-around">
        <div className="flex items-center font-[700]">
          <Image
            src={Logo_Seyegan}
            alt="Logo Seyegan"
            width={40}
            className="sm:w-[50px]"
          />
          <h1 className="text-[#fff] font-[700] text-[1.2rem] sm:text-[1.6rem] md:text-[1.8rem] lg:text-[2rem] xl:text-[2.4rem] ml-2">
            SMP Muhammadiyah 1 Seyegan
          </h1>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:block">
          <ul className="flex gap-6 xl:gap-8 text-[#fff] font-[400] text-[1.2rem] lg:text-[1.4rem] xl:text-[1.6rem]">
            {menus.map((item, index) => (
              <li key={index} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <button
                      className="flex items-center gap-1 border-b-2 border-b-transparent hover:border-b-yellow-400 transition-all duration-200 py-2"
                      onClick={() => handleDropdownToggle(index)}
                    >
                      {item.menu}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Desktop Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 transition-all duration-200 ${
                        activeDropdown === index
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      <ul className="py-2">
                        {item.submenu.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={subItem.path}
                              className="block px-4 py-3 text-gray-700 hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-200 text-[1.3rem]"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {subItem.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    className="border-b-2 border-b-transparent hover:border-b-yellow-400 transition-all duration-200 py-2 block"
                    href={item.path}
                  >
                    {item.menu}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden text-[#000] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-md p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 transform transition duration-300 ease-in-out" />
          ) : (
            <Menu className="w-6 h-6 transform transition duration-300 ease-in-out" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`lg:hidden absolute top-full left-0 w-full bg-[#fff] border-t border-gray-200 shadow-lg transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col py-2">
          {menus.map((item, index) => (
            <li key={index}>
              {item.hasDropdown ? (
                <>
                  <button
                    className="w-full flex items-center justify-between px-6 py-3 text-[#000] font-[700] text-[1.4rem] hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => handleDropdownToggle(index)}
                  >
                    {item.menu}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        activeDropdown === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Mobile Submenu */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeDropdown === index
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="bg-gray-50">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.path}
                            className="block px-10 py-2 text-gray-600 text-[1.3rem] hover:bg-[var(--primary-color)] hover:text-white transition-colors duration-200"
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  href={item.path}
                  className="block px-6 py-3 text-[#000] font-[700] text-[1.4rem] hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.menu}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
