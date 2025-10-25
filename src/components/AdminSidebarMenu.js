import {
  House,
  UsersRound,
  GraduationCap,
  Clapperboard,
  Backpack,
  Mails,
  Megaphone,
  Images,
  BookOpenText,
  NotebookText,
  Calendar,
  AppWindow,
  BookUser,
  History,
} from "lucide-react";

const menus = [
  {
    id: 1,
    menu: "Dashboard",
    icon: (
      <House
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/dashboard",
  },
  {
    id: 2,
    menu: "Siswa",
    icon: (
      <UsersRound
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/siswa",
  },
  {
    id: 3,
    menu: "Guru",
    icon: (
      <GraduationCap
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/guru",
  },
  {
    id: 4,
    menu: "Ekstrakurikuler",
    icon: (
      <Clapperboard
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/ekstrakurikuler",
  },
  {
    id: 5,
    menu: "Outing Class",
    icon: (
      <Backpack
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/outing-class",
  },
  {
    id: 6,
    menu: "Berita",
    icon: (
      <Mails
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/berita",
  },
  {
    id: 7,
    menu: "Pengumuman",
    icon: (
      <Megaphone
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/pengumuman",
  },
  {
    id: 8,
    menu: "Galeri",
    icon: (
      <Images
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/galeri",
  },
  {
    id: 9,
    menu: "Info Pendaftaran",
    icon: (
      <BookOpenText
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/informasi-pendaftaran",
  },
  {
    id: 10,
    menu: "Persyaratan",
    icon: (
      <NotebookText
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/persyaratan",
  },
  {
    id: 11,
    menu: "Jadwal",
    icon: (
      <Calendar
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/jadwal",
  },
  {
    id: 12,
    menu: "Daftar Online",
    icon: (
      <AppWindow
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/daftar-online",
  },
  {
    id: 13,
    menu: "Kontak",
    icon: (
      <BookUser
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/kontak",
  },
  {
    id: 14,
    menu: "Aktivitas",
    icon: (
      <History
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/kontak",
  },
];

export default menus;
