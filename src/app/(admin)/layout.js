import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata = {
  title: "Admin",
  description: "Admin sistem sekolah SMP Muhammadiyah 1 Seyegan",
};

export default function AdminLayout({ children }) {
  g;
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="w-[144rem] mx-auto overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="py-[2.4rem]">
              <AdminHeader />
              <div className="min-h-screen">{children}</div>
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
