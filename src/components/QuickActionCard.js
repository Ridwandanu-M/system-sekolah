const QuickActionCard = ({ icon: Icon, title, description, href, color }) => (
  <a
    href={href}
    className="block bg-[#fff] rounded-xl border border-gray-200 p-[1.8rem] hover:shadow-sm transition-shadow duration-[.075s]"
  >
    <div className="flex items-start space-x-4">
      <div className={`p-[.8rem] rounded-lg ${color}`}>
        <Icon size={32} className="text-[#fff]" />
      </div>
      <div>
        <h3 className="text-[1.4rem] font-[600] text-[#000] mb-[.4rem]">
          {title}
        </h3>
        <p className="text-[1.2rem] text-gray-600">{description}</p>
      </div>
    </div>
  </a>
);

export default QuickActionCard;
