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
  Images,
  MapPin,
  Phone,
  Activity,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import QuickActionCard from "@/components/QuickActionCard";
import QuickActionData from "@/components/QuickActionData";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalGuru: 0,
    totalBerita: 0,
    totalPengumuman: 0,
    totalEkstrakurikuler: 0,
    totalGaleri: 0,
    totalOutingClass: 0,
    totalPPDB: 0,
    totalKontak: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  const StatCardData = [
    {
      id: 1,
      icon: Users,
      title: "Total Siswa",
      value: loading ? "..." : stats.totalSiswa,
      color: "bg-[var(--primary-color)]",
    },
    {
      id: 2,
      icon: GraduationCap,
      title: "Total Guru",
      value: loading ? "..." : stats.totalGuru,
      color: "bg-[var(--primary-color)]",
    },
    {
      id: 3,
      icon: FileText,
      title: "Total Berita",
      value: loading ? "..." : stats.totalBerita,
      color: "bg-[var(--primary-color)]",
    },
    {
      id: 4,
      icon: Megaphone,
      title: "Pengumuman",
      value: loading ? "..." : stats.totalPengumuman,
      color: "bg-[var(--primary-color)]",
    },
    {
      id: 5,
      icon: BookOpen,
      title: "Ekstrakurikuler",
      value: loading ? "..." : stats.totalEkstrakurikuler,
      color: "bg-[var(--primary-color)]",
    },
    {
      id: 6,
      icon: Images,
      title: "Galeri Foto",
      value: loading ? "..." : stats.totalGaleri,
      color: "bg-[var(--primary-color)]",
    },
    {
      id: 7,
      icon: MapPin,
      title: "Outing Class",
      value: loading ? "..." : stats.totalOutingClass,
      color: "bg-[var(--primary-color)]",
    },
  ];

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard/stats");
      const result = response.data;

      if (result.success) {
        setStats(result.data);
      } else {
        console.error("Error fetching stats:", result.error);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    try {
      setActivitiesLoading(true);
      const response = await axios.get("/api/dashboard/activities");
      const result = response.data;

      if (result.success) {
        setRecentActivities(result.data);
      } else {
        console.error("Error fetching activities:", result.error);
      }
    } catch (error) {
      console.error("Error fetching recent activities:", error);
    } finally {
      setActivitiesLoading(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} detik yang lalu`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Users,
      GraduationCap,
      FileText,
      Megaphone,
      BookOpen,
      Images,
      MapPin,
      UserCheck,
    };
    return icons[iconName] || Activity;
  };

  useEffect(() => {
    fetchStats();
    fetchActivities();
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
          />
        ))}
      </div>

      <div className="mb-[2.4rem]">
        <div className="bg-[#fff] rounded-xl border border-gray-200 p-[2rem]">
          <div className="flex items-center justify-between mb-[2rem]">
            <h2 className="text-[2rem] font-[600] text-[#000] flex items-center">
              <Activity
                size={24}
                className="mr-3 text-[var(--primary-color)]"
              />
              Aktivitas Terbaru
            </h2>
            <div className="flex items-center text-[1.2rem] text-gray-500">
              <Clock size={16} className="mr-1" />
              Real-time
            </div>
          </div>

          {activitiesLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-3 rounded-lg animate-pulse"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentActivities.length > 0 ? (
            <div className="space-y-3">
              {recentActivities.map((activity) => {
                const IconComponent = getIconComponent(activity.icon);
                return (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="p-[.8rem] rounded-lg bg-[var(--primary-color)]">
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[1.4rem] font-medium text-[#000] mb-1">
                        {activity.message}
                      </p>
                      <p className="text-[1.4rem] text-gray-500 flex items-center">
                        <Clock size={16} className="mr-1" />
                        {formatTimeAgo(activity.time)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-[1.4rem]">Belum ada aktivitas terbaru</p>
            </div>
          )}
        </div>
      </div>

      <div className="mb-[2.4rem]">
        <h2 className="text-[2.4rem] font-[600] text-[#000] mb-6">
          Aksi Cepat
        </h2>
        <p className="text-[1.4rem] text-[#000]/75 mb-6">
          Akses langsung ke halaman admin yang paling sering digunakan
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[1.4rem]">
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

      <div className="mb-[2.4rem]">
        <div className="bg-gradient-to-br from-[var(--primary-color)] to-blue-700 rounded-xl p-[2.4rem] text-white">
          <h2 className="text-[2.4rem] font-[600] mb-[1.6rem]">Tips Admin</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[1.4rem] leading-relaxed">
                Selalu backup data secara berkala untuk keamanan sistem
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[1.4rem] leading-relaxed">
                Update berita dan pengumuman secara rutin agar informasi selalu
                fresh
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[1.4rem] leading-relaxed">
                Gunakan gambar berkualitas baik untuk galeri dan program sekolah
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-[1.4rem] leading-relaxed">
                Periksa data kontak sekolah secara berkala untuk memastikan
                akurasi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
