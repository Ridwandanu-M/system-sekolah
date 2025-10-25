import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <main className="w-[160rem] mx-auto py-[1.8rem] border-x">
        {children}
      </main>
    </div>
  );
}
