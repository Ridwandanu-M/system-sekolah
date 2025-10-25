"use client";

import { Menu, LogOut } from "lucide-react";
import menus from "./AdminSidebarMenu";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowText(true);
      }, 36);

      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [isOpen]);

  return (
    <aside
      className={`bg-[var(--primary-color)] h-screen ${isOpen ? "w-[25rem]" : "w-[8rem]"} py-[1.8rem] px-[2rem] transition-all duration-[.075s] eas-in-out flex flex-col`}
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
          className={`hover:bg-[var(--primary-color-tint-lighter)] ${isOpen ? "block" : "hidden"} rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
      <div className="mt-[3.2rem]">
        <ul className="flex flex-col gap-[1.2rem]">
          {menus.map((item, index) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className="flex items-center text-[1.6rem] text-[#fff] hover:bg-[var(--primary-color-tint-lighter)] py-[.4rem] px-[.4rem] rounded-xl transition-all duration-[.075s] ease-in-out"
              >
                {item.icon}
                <p
                  className={`${isOpen && showText ? "block" : "hidden"} pl-[.8rem] font-[600] transition-opacity duration-150 ease-in-out ${isOpen && showText ? "opacity-100" : "opacity-0"}`}
                >
                  {item.menu}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <Link
          href="/sign-in"
          className="flex items-center text-[1.6rem] text-[#fff] hover:bg-[var(--primary-color-tint-lighter)] py-[.4rem] px-[.4rem] rounded-xl transition-all duration-[.075s] ease-in-out"
        >
          <LogOut
            size={32}
            className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
          />
          {isOpen && (
            <p
              className={`${isOpen && showText ? "block" : "hidden"} pl-[.8rem] font-[600] transition-opacity duration-150 ease-in-out ${isOpen && showText ? "opacity-100" : "opacity-0"}`}
            >
              Keluar
            </p>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
