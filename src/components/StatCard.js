import { TrendingUp } from "lucide-react";

const StatCard = ({ icon: Icon, title, value, color, trend }) => (
  <div className="bg-[#fff] rounded-xl border border-gray-200 p-[1.4rem] hover:shadow-sm transition-shadow duration-[.075s]">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-[1.2rem]">
        <div className={`p-[.8rem] rounded-lg ${color}`}>
          <Icon size={32} className="text-white" />
        </div>
        <div>
          <p className="text-[1.4rem] font-medium text-gray-600">{title}</p>
          <p className="text-[1.4rem] font-bold text-[#000]">{value}</p>
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;
