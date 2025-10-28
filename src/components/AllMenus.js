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
  Info,
  School,
  MessageSquare,
  Target,
  Scroll,
  Lightbulb,
  Users,
  Building,
} from "lucide-react";

export const adminMenus = [
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
    hasDropdown: false,
  },
  {
    id: 2,
    menu: "Data Sekolah",
    icon: (
      <UsersRound
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    hasDropdown: true,
    submenu: [
      { title: "Siswa", path: "/admin/siswa", icon: <UsersRound size={20} /> },
      { title: "Guru", path: "/admin/guru", icon: <GraduationCap size={20} /> },
    ],
  },
  {
    id: 3,
    menu: "Tentang Sekolah",
    icon: (
      <School
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    hasDropdown: true,
    submenu: [
      {
        title: "Sambutan",
        path: "/admin/tentang-sekolah/sambutan",
        icon: <MessageSquare size={20} />,
      },
      {
        title: "Visi & Misi",
        path: "/admin/tentang-sekolah/visi-misi",
        icon: <Target size={20} />,
      },
      {
        title: "Sejarah",
        path: "/admin/tentang-sekolah/sejarah",
        icon: <Scroll size={20} />,
      },
      {
        title: "Filosofi",
        path: "/admin/tentang-sekolah/filosofi",
        icon: <Lightbulb size={20} />,
      },
      {
        title: "Struktur Organisasi",
        path: "/admin/tentang-sekolah/struktur",
        icon: <Users size={20} />,
      },
      {
        title: "Fasilitas",
        path: "/admin/tentang-sekolah/fasilitas",
        icon: <Building size={20} />,
      },
    ],
  },
  {
    id: 4,
    menu: "Program & Kegiatan",
    icon: (
      <Clapperboard
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    hasDropdown: true,
    submenu: [
      {
        title: "Ekstrakurikuler",
        path: "/admin/ekstrakurikuler",
        icon: <Clapperboard size={20} />,
      },
      {
        title: "Outing Class",
        path: "/admin/outing-class",
        icon: <Backpack size={20} />,
      },
    ],
  },
  {
    id: 5,
    menu: "Berita & Pengumuman",
    icon: (
      <Mails
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    hasDropdown: true,
    submenu: [
      { title: "Berita", path: "/admin/berita", icon: <Mails size={20} /> },
      {
        title: "Pengumuman",
        path: "/admin/pengumuman",
        icon: <Megaphone size={20} />,
      },
    ],
  },
  {
    id: 6,
    menu: "Media",
    icon: (
      <Images
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/galeri",
    hasDropdown: false,
  },
  {
    id: 7,
    menu: "PPDB",
    icon: (
      <BookOpenText
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    hasDropdown: true,
    submenu: [
      {
        title: "Info Pendaftaran",
        path: "/admin/informasi-pendaftaran",
        icon: <Info size={20} />,
      },
      {
        title: "Persyaratan",
        path: "/admin/persyaratan",
        icon: <NotebookText size={20} />,
      },
      { title: "Jadwal", path: "/admin/jadwal", icon: <Calendar size={20} /> },
      {
        title: "Daftar Online",
        path: "/admin/daftar-online",
        icon: <AppWindow size={20} />,
      },
    ],
  },
  {
    id: 8,
    menu: "Kontak",
    icon: (
      <BookUser
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/kontak",
    hasDropdown: false,
  },
  {
    id: 9,
    menu: "Aktivitas",
    icon: (
      <History
        size={32}
        className={`rounded-full p-[.4rem] cursor-pointer transition-all duration-[.075s] ease-in-out`}
      />
    ),
    path: "/admin/aktivitas",
    hasDropdown: false,
  },
];

export const headerMenus = [
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
      { title: "Sambutan Kepala Sekolah", path: "/tentang-sekolah/sambutan" },
      { title: "Visi & Misi", path: "/tentang-sekolah/visi-misi" },
      { title: "Sejarah", path: "/tentang-sekolah/sejarah" },
      { title: "Filosofi", path: "/tentang-sekolah/filosofi" },
      { title: "Struktur Organisasi", path: "/tentang-sekolah/struktur" },
      { title: "Fasilitas", path: "/tentang-sekolah/fasilitas" },
    ],
  },
  {
    menu: "Program & Kegiatan",
    path: "/program-kegiatan",
    hasDropdown: true,
    submenu: [
      { title: "Ekstrakurikuler", path: "/program-kegiatan/ekstrakurikuler" },
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
    ],
  },
  {
    menu: "Galeri",
    path: "/galeri",
    hasDropdown: false,
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
