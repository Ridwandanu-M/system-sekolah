import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <section>
      <div>
        <p>Welcome Admin, {session.user?.name}</p>
        <p>Admin Email, {session.user?.email}</p>
        <p>Admin Id, {session.user?.id}</p>
        <p>Admin Role, {session.user?.id}</p>
      </div>
    </section>
  );
};

export default AdminPage;
