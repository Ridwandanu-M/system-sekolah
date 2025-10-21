"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <section>
      <div>Welcome Admin</div>
    </section>
  );
};

export default AdminPage;
