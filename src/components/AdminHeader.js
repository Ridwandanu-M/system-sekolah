import { CircleUserRound } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="mb-[1.2rem]">
      <div className="flex items-center gap-[1.2rem] font-[600]">
        <CircleUserRound size={32} color="var(--primary-color)" />
        <p className="text-[1.8rem]">Admin Account</p>
      </div>
    </header>
  );
};

export default AdminHeader;
