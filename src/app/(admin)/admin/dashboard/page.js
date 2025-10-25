"use client";

import {
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Megaphone,
  Clock,
  Eye,
  UserCheck,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import QuickActionCard from "@/components/QuickActionCard";
import QuickActionData from "@/components/QuickActionData";
import { useState, useEffect } from "react";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalGuru: 0,
    totalBerita: 0,
    totalPengumuman: 0,
    totalPPDB: 0,
    totalEkstrakurikuler: 0,
    totalGaleri: 0,
    totalOutingClass: 0,
  });

  const StatCardData = [
    {
      id: 1,
      icon: Users,
      title: "Total Siswa",
      value: stats.totalSiswa,
      color: "bg-[var(--primary-color)]",
      trend: "+12%",
    },
    {
      id: 2,
      icon: GraduationCap,
      title: "Total Guru",
      value: stats.totalGuru,
      color: "bg-[var(--primary-color)]",
      trend: "+3%",
    },
    {
      id: 3,
      icon: FileText,
      title: "Berita",
      value: stats.totalBerita,
      color: "bg-[var(--primary-color)]",
      trend: "+8%",
    },
    {
      id: 4,
      icon: UserCheck,
      title: "Pendaftar PPDB",
      value: stats.totalPPDB,
      color: "bg-[var(--primary-color)]",
      trend: "+25%",
    },
  ];

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "siswa",
      message: "Data siswa baru ditambahkan",
      time: "2 jam yang lalu",
      icon: Users,
    },
    {
      id: 2,
      type: "berita",
      message: "Berita 'Kegiatan Sekolah' dipublikasikan",
      time: "3 jam yang lalu",
      icon: FileText,
    },
    {
      id: 3,
      type: "pengumuman",
      message: "Pengumuman penting ditambahkan",
      time: "5 jam yang lalu",
      icon: Megaphone,
    },
    {
      id: 4,
      type: "guru",
      message: "Data guru baru ditambahkan",
      time: "1 hari yang lalu",
      icon: GraduationCap,
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalSiswa: 245,
        totalGuru: 32,
        totalBerita: 18,
        totalPengumuman: 12,
        totalPPDB: 89,
        totalEkstrakurikuler: 15,
        totalGaleri: 156,
        totalOutingClass: 8,
      });
    }, 1000);
  }, []);

  return (
    <div>
      <div className="mb-[2.4rem]">
        <h1 className="text-[2.4rem] font-bold mb-[.4rem]">Dashboard Admin</h1>
        <p className="text-[#000]/75 text-[1.4rem]">
          Selamat datang di panel admin sistem sekolah. Kelola semua data dan
          informasi website sekolah dari sini.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2.4rem] mb-[2.4rem]">
        {StatCardData.map((item, index) => (
          <StatCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            value={item.value}
            color={item.color}
            trend={item.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[2.4rem] mb-[2.4rem]">
        <div className="lg:col-span-2 bg-[#fff] rounded-xl border border-gray-200 p-[2rem]">
          <div className="flex items-center justify-between mb-[2rem]">
            <h2 className="text-[2.4rem] font-[600] text-[#000]">
              Aktivitas Terbaru
            </h2>
            <button className="text-blue-600 hover:text-blue-700 text-[1.4rem] font-[500] cursor-pointer">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-4 p-[.8rem] rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="p-[1.4rem] rounded-lg bg-[var(--primary-color)]">
                  <activity.icon size={24} className="text-[#fff]" />
                </div>
                <div className="flex-1">
                  <p className="text-[1.4rem] font-[500] text-[#000]">
                    {activity.message}
                  </p>
                  <p className="text-[1.2rem] text-[#000]/75 flex items-center mt-1">
                    <Clock size={12} className="mr-[.4rem]" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#fff] rounded-xl border border-gray-200 p-[2rem]">
          <h2 className="text-[2.4rem] font-[600] text-[#000] mb-[2rem]">
            Statistik Cepat
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-[1.2rem]">
                <BookOpen size={32} className="text-[var(--primary-color)]" />
                <span className="text-[1.4rem] text-[#000]/75">
                  Ekstrakurikuler
                </span>
              </div>
              <span className="text-[1.4rem] font-[500] text-[#000]/75">
                {stats.totalEkstrakurikuler}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-[1.2rem]">
                <Eye size={32} className="text-[var(--primary-color)]" />
                <span className="text-[1.4rem] text-[#000]/75">
                  Galeri Foto
                </span>
              </div>
              <span className="text-[1.4rem] font-[500] text-[#000]/75">
                {stats.totalGaleri}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-[1.2rem]">
                <Calendar size={32} className="text-[var(--primary-color)]" />
                <span className="text-[1.4rem] text-[#000]/75">
                  Outing Class
                </span>
              </div>
              <span className="text-[1.4rem] font-[500] text-[#000]/75">
                {stats.totalOutingClass}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-[1.2rem]">
                <Megaphone size={32} className="text-[var(--primary-color)]" />
                <span className="text-[1.4rem] text-[#000]/75">Pengumuman</span>
              </div>
              <span className="text-[1.4rem] font-[500] text-[#000]/75">
                {stats.totalPengumuman}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[2.4rem]">
        <h2 className="text-[2.4rem] font-[600] text-[#000] mb-6">
          Aksi Cepat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1.4rem]">
          {QuickActionData.map((item) => (
            <QuickActionCard
              key={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              href={item.href}
              color={item.color}
            />
          ))}
        </div>
      </div>

      <div className="bg-[#fff] rounded-xl shadow-sm border border-gray-200 p-[2.4rem]">
        <h2 className="text-[2.4rem] font-[600] text-[#000] mb-[1.2rem]">
          Status Sistem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.4rem]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-[5.6rem] h-[5.6rem] bg-green-100 rounded-lg mb-3">
              <div className="w-[1.8rem] h-[1.8rem] bg-green-500 rounded-full"></div>
            </div>
            <p className="text-[1.4rem] font-[500] text-[#000]">Server</p>
            <p className="text-[1.2rem] text-green-600">Online</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-[5.6rem] h-[5.6rem] bg-green-100 rounded-lg mb-3">
              <div className="w-[1.8rem] h-[1.8rem] bg-green-500 rounded-full"></div>
            </div>
            <p className="text-[1.4rem] font-[500] text-[#000]">Database</p>
            <p className="text-[1.2rem] text-green-600">Tersambung</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-[5.6rem] h-[5.6rem] bg-blue-100 rounded-lg mb-3">
              <div className="w-[1.8rem] h-[1.8rem] bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-[1.4rem] font-[500] text-[#000]">Update</p>
            <p className="text-[1.2rem] text-blue-600">Terbaru</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
