import AdminHeader from "@/components/AdminHeader";
import AdminSidebar from "@/components/AdminSidebar";
import menus from "@/components/AdminSidebarMenu";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-[160rem] mx-auto py-[1.8rem]">
        <AdminHeader />
        {children}
      </main>
    </div>
  );
}
