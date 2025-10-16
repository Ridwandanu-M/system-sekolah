"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo_Seyegan from "../../public/Logo_Seyegan.png";
import { X, Menu } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const menus = [
    {
      menu: "Beranda",
      path: "/",
    },
    {
      menu: "Tentang Sekolah",
      path: "/tentang-sekolah",
    },
    {
      menu: "Program & Kegiatan",
      path: "/program-kegiatan",
    },
    {
      menu: "Berita & Pengumuman",
      path: "/berita-pengumuman",
    },
    {
      menu: "Galeri",
      path: "/galeri",
    },
    {
      menu: "PPDB",
      path: "/ppdb",
    },
    {
      menu: "Kontak",
      path: "/kontak",
    },
  ];

  return (
    <header className="fixed w-full bg-[#30308A] backdrop-blur-sm py-[1.2rem] z-50">
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
          <ul className="flex gap-6 xl:gap-8 text-[#fff] font-[400] text-[1.2rem] lg:text-[1.4rem] xl:text-[1.6rem] ">
            {menus.map((item, index) => (
              <li key={index}>
                <Link
                  className="border-b-2 border-b-transparent hover:border-b-yellow-400 transition-all duration-[.1s]"
                  href={item.path}
                >
                  {item.menu}
                </Link>
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
        className={`lg:hidden absolute top-full left-0 w-full bg-[#fff] border-t border-white border-opacity-20 transform transition-all duration-[.1s] ease-in-out ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col py-4">
          {menus.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className="block px-6 py-3 text-[#000] font-[700] text-[1.4rem] hover:bg-[var(--primary-color)] hover:text-[#fff] hover:bg-opacity-10 transition-colors duration-[.1s]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.menu}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
