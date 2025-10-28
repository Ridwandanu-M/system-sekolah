import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard",
  description: "School system created by Ridwandanu Maulana with Next.js",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="w-[144rem] mx-auto overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="py-[2.4rem]">
            <AdminHeader />
            <div className="min-h-scree">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
