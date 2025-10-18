const Title = ({ children }) => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-[3rem] md:text-[3.6rem] lg:text-[4.2rem] font-bold text-[var(--primary-color)] mb-4">
        {children}
      </h1>
      <div className="w-[6rem] h-[0.4rem] bg-yellow-400 mx-auto rounded-full"></div>
    </div>
  );
};

export default Title;
