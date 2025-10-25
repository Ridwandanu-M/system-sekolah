import { CircleUserRound } from "lucide-react";

const AdminHeader = () => {
  return (
    <header>
      <div>
        <div className="flex items-center gap-[1.2rem] font-[600]">
          <CircleUserRound size={32} color="var(--primary-color)" />
          <p className="text-[1.8rem]">Admin Account</p>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
