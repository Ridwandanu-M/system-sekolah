"use client";

import { CircleUserRound, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AdminHeader = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      logout();
    }
  };

  return (
    <header className="mb-[1.2rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[1.2rem] font-[600]">
          <CircleUserRound size={32} color="var(--primary-color)" />
          <div>
            <p className="text-[1.8rem]">Admin Account</p>
            {user && (
              <p className="text-[1.2rem] text-gray-600 font-normal">
                {user.username}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-[1.4rem] text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 cursor-pointer"
          title="Keluar"
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
