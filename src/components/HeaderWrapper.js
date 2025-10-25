"use client";

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('./Header'), {
  ssr: false,
  loading: () => (
    <header className="fixed w-full bg-[#30308A] backdrop-blur-sm py-[1.2rem] z-50">
      <div className="flex items-center justify-around">
        <div className="flex items-center font-[700]">
          <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-white/20 rounded animate-pulse"></div>
          <div className="h-[2rem] sm:h-[2.4rem] w-[200px] sm:w-[300px] bg-white/20 rounded ml-2 animate-pulse"></div>
        </div>
        <div className="hidden lg:block">
          <div className="flex gap-6">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="h-[1.6rem] w-[80px] bg-white/20 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="lg:hidden w-6 h-6 bg-white/20 rounded animate-pulse"></div>
      </div>
    </header>
  )
});

export default Header;
