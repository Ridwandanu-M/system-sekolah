"use client";

import { Menu, LogOut, ChevronDown } from "lucide-react";
import { adminMenus } from "./AllMenus";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showText, setShowText] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 64);

      return () => clearTimeout(timer);
    } else {
      setShowText(false);
      setActiveDropdown(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleDropdownToggle = (menuId) => {
    if (!isOpen) return;
    setActiveDropdown(activeDropdown === menuId ? null : menuId);
  };

  return (
    <aside
      ref={sidebarRef}
      className={`bg-[var(--primary-color)] h-screen ${
        isOpen ? "w-[32rem]" : "w-[8rem]"
      } py-[1.8rem] px-[2rem] transition-all duration-[.075s] ease-in-out flex flex-col relative`}
    >
      <div className={`flex ${isOpen && "justify-between"} items-center`}>
        <Image
          src="/Logo_Seyegan.png"
          width={40}
          height={40}
          alt="Logo Seyegan"
          className={`hover:bg-[var(--primary-color-tint-lighter)] rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        <Menu
          color="#fff"
          size={40}
          className={`hover:bg-[var(--primary-color-tint-lighter)] ${
            isOpen ? "block" : "hidden"
          } rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      <div className="mt-[3.2rem] flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-[0.8rem]">
          {adminMenus.map((item) => (
            <li key={item.id} className="relative">
              {item.hasDropdown ? (
                <>
                  <button
                    className={`w-full flex items-center justify-between text-[1.6rem] text-[#fff] hover:bg-[var(--primary-color-tint-lighter)] py-[.6rem] px-[.4rem] rounded-xl transition-all duration-[.075s] ease-in-out ${
                      activeDropdown === item.id
                        ? "bg-[var(--primary-color-tint-lighter)]"
                        : ""
                    }`}
                    onClick={() => handleDropdownToggle(item.id)}
                    disabled={!isOpen}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <p
                        className={`${
                          isOpen && showText ? "block" : "hidden"
                        } pl-[.8rem] font-[600] transition-opacity duration-150 ease-in-out ${
                          isOpen && showText ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        {item.menu}
                      </p>
                    </div>
                    {isOpen && showText && (
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-[.075s] ease-in-out ${
                          activeDropdown === item.id ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-[.075s] ease-in-out ${
                      activeDropdown === item.id && isOpen
                        ? "max-h-96 opacity-100 mt-[0.4rem]"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <ul className="ml-[1.6rem] space-y-[0.4rem]">
                      {item.submenu?.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.path}
                            className="flex items-center text-[1.4rem] text-[#fff]/80 hover:text-[#fff] hover:bg-[var(--primary-color-tint-lighter)] py-[.4rem] px-[.6rem] rounded-lg transition-all duration-[.075s] ease-in-out"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="w-[24px] h-[24px] flex items-center justify-center">
                              {subItem.icon}
                            </span>
                            <span className="pl-[.6rem] font-[500]">
                              {subItem.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  href={item.path}
                  className="flex items-center text-[1.6rem] text-[#fff] hover:bg-[var(--primary-color-tint-lighter)] py-[.6rem] px-[.4rem] rounded-xl transition-all duration-[.075s] ease-in-out"
                >
                  {item.icon}
                  <p
                    className={`${
                      isOpen && showText ? "block" : "hidden"
                    } pl-[.8rem] font-[600] transition-opacity duration-150 ease-in-out ${
                      isOpen && showText ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.menu}
                  </p>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-[1.6rem] border-t border-[var(--primary-color-tint-lighter)]">
        <Link
          href="/"
          className="flex items-center text-[1.6rem] text-[#fff] hover:bg-[var(--primary-color-tint-lighter)] py-[.6rem] px-[.4rem] rounded-xl transition-all duration-[.075s] ease-in-out"
        >
          <LogOut
            size={32}
            className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
          />
          {isOpen && (
            <p
              className={`${
                isOpen && showText ? "block" : "hidden"
              } pl-[.8rem] font-[600] transition-opacity duration-150 ease-in-out ${
                isOpen && showText ? "opacity-100" : "opacity-0"
              }`}
            >
              Kembali
            </p>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
